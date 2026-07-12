import jwt

from app.core.config import settings

def encode(data: dict) -> str:
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, settings.PRIVATE_KEY, algorithm="RS256")
    return encoded_jwt

def decode(token: str) -> dict:
    decoded_jwt = jwt.decode(token, settings.PUBLIC_KEY, algorithms=["RS256"])
    return decoded_jwt