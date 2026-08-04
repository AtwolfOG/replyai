FROM python:3.13-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy

WORKDIR /app

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

FROM base AS deps

COPY pyproject.toml uv.lock ./

RUN uv sync --frozen --no-dev

FROM base AS runner

ENV PATH="/app/.venv/bin:$PATH"

# Copy the virtual environment
COPY --from=deps /app/.venv ./.venv

# Copy application source
COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]