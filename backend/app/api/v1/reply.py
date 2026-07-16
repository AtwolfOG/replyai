from app.crud.replies import db_delete_reply
from uuid import UUID
from app.crud.replies import db_generate_reply
from app.crud.replies import db_get_reply
from app.crud.replies import db_get_replies
from fastapi import Path
from typing import Annotated
from app.schemas.reply import GetReplyResponse
from app.db.session import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Request
from app.core.security import authenticate_and_inject_user_id
from fastapi import Depends
from app.core.config import client
from fastapi import HTTPException
from app.utils.prompts import generate_prompt
from app.schemas.reply import GenerateReplyRequest, GenerateReplyResponse
from fastapi import APIRouter

reply_router = APIRouter(prefix="/replies", tags=["replies"], dependencies=[Depends(authenticate_and_inject_user_id)])

@reply_router.post("/generate", status_code=200)
async def generate_reply(request: Request, data: GenerateReplyRequest, db: AsyncSession = Depends(get_db)) -> GenerateReplyResponse:
    """
    Generate a reply.
    """

    user_id = request.session.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    if data.user_message.strip() == "":
        raise HTTPException(status_code=400, detail="User message cannot be empty")
      
    if len(data.user_message) > 1000:
        raise HTTPException(status_code=400, detail="User message cannot be longer than 1000 characters")
    
    prompt = generate_prompt(**data.model_dump())

    try:
        # response = await client.aio.models.generate_content(
        #     model="gemini-2.5-flash",
        #     contents=prompt,
        # )
        response = await client.chat.completions.create(
            # model="openrouter/free",
            model="openai/gpt-oss-20b:free",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt},
            ],
        )
        generated_reply = response.choices[0].message.content
        if not generated_reply:
            raise HTTPException(status_code=500, detail="Failed to generate reply")
        reply_id = await db_generate_reply(db, user_id, data, generated_reply)
        return GenerateReplyResponse(generated_reply=generated_reply, id=reply_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@reply_router.get("/")
async def get_replies(request: Request, db: AsyncSession = Depends(get_db)) -> list[GetReplyResponse]:
    """
    Get replies.
    """
    try:
        user_id = request.session.get("user_id")
        if not user_id:
            raise HTTPException(status_code=401, detail="Unauthorized")
        replies = await db_get_replies(db, user_id)
        return [GetReplyResponse(**reply.__dict__) for reply in replies]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@reply_router.get("/{id}")
async def get_reply(request: Request, id: Annotated[UUID, Path(title="Reply ID")], db: AsyncSession = Depends(get_db)) -> GetReplyResponse:
    """
    Get a reply.
    """

    print("id", id)
    try:
        user_id = request.session.get("user_id")
        if not user_id:
            raise HTTPException(status_code=401, detail="Unauthorized")
        reply = await db_get_reply(db, user_id, id)
        return GetReplyResponse(**reply.__dict__)
    except Exception as e:
		# change error detail
        raise HTTPException(status_code=500, detail=str(e))

@reply_router.delete("/{id}")
async def delete_reply(request: Request, id: Annotated[UUID, Path(title="Reply ID")], db: AsyncSession = Depends(get_db)) -> None:
    """
    Delete a reply.
    """
    try:
        user_id = request.session.get("user_id")
        if not user_id:
            raise HTTPException(status_code=401, detail="Unauthorized")
        await db_delete_reply(db, user_id, id)
        return None
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))