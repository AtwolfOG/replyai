from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Boolean, UUID
from sqlalchemy.sql import func
from datetime import datetime
from sqlalchemy.orm import relationship

from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[UUID] = mapped_column(primary_key=True)
    email: Mapped[str]
    profile_picture: Mapped[str]
    name: Mapped[str]
    created_at: Mapped[datetime] = mapped_column(default=func.now())
    updated_at: Mapped[datetime] = mapped_column(default=func.now(), onupdate=func.now())

    replies: Mapped[list["Reply"]] = relationship(back_populates="user")
