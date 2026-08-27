export type ListingPurpose = 'rent' | 'sale';
export type PropertyType = 'Apartment' | 'Villa' | 'Duplex' | 'Studio' | 'House';

export interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  price: number;
  pricePeriod?: 'month' | 'year';
  currency: string;
  purpose: ListingPurpose;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  areaSqM: number;
  imageUrl: string;
  description: string;
  isFeatured?: boolean;
  isNew?: boolean;
}