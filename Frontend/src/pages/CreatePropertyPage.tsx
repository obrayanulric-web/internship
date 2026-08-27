import React from 'react';
import { CreatePropertyForm } from '../components/CreatePropertyForm';

export const CreatePropertyPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full relative py-12 sm:py-16 bg-gray-900 rounded-none overflow-hidden flex items-center justify-center p-4 sm:p-8">
      {/* Fullscreen Background Image */}
      <img
        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200"
        alt="Modern Architecture Property"
        className="absolute inset-0 w-full h-full object-cover rounded-none"
      />
      
      {/* Dark Overlay with subtle blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px] rounded-none" />

      {/* Centered Glassmorphic Form Card */}
      <div className="relative z-10 w-full max-w-3xl bg-white/90 backdrop-blur-md p-8 sm:p-12 border border-white/40 shadow-2xl rounded-none my-8">
        <div className="mb-8 text-center">
          <span className="text-[11px] font-bold tracking-widest text-[#0f382c] uppercase">
            FindHome - Partner Portal
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 tracking-tight">
            List Your Property
          </h2>
          <p className="text-xs text-gray-600 mt-1.5 max-w-md mx-auto leading-relaxed">
            Reach thousands of buyers across Cameroon. Complete the details below to add your listing to our platform.
          </p>
        </div>

        <CreatePropertyForm />
      </div>
    </div>
  );
};