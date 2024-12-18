import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Gravatar from 'react-gravatar';
import { 
  ShoppingCart, 
  Search, 
  User, 
  Menu, 
  X 
} from 'lucide-react';
import { logoutUser } from '../actions/authActions';
import Slider from '../components/Slider.jsx';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user data from Redux store instead of localStorage
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    // Dispatch logout action instead of directly manipulating localStorage
    dispatch(logoutUser());
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const navigateTo = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex flex-row items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">E-commerce</h1>
          </div>

          {/* Navigation and Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="text-gray-600 hover:text-gray-800 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Icon */}
            <button className="text-gray-600 hover:text-gray-800 transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>

            {/* User Section */}
            {isAuthenticated && user ? (
              <div className="relative">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <Gravatar
                    email={user.email || `user-${user.id}@example.com`}
                    size={36}
                    className="rounded-full border-2 border-transparent hover:border-blue-500 transition-all"
                    default="mp"
                  />
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-20">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-medium text-gray-800">
                        {user.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <ul className="py-1">
                      <li>
                        <button
                          onClick={() => {
                            navigate("/profile");
                            setIsDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleLogoutClick();
                            setIsDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <User className="w-5 h-5" />
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="sm:hidden text-gray-600 hover:text-gray-800"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="sm:hidden">
            <ul className="flex flex-col items-center space-y-2 mt-4">
              <li>
                <button
                  onClick={() => navigateTo("/")}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("/product")}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Product
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("/pricing")}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("/contact")}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>
      
      {/* Slider right after the header */}
      <Slider />
    </>
  );
};

export default Header;
