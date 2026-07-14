from enum import Enum
from sqlalchemy import String
from sqlalchemy.sql import func
from datetime import datetime
from uuid import uuid4, UUID
from sqlalchemy import UUID as SQLUUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base

class PlanType(str, Enum):
    FREE = "free"
    PRO = "pro"

class Plan(Base):
    __tablename__ = "plans"

    id: Mapped[UUID] = mapped_column(SQLUUID(as_uuid=True), primary_key=True, default=uuid4)
    name: Mapped[PlanType] = mapped_column(String(50), unique=True)
    price: Mapped[int]
    currency: Mapped[str]
    created_at: Mapped[datetime] = mapped_column(default=func.now())
    updated_at: Mapped[datetime] = mapped_column(default=func.now(), onupdate=func.now())