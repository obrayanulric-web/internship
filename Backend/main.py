from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel

from database.db import engine
# Import all your models here so SQLModel registers them before create_all runs
from models.user_model import Users 

from routers.auth import router as auth_router
from routers.user_auth import router as user_router
from routers.message_router import router as message_router
from routers.property_router import router as property_router
# Import the admin router you just created
from routers.admin import router as admin_router 

@asynccontextmanager
async def lifespan(app: FastAPI):
   
    SQLModel.metadata.create_all(bind=engine)
    yield
  

app = FastAPI(
    title="HomeFinder API",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(message_router)
app.include_router(property_router)
app.include_router(admin_router)