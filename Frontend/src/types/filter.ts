import type { ListingPurpose, PropertyType } from './property';

export type BedroomFilter = 'any' | 1 | 2 | 3 | 4;
export type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'newest';

export interface PropertyFilterState {
  searchQuery: string;
  purpose: ListingPurpose | 'all';
  propertyType: PropertyType | 'all';
  bedrooms: BedroomFilter;
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: SortOption;
}