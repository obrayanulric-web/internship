from typing import Literal
from pydantic import BaseModel


class PropertyCreate(BaseModel):
    title: str
    location: str
    city: str

    price: int
    pricePeriod: Literal["month", "year"] = "month"

    currency: str

    purpose: Literal["rent", "sale"] = "rent"

    type: Literal[
        "Apartment",
        "Villa",
        "Duplex",
        "Studio",
        "House",
        "Land"
    ] = "Apartment"

    bedrooms: int
    bathrooms: int
    areaSqM: int

    imageUrl: str
    description: str

    isFeatured: bool = False
    isNew: bool = False


class PropertyUpdate(BaseModel):
    title: str | None = None
    location: str | None = None
    city: str | None = None
    price: int | None = None
    pricePeriod: Literal["month", "year"] | None = None
    currency: str | None = None
    purpose: Literal["rent", "sale"] | None = None

    type: Literal[
        "Apartment",
        "Villa",
        "Duplex",
        "Studio",
        "House"
    ] | None = None

    bedrooms: int | None = None
    bathrooms: int | None = None
    areaSqM: int | None = None
    imageUrl: str | None = None
    description: str | None = None
    isFeatured: bool | None = None
    isNew: bool | None = None


class PropertyResponse(BaseModel):
    id: int
    title: str
    location: str
    city: str
    price: int
    pricePeriod: Literal["month", "year"]
    currency: str
    purpose: Literal["rent", "sale"]
    type: Literal[
        "Apartment",
        "Villa",
        "Duplex",
        "Studio",
        "House"
    ]
    bedrooms: int
    bathrooms: int
    areaSqM: int
    imageUrl: str
    description: str
    isFeatured: bool
    isNew: bool