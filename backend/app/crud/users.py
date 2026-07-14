from app.models import UserSettings
from sqlalchemy import select
from uuid import UUID
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.users import User
from app.schemas.user import UserBase

async def create_user(
    db: AsyncSession,
    user: UserBase,
) -> UUID:

    stmt = insert(User).values(user.model_dump()).on_conflict_do_nothing().returning(User.id)
    existing_user_id = (await db.execute(stmt)).scalar_one_or_none()
    
    if existing_user_id is None:
        stmt = select(User.id).where(User.email == user.email)
        existing_user_id = (await db.execute(stmt)).scalar_one()
        return existing_user_id

    # if existing user id is not None, it means the user already exists
    # so we need to create a user settings for the user
    stmt = insert(UserSettings).values(user_id=existing_user_id)
    await db.execute(stmt)
    await db.commit()
    return existing_user_id


async def get_user(
    db: AsyncSession,
    user_id: int,
) -> User:
    user = await db.get(User, user_id)
    if user is None:
        raise Exception("User not found")
    return user