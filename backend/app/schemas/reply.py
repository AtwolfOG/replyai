from datetime import datetime
from uuid import UUID
from pydantic import BaseModel
from enum import Enum

class ToneEnum(str, Enum):
    casual = "casual"
    friendly = "friendly"
    professional = "professional"
    educational = "educational"
    persuasive = "persuasive"
    humorous = "humorous"

class AudienceEnum(str, Enum):
    general = "general"
    student = "student"
    developer = "developer"
    professional = "professional"
    academic = "academic"
    social_media = "social_media"

class LengthEnum(str, Enum):
    short = "short"
    medium = "medium"
    long = "long"

class GenerateReplyRequest(BaseModel):
    user_message: str
    tone: ToneEnum
    audience: AudienceEnum
    length: LengthEnum

class GenerateReplyResponse(BaseModel):
    id: UUID
    generated_reply: str

class GetReplyResponse(BaseModel):
    id: UUID
    transcript: str
    tone: ToneEnum
    audience: AudienceEnum
    length: LengthEnum
    generated_reply: str
    created_at: datetime
    updated_at: datetime