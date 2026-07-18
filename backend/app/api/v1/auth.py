from app.schemas.exceptions import APIException, APIExceptionResponse
from app.crud.users import db_create_user
from app.schemas.auth import LogoutResponse
from datetime import timedelta
from app.crud.refresh_tokens import db_create_refresh_token, db_revoke_refresh_token
from app.core.security import generate_rand_string
from app.schemas.auth import SigninResponse
from app.schemas.user import UserBase
from app.db.session import get_db
from fastapi import Depends
from sqlalchemy.orm import Session
from fastapi.responses import Response
from fastapi import HTTPException
from authlib.integrations.base_client import OAuthError
from fastapi import Request
from fastapi import APIRouter
from authlib.integrations.starlette_client import OAuth
from app.core.config import settings
from app.core.security import jwt_encode

auth_router = APIRouter(prefix="/auth", tags=["Auth"])



oauth = OAuth()
oauth.register(
    name="google",
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    authorize_params={"scope": "openid email profile"},
    access_token_url="https://oauth2.googleapis.com/token",
    client_kwargs={"scope": "openid email profile"},
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration"
)

@auth_router.get("/signin", responses={400: {"model": APIExceptionResponse}, 500: {"model": APIExceptionResponse}})
async def signin(request: Request):
  """
  Redirects the user to the Google sign-in page.
  """
  try:
    redirect_uri = request.url_for("auth_callback")
    return await oauth.google.authorize_redirect(request, str(redirect_uri))
  except Exception:
    raise APIException(status_code=400, message="Authentication failed")

@auth_router.get("/google/callback", response_model=SigninResponse, status_code=201, responses={400: {"model": APIExceptionResponse}, 500: {"model": APIExceptionResponse}})
async def auth_callback(request: Request, response: Response, db: Session = Depends(get_db)):
  """
  Callback endpoint for Google sign-in.
  """
  try:
    token = await oauth.google.authorize_access_token(request)
  except OAuthError as error:
    raise APIException(status_code=400, message=f"Authentication failed: {error.error}")
  
  try:
    user = token.get("userinfo")
    if not user:
      return Response(status_code=400, content="")
    
    name = user.get("name")
    email = user.get("email")
    profile_picture = user.get("picture") 

    user_data = UserBase(
      name=name,
      email=email,
      profile_picture=profile_picture,
    )
    user_id = await db_create_user(db, user_data)

    # TODO set access token to expire in 30 mins
    access_token = jwt_encode(data={"id": str(user_id)}, expires_delta=timedelta(hours=1))

    refresh_token = generate_rand_string()

    await db_create_refresh_token(db, user_id, refresh_token)

    response.set_cookie(
      key="refresh_token",
      value=refresh_token,
      # httponly=True,
      secure=True,
      samesite="strict",
      max_age=timedelta(days=7)
    )

    return SigninResponse(access_token=access_token)
  except Exception:
    raise APIException(status_code=400, message=" Authentication failed")

@auth_router.post("/logout", responses={400: {"model": APIExceptionResponse}, 500: {"model": APIExceptionResponse}})
def logout(response: Response) -> LogoutResponse:
  """
  Logout endpoint.
  """
  response.delete_cookie("refresh_token")
  return LogoutResponse(message="Logout successful")


@auth_router.post("/refresh", responses={400: {"model": APIExceptionResponse}, 500: {"model": APIExceptionResponse}})
async def refresh(response: Response, request: Request, db: Session = Depends(get_db)) -> SigninResponse:
  """
  Refresh access token.
  """
  try:
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
      raise APIException(status_code=401, message="Unauthorized")
      
    revoked_refresh_token = db_revoke_refresh_token(db, refresh_token)
    if not revoked_refresh_token:
      raise APIException(status_code=401, message="Unauthorized")
    
    new_refresh_token = generate_rand_string()
    await db_create_refresh_token(db, revoked_refresh_token.user_id, new_refresh_token)
  

    access_token = jwt_encode(data={"id": str(revoked_refresh_token.user_id)})
    response.set_cookie(
      key="refresh_token",
      value=new_refresh_token,
      # httponly=True,
      secure=True,
      samesite="strict",
      max_age=timedelta(days=7)
    )
  
    return SigninResponse(access_token=access_token)
  except Exception:
    raise APIException(status_code=400, message="Failed to refresh access token")