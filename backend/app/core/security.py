from typing import Annotated
from fastapi import HTTPException, Request, Header
import secrets
from datetime import timezone
import jwt
import string
from datetime import datetime, timedelta

from app.core.config import settings

def jwt_encode(data: dict, expires_delta: int = timedelta(minutes=15)) -> str:
    data_to_encode = data.copy()
    to_encode = dict()
    to_encode.update({"data": data_to_encode})
    to_encode.update({"exp": datetime.now(timezone.utc) + expires_delta})
    to_encode.update({"iss": settings.APP_NAME})
    to_encode.update({"nbf": datetime.now(timezone.utc)})
    encoded_jwt = jwt.encode(to_encode, settings.PRIVATE_KEY, algorithm="RS256")
    return encoded_jwt

def jwt_decode(token: str) -> dict:
    try:
        decoded_jwt = jwt.decode(token, settings.PUBLIC_KEY, algorithms=["RS256"], issuer=settings.APP_NAME)
    except Exception as e:
        raise Exception(f"Invalid token: {e}")
    
    data = decoded_jwt.get("data")
    if not data:
        raise Exception(f"Invalid token: {e}")

    return data

def generate_rand_string(length: int=64):
    chars = string.ascii_letters + string.digits + string.punctuation
    return ''.join(secrets.choice(chars) for _ in range(length))

def authenticate_and_inject_user_id(request: Request, Authorization: Annotated[str, Header()]):
    try:
        access_token = Authorization
        if access_token:
            access_token = access_token.split(" ")[1]
        if not access_token:
            raise HTTPException(status_code=401, detail="Unauthorized")
        
        user_data = jwt_decode(access_token)
        user_id = user_data.get("id")
        if not user_id:
            raise HTTPException(status_code=401, detail="Unauthorized")
        request.session["user_id"] = user_id
    except Exception:
        raise HTTPException(status_code=401, detail="Unauthorized")