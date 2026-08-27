
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.db import get_db
from models.user_model import Users
from schemas.user_schema import  UserUpdate
from dependencies.user_auth import hash_password, verify_password, create_access_token, get_current_user


router = APIRouter(
    prefix="/Auth",
    tags=["auth"],
    dependencies=[Depends(get_current_user)]
)

@router.get("/")
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(Users).all()

    return [
        {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
        for user in users
    ]


    
@router.get("/me")
def get_me(
    current_user: Users = Depends(get_current_user)
):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email
    }

@router.get("/user/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="user not found please try a valide id")
    return {
    "id": user.id,
    "name": user.name,
    "email": user.email
}

@router.put("/user/{user_id}")
def update_user(
    user_id: int,
    data: UserUpdate,
    db: Session = Depends(get_db)
):
    user = db.query(Users).filter(
        Users.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.name = data.name
    user.email = data.email
    user.password = hash_password(data.password)

    db.commit()
    db.refresh(user)

    return {
        "message": "User updated successfully",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }

@router.delete("/delete/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.id == user_id).first()
    if not user:
            raise HTTPException(status_code=404, detail="user not found please try a valide id")
    db.delete(user)
    db.commit()

    return "User deleted sucessfully"    