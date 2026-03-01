import React, { useState } from 'react';
import { FaSun, FaMoon, FaBars, FaTimes, FaCog, FaUserPlus, FaSignOutAlt, FaChevronDown, FaBookmark, FaBook, FaMicrophone, FaLightbulb, FaChartLine, FaTrophy } from 'react-icons/fa';

const HomeNavbar = ({ 
  darkMode, 
  toggleDarkMode, 
  userName = 'sunil', 
  userEmail = 'sunil.2024@mitmeerut.ac.in', 
  onLogout,
  onSettingsClick,
  onBookmarksClick,
  onLearnClick,
  onTipsClick,
  onPracticeClick,
  onProgressClick,
  onLeaderboardClick,
  onHomeClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home', onClick: onHomeClick, icon: null },
    { name: 'Learn', id: 'learn', onClick: onLearnClick, icon: <FaBook className="inline mr-1" /> },
    { name: 'Practice', id: 'practice', onClick: onPracticeClick, icon: <FaMicrophone className="inline mr-1" /> },
    { name: 'Bookmarks', id: 'bookmarks', onClick: onBookmarksClick, icon: <FaBookmark className="inline mr-1" /> },
    { name: 'Tips', id: 'tips', onClick: onTipsClick, icon: <FaLightbulb className="inline mr-1" /> },
    { name: 'Progress', id: 'progress', onClick: onProgressClick, icon: <FaChartLine className="inline mr-1" /> },
    { name: 'Leaderboard', id: 'leaderboard', onClick: onLeaderboardClick, icon: <FaTrophy className="inline mr-1" /> }
  ];

  const handleSettingsClick = () => {
    setIsProfileOpen(false);
    setIsOpen(false);
    if (onSettingsClick) onSettingsClick();
  };

  const handleNavClick = (item) => {
    if (item.onClick) item.onClick();
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-primary to-secondary sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={onHomeClick}
            className="text-2xl font-black text-white tracking-wider hover:scale-105 transition-transform duration-300"
          >
            SelfViewAI
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="text-white font-semibold hover:text-gray-200 transition-all duration-300 hover:scale-110 text-sm lg:text-base flex items-center"
              >
                {item.icon} {item.name}
              </button>
            ))}
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300 hover:rotate-180"
            >
              {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-all"
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary font-bold">
                  {userName?.charAt(0).toUpperCase()}
                </div>
                <span className="text-white font-semibold">{userName}</span>
                <FaChevronDown className={`text-white text-xs transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-fadeIn">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="font-semibold text-gray-900 dark:text-white">SUNIL KUMAR</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{userEmail}</div>
                  </div>
                  
                  <div className="p-2">
                    <button 
                      onClick={handleSettingsClick}
                      className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all flex items-center gap-3"
                    >
                      <FaCog className="text-gray-500" />
                      <span>Settings</span>
                    </button>
                    
                    <button className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all flex items-center gap-3">
                      <FaUserPlus className="text-gray-500" />
                      <span>Invite Friends</span>
                    </button>
                    
                    <button 
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all flex items-center gap-3"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all"
            >
              {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:scale-110 transition-transform"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-lg rounded-b-2xl py-4 px-4 mb-2 animate-fadeIn">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="block w-full text-left text-white font-semibold py-3 hover:bg-white/20 rounded-lg px-4 transition-all flex items-center"
              >
                {item.icon} {item.name}
              </button>
            ))}
            
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary font-bold text-lg">
                  {userName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-white font-semibold">{userName}</div>
                  <div className="text-white/60 text-xs">{userEmail}</div>
                </div>
              </div>
              
              <button 
                onClick={handleSettingsClick}
                className="w-full mt-2 bg-white/10 text-white font-semibold py-3 rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <FaCog /> Settings
              </button>
              
              <button className="w-full mt-2 bg-white/10 text-white font-semibold py-3 rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                <FaUserPlus /> Invite Friends
              </button>
              
              <button 
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="w-full mt-2 bg-red-500/20 text-red-300 font-semibold py-3 rounded-lg hover:bg-red-500/30 transition-all flex items-center justify-center gap-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HomeNavbar;