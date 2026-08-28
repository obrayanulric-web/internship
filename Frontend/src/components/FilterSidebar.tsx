import React from 'react';
import { RotateCcw, MapPin, Home, Tag } from 'lucide-react';
import type { PropertyFilterState, BedroomFilter } from '../types/filter';

interface FilterSidebarProps {
  filters: PropertyFilterState;
  onFilterChange: <K extends keyof PropertyFilterState>(
    key: K,
    value: PropertyFilterState[K]
  ) => void;
  onClearFilters: () => void;
  totalResults: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  totalResults,
}) => {
  const bedroomOptions: BedroomFilter[] = ['any', 1, 2, 3, 4];
  const cities = ['Douala', 'Yaoundé', 'Bamenda', 'Buea', 'Limbé', 'Kribi', 'Bafoussam'];
  const propertyTypes = ['Apartment', 'Villa', 'Duplex', 'Studio', 'House'];

  return (
    <div className="bg-white p-6 rounded-none border border-gray-200 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 rounded-none">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-xs text-gray-500 hover:text-[#0f382c] flex items-center gap-1 transition rounded-none font-medium"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Clear all
        </button>
      </div>

      {/* 1. Location / City Select */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#0f382c]" />
          Location
        </label>
        <select
          value={filters.city || filters.searchQuery || 'all'}
          onChange={(e) => {
            const val = e.target.value === 'all' ? '' : e.target.value;
            onFilterChange('city', val);
            onFilterChange('searchQuery', val);
          }}
          className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-none text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0f382c] focus:bg-white transition"
        >
          <option value="all">All Locations</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Listing Purpose (Rent / Sale) */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-[#0f382c]" />
          Listing Type
        </label>
        <div className="grid grid-cols-3 gap-1 rounded-none">
          {[
            { label: 'All', value: 'all' },
            { label: 'For Rent', value: 'rent' },
            { label: 'For Sale', value: 'sale' },
          ].map((item) => {
            const isSelected = (filters.purpose || 'all') === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onFilterChange('purpose', item.value === 'all' ? '' : item.value)}
                className={`py-2 text-xs font-medium border rounded-none transition ${
                  isSelected
                    ? 'bg-[#0f382c] text-white border-[#0f382c]'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Property Type */}
 

      {/* 4. Price Range (FCFA) */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          Price Range (FCFA)
        </label>
        <div className="grid grid-cols-2 gap-2 rounded-none">
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice ?? ''}
            onChange={(e) =>
              onFilterChange(
                'minPrice',
                e.target.value ? Number(e.target.value) : null
              )
            }
            className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-none text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0f382c] focus:bg-white transition"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice ?? ''}
            onChange={(e) =>
              onFilterChange(
                'maxPrice',
                e.target.value ? Number(e.target.value) : null
              )
            }
            className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-none text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0f382c] focus:bg-white transition"
          />
        </div>
      </div>

      {/* 5. Bedrooms Selector */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          Bedrooms
        </label>
        <div className="flex gap-1 rounded-none">
          {bedroomOptions.map((option) => {
            const isSelected = filters.bedrooms === option;
            return (
              <button
                key={option.toString()}
                type="button"
                onClick={() => onFilterChange('bedrooms', option)}
                className={`flex-1 py-2 text-xs font-medium border rounded-none transition ${
                  isSelected
                    ? 'bg-[#0f382c] text-white border-[#0f382c]'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {option === 'any' ? 'Any' : `${option}+`}
              </button>
            );
          })}
        </div>
      </div>

 
      <div className="pt-2 border-t border-gray-100 rounded-none">
        <p className="text-xs text-center text-gray-400">
          Showing <span className="font-semibold text-gray-700">{totalResults}</span> matching properties
        </p>
      </div>
    </div>
  );
};