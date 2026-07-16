from sqlalchemy import select
from app.models import Reply
from sqlalchemy import insert, delete
from app.schemas.reply import GenerateReplyRequest
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession

async def db_generate_reply(db: AsyncSession, user_id: UUID, data: GenerateReplyRequest, generated_reply: str):

	# enforce plan limit

	stmt = insert(Reply).values(
		user_id= user_id,
		transcript=data.user_message,
		tone=data.tone,
		audience=data.audience,
		length=data.length,
		generated_reply=generated_reply
	).returning(Reply.id)
	reply_id = await db.execute(stmt)
	await db.commit()
	return reply_id.scalar_one()

async def db_get_replies(db: AsyncSession, user_id: UUID) -> list[Reply]:
	stmt = select(Reply).where(Reply.user_id == user_id)
	result = await db.execute(stmt)
	return result.scalars().all()

async def db_get_reply(db: AsyncSession, user_id: UUID, reply_id: UUID) -> Reply:
	stmt = select(Reply).where(Reply.user_id == user_id, Reply.id == reply_id)
	result = await db.execute(stmt)
	return result.scalar_one()

async def db_delete_reply(db: AsyncSession, user_id: UUID, reply_id: UUID) -> None:
	stmt = delete(Reply).where(Reply.user_id == user_id, Reply.id == reply_id)
	await db.execute(stmt)
	await db.commit()