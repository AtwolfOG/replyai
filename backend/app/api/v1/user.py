
from app.schemas.user import UserSettingsBase
from app.crud.user_settings import update_user_settings
from app.schemas.user import UserSettingsResponse
from app.db.session import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from app.crud.user_settings import get_user_settings
from app.schemas.user import UserResponse
from app.crud.users import get_user
from uuid import UUID
from fastapi import Depends
from fastapi import HTTPException
from fastapi import Request, APIRouter
from app.core.security import authenticate_and_inject_user_id


user_router = APIRouter(prefix="/users", tags=["User"], dependencies=[Depends(authenticate_and_inject_user_id)])

@user_router.get("/me")
async def get_user_data(request: Request, db: AsyncSession = Depends(get_db)) -> UserResponse:
    """
    Get user information.
    """
    try:
      user_id = request.session.get("user_id")
      if not user_id:
          raise HTTPException(status_code=401, detail="Unauthorized")
      user_id_UUID = UUID(user_id)
      user = await get_user(db, user_id_UUID)
      return UserResponse(**user.__dict__)
    except Exception:
      raise HTTPException(status_code=400, detail="Failed to get user data")

@user_router.get("/settings")
async def get_settings(request: Request, db: AsyncSession = Depends(get_db)) -> UserSettingsResponse:
    """
    Get user settings.
    """
    try:
      user_id = request.session.get("user_id")
      if not user_id:
          raise HTTPException(status_code=401, detail="Unauthorized")
      user_id_UUID = UUID(user_id)
      user_settings = await get_user_settings(db, user_id_UUID)
      return UserSettingsResponse(**user_settings.__dict__)
    except Exception:
      raise HTTPException(status_code=400, detail="Failed to get user data")

@user_router.put("/settings")
async def update_settings(request: Request, new_settings: UserSettingsBase, db: AsyncSession = Depends(get_db)) -> UserSettingsResponse:
    """
    Update user settings.
    """
    try:
      user_id = request.session.get("user_id")
      if not user_id:
          raise HTTPException(status_code=401, detail="Unauthorized")
      user_id_UUID = UUID(user_id)
      user_settings = await update_user_settings(db, user_id_UUID, new_settings)
      return UserSettingsResponse(**user_settings.__dict__)
    except Exception:
      raise HTTPException(status_code=400, detail="Failed to update settings")