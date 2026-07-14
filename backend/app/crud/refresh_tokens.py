from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import timedelta
from datetime import timezone
from uuid import UUID
from datetime import datetime
from app.models.refresh_tokens import RefreshToken

async def create_refresh_token(db: AsyncSession, user_id: UUID, token: str, expires_at: datetime = datetime.now(timezone.utc) + timedelta(days=7)):
  refresh_token = RefreshToken(
    user_id=user_id,
    token=token,
    expires_at=expires_at
  )
  db.add(refresh_token)
  await db.commit()
  return refresh_token
  

async def get_refresh_token(db: AsyncSession, token: str):
  stmt = select(RefreshToken).where(RefreshToken.token == token, RefreshToken.revoked == False, RefreshToken.expires_at > datetime.now(timezone.utc))
  return (await db.execute(stmt)).scalar_one()

async def revoke_refresh_token(db: AsyncSession, token: str):
  stmt = select(RefreshToken).where(RefreshToken.token == token, RefreshToken.revoked == False, RefreshToken.expires_at > datetime.now(timezone.utc))
  refresh_token = (await db.execute(stmt)).scalar_one()
  if refresh_token:
    refresh_token.revoked = True
    await db.commit()
  return refresh_token