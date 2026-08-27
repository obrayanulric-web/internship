from sqlmodel import SQLModel, Field


class Properties(SQLModel, table=True):
    id: int | None = Field(
        default=None,
        primary_key=True,
        index=True
    )

    title: str
    location: str
    city: str

    price: int
    pricePeriod: str = "month"

    currency: str

    purpose: str = "rent"

    type: str = "Apartment"

    bedrooms: int
    bathrooms: int
    areaSqM: int

    imageUrl: str
    description: str

    isFeatured: bool = False
    isNew: bool = False