from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Boolean, UUID, ForeignKey
from sqlalchemy.sql import func
from datetime import datetime
from sqlalchemy.orm import relationship

from app.db.base import Base

class UserSettings(Base):
    __tablename__ = "user_settings"

    id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    user_id: Mapped[UUID] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship(back_populates="user_settings")
    default_tone: Mapped[str] = mapped_column(default="neutral")
    default_audience: Mapped[str] = mapped_column(default="general")
    default_length: Mapped[str] = mapped_column(default="medium")
    created_at: Mapped[datetime] = mapped_column(default=func.now())
    updated_at: Mapped[datetime] = mapped_column(default=func.now(), onupdate=func.now())

    
