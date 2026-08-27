import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Building2, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition duration-200 ${
      isActive ? 'text-[#0f382c] font-semibold' : 'text-gray-600 hover:text-gray-900'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 rounded-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between rounded-none">
        
        {/* Brand Logo */}
        <Link to="/" onClick={closeMenu} className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-[#0f382c] rounded-none flex items-center justify-center text-white shadow-none">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            FindHome
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" end className={navLinkStyle}>
            Home
          </NavLink>
          <NavLink to="/properties" className={navLinkStyle}>
            Properties
          </NavLink>
          <NavLink to="/contact" className={navLinkStyle}>
            Contact
          </NavLink>
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center">
          <Link
            to="/register"
            className="px-5 py-2.5 bg-[#0f382c] text-white text-sm font-medium rounded-none hover:bg-[#0b2920] transition duration-200 shadow-none"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none rounded-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-4 rounded-none">
          <nav className="flex flex-col space-y-3 pt-2">
            <NavLink to="/" end onClick={closeMenu} className={navLinkStyle}>
              Home
            </NavLink>
            <NavLink to="/properties" onClick={closeMenu} className={navLinkStyle}>
              Properties
            </NavLink>
            <NavLink to="/contact" onClick={closeMenu} className={navLinkStyle}>
              Contact
            </NavLink>
          </nav>
          <div className="pt-2">
            <Link
              to="/register"
              onClick={closeMenu}
              className="block w-full text-center py-2.5 bg-[#0f382c] text-white text-sm font-medium rounded-none hover:bg-[#0b2920] transition"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};