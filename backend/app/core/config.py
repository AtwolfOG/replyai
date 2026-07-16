from functools import lru_cache
from google import genai
from openai import AsyncOpenAI
from pydantic_settings import BaseSettings, SettingsConfigDict

@lru_cache(maxsize=1)
class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )

    APP_NAME: str
    DATABASE_URL: str
    OPENAI_API_KEY: str
    PUBLIC_KEY: str
    PRIVATE_KEY: str
    PORT: int
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str
    SECRET_KEY: str
    GEMINI_API_KEY: str

settings = Settings()

# client = genai.Client(api_key=settings.GEMINI_API_KEY)
# openai impl
client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY, base_url="https://openrouter.ai/api/v1")