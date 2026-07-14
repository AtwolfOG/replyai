from fastapi import APIRouter
from app.api.v1.auth import auth_router
from app.api.v1.user import user_router

api_router = APIRouter(prefix="/v1")
api_router.include_router(auth_router)
api_router.include_router(user_router)

@api_router.get("/health")
def health_check():
    return {"status": "ok"}