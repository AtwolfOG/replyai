from app.core.config import settings
from starlette.middleware.sessions import SessionMiddleware
from fastapi import FastAPI

from app.api.router import api_router

app = FastAPI(
  title="ReplyAI"
)
app.include_router(api_router)
app.add_middleware(SessionMiddleware, secret_key=settings.SECRET_KEY)