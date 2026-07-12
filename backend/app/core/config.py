from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )

    DATABASE_URL: str
    # OPENAI_API_KEY: str
    PUBLIC_KEY: str
    PRIVATE_KEY: str
    PORT: int
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str

settings = Settings()