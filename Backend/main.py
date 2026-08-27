from fastapi import FastAPI
from database.db import Base, engine
from models.user_model import Users
from sqlmodel import SQLModel

from fastapi.middleware.cors import CORSMiddleware

from routers.auth import router as auth_router
from routers.user_auth import router as user_router
from routers.message_router import router as message_router
from routers.property_router import router as property_router

SQLModel.metadata.create_all(bind=engine)

app = FastAPI(
    title="HomeFinder API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173","http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)





app.include_router(auth_router)
app.include_router(user_router)
app.include_router(message_router)
app.include_router(property_router)