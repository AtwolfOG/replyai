from sqlalchemy import String
from typing import TYPE_CHECKING
from enum import Enum
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey, UUID as SQLUUID
from sqlalchemy.orm import relationship
from uuid import UUID, uuid4

from sqlalchemy.sql import func
from datetime import datetime

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.users import User

class Tone(str, Enum):
    """Tone for the reply"""
    CASUAL = "casual"
    FREINDLY = "freindly"
    PROFESSIONAL = "professional"
    EDUCATIONAL = "educational"
    HUMOROUS = "humorous"
    PERSUASIVE = "persuasive"
    

class Audience(str, Enum):
    """Audience for the reply"""
    GENERAL = "general"
    STUDENT = "student"
    DEVELOPER = "developer"
    PROFESSIONAL = "professional"
    ACADEMIC = "academic"
    SOCIAL_MEDIA = "social media"
    

class Length(str, Enum):
    """Length of the reply"""
    SHORT = "short"
    MEDIUM = "medium"
    LONG = "long"

class Reply(Base):
    __tablename__ = "replies"

    id: Mapped[UUID] = mapped_column(SQLUUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id: Mapped[UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    transcript: Mapped[str] = mapped_column(String(5000))
    tone: Mapped[Tone]
    audience: Mapped[Audience]
    generated_reply: Mapped[str]
    length: Mapped[Length]
    created_at: Mapped[datetime] = mapped_column(default=func.now())
    updated_at: Mapped[datetime] = mapped_column(default=func.now(), onupdate=func.now())
    
    user: Mapped["User"] = relationship(back_populates="replies")

