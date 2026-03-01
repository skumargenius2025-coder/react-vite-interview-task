import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ darkMode, toggleDarkMode, onLoginClick, isLoggedIn, userName = 'sunil' }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-primary to-secondary sticky top-0 z-50 shadow-lg animate-slideDown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('home')}
            className="text-2xl font-black text-white tracking-wider hover:scale-105 transition-transform duration-300"
          >
            SelfViewAI
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-white font-semibold hover:text-gray-200 transition-all duration-300 hover:scale-110"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-white font-semibold hover:text-gray-200 transition-all duration-300 hover:scale-110"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('tips')}
              className="text-white font-semibold hover:text-gray-200 transition-all duration-300 hover:scale-110"
            >
              Tips
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white font-semibold hover:text-gray-200 transition-all duration-300 hover:scale-110"
            >
              Contact
            </button>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300 hover:rotate-180"
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>

            {/* Login / User Profile */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary font-bold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="text-white font-semibold">{userName}</span>
              </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className="bg-white text-primary font-bold px-6 py-2 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300 hover:rotate-180"
            >
              {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:scale-110 transition-transform duration-300"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-lg rounded-b-2xl py-4 px-4 mb-2 animate-fadeIn">
            <button 
              onClick={() => scrollToSection('home')}
              className="block w-full text-left text-white font-semibold py-3 hover:bg-white/20 rounded-lg px-4 transition-all"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-white font-semibold py-3 hover:bg-white/20 rounded-lg px-4 transition-all"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('tips')}
              className="block w-full text-left text-white font-semibold py-3 hover:bg-white/20 rounded-lg px-4 transition-all"
            >
              Tips
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-white font-semibold py-3 hover:bg-white/20 rounded-lg px-4 transition-all"
            >
              Contact
            </button>
            
            {isLoggedIn ? (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/20">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary font-bold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="text-white font-semibold">{userName}</span>
              </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className="w-full mt-2 bg-white text-primary font-bold py-3 rounded-lg hover:bg-gray-100 transition-all hover:scale-105"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;