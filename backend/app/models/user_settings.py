from typing import TYPE_CHECKING
from enum import Enum
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, UUID as SQLUUID, ForeignKey
from sqlalchemy.sql import func
from datetime import datetime
from sqlalchemy.orm import relationship
from uuid import UUID, uuid4

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.users import User

class SettingsTone(str, Enum):
    CASUAL = "casual"
    FORMAL = "formal"
    INFORMAL = "informal"

class SettingsAudience(str, Enum):
    GENERAL = "general"
    PROFESSIONAL = "professional"
    FRIENDLY = "friendly"
    FORMAL = "formal"
    INFORMAL = "informal"

class SettingsLength(str, Enum):
    SHORT = "short"
    MEDIUM = "medium"
    LONG = "long"

class UserSettings(Base):
    __tablename__ = "user_settings"

    id: Mapped[UUID] = mapped_column(SQLUUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id: Mapped[UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    default_tone: Mapped[SettingsTone] = mapped_column(String(50), default=SettingsTone.CASUAL)
    default_audience: Mapped[SettingsAudience] = mapped_column(String(50), default=SettingsAudience.GENERAL)
    default_length: Mapped[SettingsLength] = mapped_column(String(50), default=SettingsLength.MEDIUM)
    created_at: Mapped[datetime] = mapped_column(default=func.now())
    updated_at: Mapped[datetime] = mapped_column(default=func.now(), onupdate=func.now())

    user: Mapped["User"] = relationship(back_populates="settings")

    
