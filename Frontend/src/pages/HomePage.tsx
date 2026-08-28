import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';
import api from '../api/axios';
import type { Property } from '../types/property';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await api.get('/Property/');
        setProperties(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const featured = properties.filter((p) => p.isFeatured);
  const displayedProperties = (featured.length > 0 ? featured : properties).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fafafa] rounded-none">
      <section className="relative pt-6 pb-12 md:pt-10 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto rounded-none">
        <div className="relative rounded-none overflow-hidden min-h-[460px] md:min-h-[520px] flex items-center justify-center p-6 md:p-12 text-center border border-gray-200">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600"
            alt="Find Home Hero"
            className="absolute inset-0 w-full h-full object-cover rounded-none"
          />
          <div className="absolute inset-0 bg-black/50 rounded-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-white space-y-6">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Find a place you'll love to call home.
            </h1>
            <p className="text-sm sm:text-base text-gray-200 max-w-lg mx-auto leading-relaxed">
              Discover carefully selected homes, apartments, and luxury villas for rent or sale across Cameroon.
            </p>
            
            <div className="pt-3 flex justify-center">
              <button
                type="button"
                onClick={() => navigate('/properties')}
                className="group relative inline-flex items-center space-x-3 px-8 py-3.5 bg-[#0f382c] hover:bg-white text-white hover:text-[#0f382c] border border-[#0f382c] text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-none shadow-none cursor-pointer"
              >
                <span>Browse All Properties</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto rounded-none">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Featured Properties
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Curated selections for premium living in prime locations.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/properties')}
            className="self-start sm:self-auto group text-xs font-bold text-[#0f382c] hover:underline uppercase tracking-wider flex items-center space-x-1.5 rounded-none cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {loading ? (
          <div className="bg-white p-12 border border-gray-200 text-center">
            <p className="text-xs text-gray-500">Loading featured properties...</p>
          </div>
        ) : displayedProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 rounded-none">
            {displayedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 border border-gray-200 text-center">
            <p className="text-xs text-gray-500">No featured properties available.</p>
          </div>
        )}
      </section>
    </div>
  );
};