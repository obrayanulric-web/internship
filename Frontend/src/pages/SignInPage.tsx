import React from 'react';
import { SignInForm } from '../components/SignInForm';

export const SignInPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 sm:p-8 bg-gray-900 rounded-none overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
        alt="Sanctuary Home"
        className="absolute inset-0 w-full h-full object-cover rounded-none"
      />

      <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px] rounded-none" />

      <div className="relative z-10 w-full max-w-lg bg-white/90 backdrop-blur-md border border-white/40 shadow-2xl rounded-none my-8 overflow-hidden">
        <div className="bg-slate-900/10 p-6 sm:p-8 text-center border-b border-gray-200/50">
          <span className="text-[11px] font-bold tracking-widest text-[#0f382c] uppercase">
            FindHome Real Estate
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mt-1 tracking-tight">
            Welcome back home
          </h2>
          <p className="text-xs text-gray-600 mt-1 max-w-xs mx-auto">
            Sign in to access your saved properties and profile across Cameroon.
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <SignInForm />
        </div>
      </div>
    </div>
  );
};
