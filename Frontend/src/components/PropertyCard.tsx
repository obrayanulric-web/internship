import React from "react";
import { MapPin, Bed, Bath, Move, Heart } from "lucide-react";
import type { Property } from "../types/property";

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-none overflow-hidden shadow-none hover:border-gray-400 transition-all duration-300 group flex flex-col justify-between">
      {/* Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-gray-100 rounded-none">
        <img
          src={
            property.imageUrl
              ? property.imageUrl
              : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          }
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-none"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c";
          }}
        />

        {/* Crisp Square Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10 rounded-none">
          {property.isFeatured && (
            <span className="bg-[#0f382c] text-white text-[10px] font-semibold px-2.5 py-1 tracking-wider uppercase rounded-none">
              Featured
            </span>
          )}
          <span className="bg-black/80 text-white text-[10px] font-semibold px-2.5 py-1 tracking-wider uppercase rounded-none">
            {property.purpose === "rent" ? "For Rent" : "For Sale"}
          </span>
        </div>

        {/* Square Favorite Button */}
        <button
          type="button"
          aria-label="Save property"
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-gray-700 hover:text-red-500 transition rounded-none shadow-none"
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Details Section */}
      <div className="p-5 rounded-none flex-1 flex flex-col justify-between">
        <div>
          <div className="text-base font-extrabold text-[#0f382c] mb-1">
            {property.price}
          </div>

          <h3 className="text-sm font-bold text-gray-900 line-clamp-1 mb-2 group-hover:text-[#0f382c] transition-colors">
            {property.title}
          </h3>

          <div className="flex items-center text-xs text-gray-500 mb-4">
            <MapPin className="w-3.5 h-3.5 mr-1 shrink-0 text-gray-400" />
            <span className="line-clamp-1">{property.location}</span>
          </div>
        </div>

        {/* Features Specs Bar */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600 font-medium rounded-none">
          <div className="flex items-center space-x-1.5">
            <Bed className="w-3.5 h-3.5 text-gray-400" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Bath className="w-3.5 h-3.5 text-gray-400" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Move className="w-3.5 h-3.5 text-gray-400" />
            <span>{property.areaSqM} m²</span>
          </div>
        </div>
      </div>
    </div>
  );
};
