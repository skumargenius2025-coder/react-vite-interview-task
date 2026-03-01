import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Home/Home';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const handleClose = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleSignupSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setShowSignup(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="bg-light dark:bg-dark min-h-screen">
        {!isLoggedIn && (
          <Navbar 
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            onLoginClick={handleLoginClick}
            isLoggedIn={false}
          />
        )}
        
        {isLoggedIn ? (
          <Home 
            user={user} 
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            onLogout={handleLogout}
          />
        ) : (
          <Banner onLoginClick={handleLoginClick} />  // 👈 yahan prop pass kiya
        )}

        {/* Login Overlay */}
        {showLogin && (
          <Login
            onClose={handleClose}
            onSwitchToSignup={handleSignupClick}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {/* Signup Overlay */}
        {showSignup && (
          <Signup
            onClose={handleClose}
            onSwitchToLogin={handleLoginClick}
            onSignupSuccess={handleSignupSuccess}
          />
        )}
      </div>
    </div>
  );
}

export default App;