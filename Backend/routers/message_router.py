from fastapi import APIRouter, HTTPException, Depends, status
from sqlmodel import Session
from models.message_model import Message
from schemas.message_schema import MessageCreate, MessageResponse
from database.db import get_db


router = APIRouter(prefix="/Message", tags=["Message"])

@router.post("/", response_model=MessageResponse)
def Create_Message(data: MessageCreate, db: Session = Depends(get_db)):
    messages = Message(
        firstname=data.firstname,
        lastname=data.lastname,
        email=data.email,
        message=data.message
    )
    db.add(messages)
    db.commit()
    db.refresh(messages)
    return messages


@router.get("/")
def get_all_messages(db: Session = Depends(get_db)):
    messages = db.query(Message).all()
    return messages

@router.delete("/{message_id}")
def delete_message(
    message_id: int,
    db: Session = Depends(get_db)
):
    deleted_message = db.query(Message).filter(
        Message.id == message_id
    ).first()

    if not deleted_message:
        raise HTTPException(
            status_code=404,
            detail="Message not found"
        )

    db.delete(deleted_message)
    db.commit()

    return {
        "message": "Message deleted successfully"
    }