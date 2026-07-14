from datetime import datetime
from uuid import UUID
from pydantic import BaseModel

class UserBase(BaseModel):
    email: str
    name: str
    profile_picture: str

class UserResponse(UserBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

class UserSettingsResponse(BaseModel):
    id: UUID
    user_id: UUID
    default_tone: str
    default_audience: str
    default_length: str
    created_at: datetime
    updated_at: datetime

class UserSettingsBase(BaseModel):
    default_tone: str | None = None
    default_audience: str | None = None
    default_length: str | None = None