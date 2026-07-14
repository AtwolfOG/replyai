from sqlalchemy import select, update
from app.models.user_settings import UserSettings
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
from app.schemas.user import UserSettingsBase

async def get_user_settings(db: AsyncSession, user_id: UUID):
    """
    Get user settings.
    """
    stmt = select(UserSettings).where(UserSettings.user_id == user_id)
    result = (await db.execute(stmt)).scalar_one()
    return result

async def update_user_settings(db: AsyncSession, user_id: UUID, settings: UserSettingsBase) -> UserSettings:
    """
    Update user settings.
    """
    stmt = update(UserSettings).where(UserSettings.user_id == user_id).values(**settings.model_dump(exclude_unset=True)).returning(UserSettings)
    result: UserSettings = (await db.execute(stmt)).scalar_one()
    await db.commit()
    return result