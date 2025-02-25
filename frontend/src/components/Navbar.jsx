import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check auth status on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Dashboard', path: '/Dashboard' },
    { name: 'Feedback', path: '/feedback' },
  ];

  return (
    <nav className="bg-black/90 backdrop-blur-xl border-b border-gray-800 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16">
          {/* Left section - Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
                Feedback.
              </span>
            </Link>
          </div>

          {/* Middle section - Desktop Nav */}
          <div className="hidden md:flex items-center mx-15 space-x-5 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-300 hover:text-white px-3 py-2 relative group transition-all duration-300 flex items-center justify-center"
                style={location.pathname === item.path ? { borderBottom: '2px solid #06b6d4' } : {}}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right section - Auth/Profile */}
          <div className="hidden md:flex items-center space-x-6">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-300 hover:text-cyan-500 transition-colors"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-300 hover:text-white border border-gray-700 rounded-lg hover:border-cyan-400 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-cyan-700 to-cyan-1000 text-white rounded-lg hover:shadow-cyan-400/20 hover:shadow-md transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-gray-800">
          <div className="px-4 pt-2 pb-3 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-300 hover:text-white px-3 py-2 hover:bg-gray-900/50 rounded-lg transition-colors"
                style={location.pathname === item.path ? { textDecoration: 'underline' } : {}}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-gray-800">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center text-gray-300 hover:text-cyan-400 px-3 py-2"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center text-gray-300 hover:text-white px-3 py-2 border border-gray-700 rounded-lg hover:border-cyan-400"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-2 rounded-lg hover:shadow-cyan-400/20"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar