from sqlmodel import Session, select

from database.db import engine
from models.user_model import Users
from dependencies.user_auth import hash_password


def seed_admin():
    with Session(engine) as db:
        existing_admin = db.exec(
            select(Users).where(Users.is_admin == True)
        ).first()

        if existing_admin:
            print("Admin already exists")
            return

        admin = Users(
            name="Admin",
            email="admin@gmail.com",
            password=hash_password("123admin"),
            is_admin=True
        )

        db.add(admin)
        db.commit()

        print("Admin created successfully")


if __name__ == "__main__":
    seed_admin()