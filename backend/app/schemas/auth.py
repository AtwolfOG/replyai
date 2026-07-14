

from pydantic import BaseModel
class SigninResponse(BaseModel):
    access_token: str

class LogoutResponse(BaseModel):
    message: str