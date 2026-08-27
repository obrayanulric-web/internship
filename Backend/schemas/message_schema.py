from pydantic import BaseModel, EmailStr
from datetime import datetime


class MessageCreate(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    message: str


class MessageResponse(MessageCreate):
    dt: datetime