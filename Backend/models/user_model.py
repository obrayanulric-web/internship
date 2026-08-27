from sqlmodel import SQLModel, Field

class Users(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True, index=True)
    name: str | None = Field(unique=True, nullable=False)
    email: str | None = Field(unique=True, nullable=False, index=True)
    password: str | None = Field(nullable=False)
