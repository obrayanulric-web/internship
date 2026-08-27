from datetime import datetime, timedelta, timezone
from pwdlib import PasswordHash
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from database.db import get_db
from models.user_model import Users



SECRET_KEY = "MY_SECRET_KEY_THAT_I_WILL_NEVER_FORGET"
ALGORITHM = "HS256"


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/Auth/login"
)

password_hash = PasswordHash.recommended()

def hash_password(password: str):
    return password_hash.hash(password)

def verify_password(password: str, hashed_password: str):
    return password_hash.verify(password, hashed_password)

def create_access_token(user_id: int):
    expire = datetime.now(timezone.utc) + timedelta(minutes=30)
    payload = {
        "sub": str(user_id),
        "exp" : expire
    }

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credential_exeption = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalide or expired token", headers={"www-Authenticate": "Bearer"},)
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise credential_exeption
    except JWTError:
        raise credential_exeption

    user = db.query(Users).filter(Users.id == int(user_id)).first()
    if user is None:
        raise credential_exeption
    return user
      
