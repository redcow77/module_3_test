# Base schemas for request/response models
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class BaseSchema(BaseModel):
    class Config:
        from_attributes = True


class HealthCheck(BaseModel):
    status: str
    timestamp: datetime = datetime.now()


class ResponseMessage(BaseModel):
    message: str
    detail: Optional[str] = None
