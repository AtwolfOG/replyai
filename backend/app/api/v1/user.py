from app.schemas.exceptions import APIException
from app.schemas.exceptions import APIExceptionResponse
from sqlalchemy.exc import NoResultFound
from app.schemas.user import UserSettingsBase, UserResponse
from app.crud.user_settings import db_update_user_settings, db_get_user_settings
from app.schemas.user import UserSettingsResponse
from app.db.session import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from app.crud.users import db_get_user
from uuid import UUID
from fastapi import Depends
from fastapi import Request, APIRouter
from app.core.security import authenticate_and_inject_user_id


user_router = APIRouter(prefix="/users", tags=["User"], dependencies=[Depends(authenticate_and_inject_user_id)])

@user_router.get("/me", responses={401: {"model": APIExceptionResponse}, 404: {"model": APIExceptionResponse}, 500: {"model": APIExceptionResponse}})
async def get_user_data(request: Request, db: AsyncSession = Depends(get_db)) -> UserResponse:
    """
    Get user information.
    """
    try:
      user_id = request.session.get("user_id")
      if not user_id:
          raise APIException(status_code=401, message="Unauthorized")
      user_id_UUID = UUID(user_id)
      user = await db_get_user(db, user_id_UUID)
      return UserResponse(**user.__dict__)

    except NoResultFound:
      raise APIException(status_code=404, message="User not found")
    except Exception:
      raise APIException(status_code=400, message="Failed to get user data")

@user_router.get("/settings", responses={401: {"model": APIExceptionResponse}, 404: {"model": APIExceptionResponse}, 500: {"model": APIExceptionResponse}})
async def get_settings(request: Request, db: AsyncSession = Depends(get_db)) -> UserSettingsResponse:
    """
    Get user settings.
    """
    try:
      user_id = request.session.get("user_id")
      if not user_id:
          raise APIException(status_code=401, message="Unauthorized")
      user_id_UUID = UUID(user_id)
      user_settings = await db_get_user_settings(db, user_id_UUID)
      return UserSettingsResponse(**user_settings.__dict__)
    except Exception:
      raise APIException(status_code=400, message="Failed to get user data")

@user_router.put("/settings", responses={401: {"model": APIExceptionResponse}, 404: {"model": APIExceptionResponse}, 500: {"model": APIExceptionResponse}})
async def update_settings(request: Request, new_settings: UserSettingsBase, db: AsyncSession = Depends(get_db)) -> UserSettingsResponse:
    """
    Update user settings.
    """
    try:
      user_id = request.session.get("user_id")
      if not user_id:
          raise APIException(status_code=401, message="Unauthorized")
      user_id_UUID = UUID(user_id)
      user_settings = await db_update_user_settings(db, user_id_UUID, new_settings)
      return UserSettingsResponse(**user_settings.__dict__)
    except Exception:
      raise APIException(status_code=400, message="Failed to update settings")