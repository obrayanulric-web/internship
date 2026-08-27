from database.db import get_db
from models.property_model import Properties
from schemas.property_schema import PropertyCreate, PropertyResponse, PropertyUpdate
from fastapi import APIRouter, HTTPException, status, Depends
from sqlmodel import Session


router = APIRouter(prefix="/Property", tags=["property"])

@router.post("/")
def CreatProperty(data: PropertyCreate, db: Session = Depends(get_db)):
    new_property = Properties(
        title=data.title,
        location=data.location,
        city=data.city,
        price=data.price,
        pricePeriod=data.pricePeriod,
        currency=data.currency,
        purpose=data.purpose,
        type=data.type,
        bedrooms=data.bedrooms,
        bathrooms=data.bathrooms,
        areaSqM=data.areaSqM,
        imageUrl=data.imageUrl,
        description=data.description,
        isFeatured=data.isFeatured,
        isNew=data.isNew,
    )

    db.add(new_property)
    db.commit()
    db.refresh(new_property)

    return {"message": new_property}


@router.get("/")
def get_all_property(db: Session = Depends(get_db)):
    properties = db.query(Properties).all()
    if not properties:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="the data base is still empty please create data before fetching all")
    return properties

@router.put("/{property_id}")
def Update_property(data: PropertyUpdate, property_id: int, db: Session = Depends(get_db)):
    propertyudated = db.query(Properties).filter(Properties.id == property_id).first()
    if not propertyudated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="property not found")

    propertyudated.title = data.title
    propertyudated.location = data.location
    propertyudated.city = data.city
    propertyudated.price = data.price
    propertyudated.pricePeriod = data.pricePeriod
    propertyudated.currency = data.currency
    propertyudated.purpose = data.purpose
    propertyudated.type = data.type
    propertyudated.bedrooms = data.bedrooms
    propertyudated.bathrooms = data.bathrooms
    propertyudated.areaSqM = data.areaSqM
    propertyudated.imageUrl = data.imageUrl
    propertyudated.description = data.description
    propertyudated.isFeatured = data.isFeatured
    propertyudated.isNew = data.isNew

    db.commit()
    db.refresh(propertyudated)

    return {"message" : {
        propertyudated
    }}


@router.get("/{property_id}")
def get_property(property_id: int, db: Session = Depends(get_db)):
    target = db.query(Properties).filter(Properties.id == property_id).first()
    if not target:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="property not found")
    return target

@router.delete("/{property_id}")
def get_property(property_id: int, db: Session = Depends(get_db)):
    target = db.query(Properties).filter(Properties.id == property_id).first()
    if not target:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="property not found")
    db.delete(target)
    db.commit()
    return {"property deleted sucessfully": {
        "propertyName" : target.title,
        "property id" : target.id
         }}
