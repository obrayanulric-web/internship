import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Building2, Menu, X } from 'lucide-react';
import api from '../api/axios';

interface UserProfile {
  id: number;
  name: string;
  email: string;
}

interface NavbarProps {
  isAuthenticated?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const location = useLocation();

  const fetchCurrentUser = async () => {
    const token =
      localStorage.getItem('access_token') ||
      localStorage.getItem('token') ||
      localStorage.getItem('accessToken');

    if (!token) {
      setUser(null);
      return;
    }

    const cachedUser = localStorage.getItem('user');
    if (cachedUser) {
      try {
        setUser(JSON.parse(cachedUser));
      } catch {
      }
    }

    try {
      const response = await api.get<UserProfile>('/Auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      }
    } catch (error: any) {
      console.error('Failed to fetch current user:', error);

      if (error?.response?.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('token');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setUser(null);
      }
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [isAuthenticated, location.pathname]);

  useEffect(() => {
    window.addEventListener('storage', fetchCurrentUser);
    window.addEventListener('authChange', fetchCurrentUser);

    return () => {
      window.removeEventListener('storage', fetchCurrentUser);
      window.removeEventListener('authChange', fetchCurrentUser);
    };
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition duration-200 ${
      isActive ? 'text-[#0f382c] font-semibold' : 'text-gray-600 hover:text-gray-900'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 rounded-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between rounded-none">
        
        <Link to="/" onClick={closeMenu} className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-[#0f382c] rounded-none flex items-center justify-center text-white shadow-none">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            FindHome
          </span>
        </Link>

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

        <div className="hidden md:flex items-center">
          {user ? (
            <Link
              to="/dashboard"
              className="flex items-center space-x-3 group"
              title={`Logged in as ${user.name}`}
            >
              <div className="w-10 h-10 bg-[#0f382c] text-white font-bold text-base flex items-center justify-center rounded-full border border-[#0f382c] group-hover:bg-[#0b2920] transition duration-200">
                {userInitial}
              </div>
              <span className="text-sm font-semibold text-gray-800 group-hover:text-[#0f382c] transition">
                {user.name}
              </span>
            </Link>
          ) : (
            <Link
              to="/register"
              className="px-5 py-2.5 bg-[#0f382c] text-white text-sm font-medium rounded-none hover:bg-[#0b2920] transition duration-200 shadow-none"
            >
              Register
            </Link>
          )}
        </div>

        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none rounded-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

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
            {user ? (
              <Link
                to="/dashboard"
                onClick={closeMenu}
                className="flex items-center space-x-3 w-full p-2 bg-[#f0f4f2] border border-[#0f382c]/20 rounded-none hover:bg-[#0f382c] hover:text-white transition group"
              >
                <div className="w-8 h-8 bg-[#0f382c] group-hover:bg-white group-hover:text-[#0f382c] text-white font-bold text-sm flex items-center justify-center rounded-full transition">
                  {userInitial}
                </div>
                <span className="text-sm font-semibold">{user.name}</span>
              </Link>
            ) : (
              <Link
                to="/register"
                onClick={closeMenu}
                className="block w-full text-center py-2.5 bg-[#0f382c] text-white text-sm font-medium rounded-none hover:bg-[#0b2920] transition"
              >
                Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};