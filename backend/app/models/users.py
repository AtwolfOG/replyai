from typing import TYPE_CHECKING
from uuid import uuid4, UUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, UUID as SQLUUID
from sqlalchemy.sql import func
from datetime import datetime
from sqlalchemy.orm import relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.user_settings import UserSettings
    from app.models.replies import Reply

class User(Base):
    __tablename__ = "users"

    id: Mapped[UUID] = mapped_column(SQLUUID(as_uuid=True), primary_key=True, default=uuid4)
    email: Mapped[str] = mapped_column(String(50), unique=True)
    profile_picture: Mapped[str] = mapped_column(String(500))
    name: Mapped[str] = mapped_column(String(50))
    created_at: Mapped[datetime] = mapped_column(default=func.now())
    updated_at: Mapped[datetime] = mapped_column(default=func.now(), onupdate=func.now())

    replies: Mapped[list["Reply"]] = relationship(back_populates="user", cascade="all, delete-orphan", passive_deletes=True)
    settings: Mapped["UserSettings"] = relationship(back_populates="user", cascade="all, delete-orphan", passive_deletes=True)
