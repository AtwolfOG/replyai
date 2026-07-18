from pydantic import BaseModel

class APIException(Exception):
  def __init__(self, message: str, status_code: int):
    self.message = message
    self.status_code = status_code

class APIExceptionResponse(BaseModel):
  message: str
  status_code: int