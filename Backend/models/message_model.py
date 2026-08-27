from sqlmodel import SQLModel, Field
from pydantic import EmailStr
from datetime import datetime


class Message(SQLModel, table=True):
    id: int | None = Field(
        default=None,
        primary_key=True,
        index=True,
        nullable=False
    )

    firstname: str
    lastname: str
    message: str | None = Field(default=None, nullable=True)
    email: EmailStr

    dt: datetime = Field(default_factory=datetime.now)