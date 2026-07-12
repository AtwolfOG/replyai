from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Boolean, UUID, ForeignKey
from sqlalchemy.orm import relationship

from sqlalchemy.sql import func
from datetime import datetime

from app.db.base import Base

class Reply(Base):
    __tablename__ = "replies"

    id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    user_id: Mapped[UUID] = mapped_column(ForeignKey("users.id"))
    transcipt: Mapped[str]
    tone: Mapped[str]
    audience: Mapped[str]
    generated_reply: Mapped[str]
    length: Mapped[str]
    created_at: Mapped[datetime] = mapped_column(default=func.now())
    updated_at: Mapped[datetime] = mapped_column(default=func.now(), onupdate=func.now())
    user: Mapped["User"] = relationship(back_populates="replies")

