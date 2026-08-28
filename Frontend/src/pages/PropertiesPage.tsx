import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, ChevronLeft, ChevronRight, X } from "lucide-react";
import { PropertyCard } from "../components/PropertyCard";
import { FilterSidebar } from "../components/FilterSidebar";
import type { PropertyFilterState, SortOption } from "../types/filter";
import api from "../api/axios";
import axios from "axios";
import type { Property } from "../types/property";

const ITEMS_PER_PAGE = 6;

export const PropertiesPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState<PropertyFilterState>({
    searchQuery: searchParams.get("location") || "",
    purpose: (searchParams.get("purpose") as any) || "all",
    propertyType: (searchParams.get("type") as any) || "all",
    bedrooms: "any",
    minPrice: null,
    maxPrice: null,
    sortBy: "recommended",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const handleFilterChange = <K extends keyof PropertyFilterState>(
    key: K,
    value: PropertyFilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      searchQuery: "",
      purpose: "all",
      propertyType: "all",
      bedrooms: "any",
      minPrice: null,
      maxPrice: null,
      sortBy: "recommended",
    });
    setCurrentPage(1);
  };

  const filteredProperties = useMemo(() => {
    return properties
      .filter((property) => {
        if (
          filters.searchQuery &&
          !property.location
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase()) &&
          !property.city
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase())
        ) {
          return false;
        }

        if (filters.purpose !== "all" && property.purpose !== filters.purpose) {
          return false;
        }

        if (
          filters.propertyType !== "all" &&
          property.type.toLowerCase() !== filters.propertyType.toLowerCase()
        ) {
          return false;
        }

        if (
          filters.bedrooms !== "any" &&
          property.bedrooms < Number(filters.bedrooms)
        ) {
          return false;
        }

        if (filters.minPrice !== null && property.price < filters.minPrice) {
          return false;
        }

        if (filters.maxPrice !== null && property.price > filters.maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "price-asc") {
          return a.price - b.price;
        }

        if (filters.sortBy === "price-desc") {
          return b.price - a.price;
        }

        return 0;
      });
  }, [properties, filters]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await api.get("/Property/");
        setProperties(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setFetchError(
            error.response?.data?.detail || "Failed to fetch properties"
          );
        } else {
          setFetchError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const displayedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProperties, currentPage]);

  return (
    <div className="bg-[#fafafa] min-h-screen py-8 md:py-12 rounded-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-none">
        <div className="mb-8 rounded-none">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Find your next home
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Browse available properties across Cameroon.
          </p>
        </div>

        <div className="lg:hidden mb-6 flex justify-between items-center bg-white p-3 border border-gray-200 rounded-none shadow-none">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 text-sm font-semibold text-[#0f382c] rounded-none cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          <span className="text-xs text-gray-500">
            {filteredProperties.length} Properties found
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start rounded-none">
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-24 rounded-none">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              totalResults={filteredProperties.length}
            />
          </div>

          <div className="lg:col-span-8 xl:col-span-9 space-y-6 rounded-none">
            <div className="bg-white p-4 border border-gray-200 shadow-none rounded-none flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-sm font-medium text-gray-700">
                Showing{" "}
                <strong className="text-gray-900">
                  {filteredProperties.length}
                </strong>{" "}
                properties
              </span>

              <div className="flex items-center space-x-2 rounded-none">
                <label className="text-xs text-gray-500 font-medium whitespace-nowrap">
                  Sort by:
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    handleFilterChange("sortBy", e.target.value as SortOption)
                  }
                  className="bg-gray-50 border border-gray-200 text-xs text-gray-900 rounded-none px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#0f382c]"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="bg-white p-12 border border-gray-200 text-center">
                <p className="text-xs text-gray-500">Loading properties...</p>
              </div>
            ) : fetchError ? (
              <div className="bg-red-50 p-12 border border-red-200 text-center">
                <p className="text-xs text-red-700">{fetchError}</p>
              </div>
            ) : displayedProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 rounded-none">
                {displayedProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 border border-gray-200 text-center space-y-3 rounded-none">
                <h3 className="text-lg font-semibold text-gray-800">
                  No properties found
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  We couldn't find any properties matching your current filter
                  criteria. Try resetting your search filters.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2 bg-[#0f382c] text-white text-xs font-medium rounded-none hover:bg-[#0b2920] transition cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 pt-6 rounded-none">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-none bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-9 h-9 text-xs font-semibold border transition rounded-none cursor-pointer ${
                        currentPage === pageNum
                          ? "bg-[#0f382c] text-white border-[#0f382c]"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-200 rounded-none bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden rounded-none">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm rounded-none"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl overflow-y-auto p-6 flex flex-col justify-between rounded-none">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6 rounded-none">
                <h2 className="text-lg font-bold text-gray-900">
                  Filter Properties
                </h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-700 rounded-none cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                totalResults={filteredProperties.length}
              />
            </div>

            <div className="pt-6 border-t border-gray-100 mt-6 rounded-none">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-2.5 bg-[#0f382c] text-white text-sm font-medium rounded-none cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
