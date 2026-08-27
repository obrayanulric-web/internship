import React from 'react';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f5f6f4] border-t border-gray-200/60 pt-12 pb-8 rounded-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-none">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 rounded-none">
          
          <div className="space-y-4 rounded-none">
            <div className="flex items-center space-x-2 rounded-none">
              <div className="w-8 h-8 bg-[#0f382c] rounded-none flex items-center justify-center text-white">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-gray-900">FindHome</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
              Your trusted sanctuary for finding high-value real estate listings and premium properties across Cameroon.
            </p>
          </div>

          <div className="rounded-none">
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li>
                <Link to="/" className="hover:text-[#0f382c] transition">Home</Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-[#0f382c] transition">Properties</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#0f382c] transition">Contact</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-[#0f382c] transition">Register</Link>
              </li>
            </ul>
          </div>

          <div className="rounded-none">
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li><a href="#" className="hover:text-[#0f382c] transition">Help Center</a></li>
              <li><a href="#" className="hover:text-[#0f382c] transition">FAQs</a></li>
              <li><a href="#" className="hover:text-[#0f382c] transition">Safety & Trust</a></li>
            </ul>
          </div>

          <div className="rounded-none">
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li><a href="#" className="hover:text-[#0f382c] transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#0f382c] transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#0f382c] transition">Cookie Policy</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4 rounded-none">
          <p>© {new Date().getFullYear()} FindHome Real Estate. All rights reserved.</p>
          <p className="text-gray-400">Curated for lifestyle and peace of mind.</p>
        </div>
      </div>
    </footer>
  );
};