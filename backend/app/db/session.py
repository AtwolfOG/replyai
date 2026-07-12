from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

engine = create_engine(
    settings.DATABASE_URL,
    future=True,
)

SessionLocal = sessionmaker(
    bind=engine
)

async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()