import React from "react";
import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] bg-[#fafafa] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 rounded-none">
      <div className="max-w-md w-full text-center bg-white border border-gray-200 p-8 sm:p-12 rounded-none shadow-none">
        <span className="text-6xl font-extrabold text-[#0f382c] tracking-tight block mb-2">
          404
        </span>

        <h1 className="text-xl font-bold text-gray-900 tracking-tight mb-3">
          Page Not Found
        </h1>

        <p className="text-xs text-gray-500 leading-relaxed mb-8">
          The property or page you are looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-[#0f382c] hover:bg-[#0b2920] text-white text-xs font-semibold tracking-wider uppercase transition duration-200 rounded-none shadow-none"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>

          <Link
            to="/properties"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 text-xs font-semibold tracking-wider uppercase transition duration-200 rounded-none shadow-none"
          >
            <Search className="w-4 h-4" />
            <span>Browse Properties</span>
          </Link>
        </div>
      </div>
    </div>
  );
};