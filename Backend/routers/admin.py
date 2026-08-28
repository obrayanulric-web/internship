from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.db import get_db
from models.user_model import Users
from dependencies.user_auth import get_current_admin


router = APIRouter(
    prefix="/admin",
    tags=["admin"]
)


@router.get("/dashboard")
def admin_dashboard(
    current_admin: Users = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    total_users = db.query(Users).count()

    return {
        "message": "Welcome to the admin dashboard",
        "admin": current_admin.name,
        "total_users": total_users
    }