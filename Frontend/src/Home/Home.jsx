import React, { useState } from 'react';
import HomeNavbar from './HomeNavbar';
import Settings from './Settings';
import Learn from './Learn';
import Bookmarks from './Bookmarks';
import Tips from './Tips';
import Progress from './Progress';
import Leaderboard from './Leaderboard';
import HRInterview from './HRInterview';
import HRQuestionDetail from './HRQuestionDetail';
import Practice from './Practice'; // 👈 YEH SAHI HAI - same folder mein Practice.jsx
import { 
  FaBook, FaMicrophone, FaBookmark, FaLightbulb, FaChartLine, 
  FaTrophy, FaArrowRight, FaSearch, FaVideo, FaLightbulb as FaIdea 
} from 'react-icons/fa';

const Home = ({ user, darkMode, toggleDarkMode, onLogout }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedHRQuestion, setSelectedHRQuestion] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  // Navigation Handlers
  const handleSettingsClick = () => setCurrentPage('settings');
  const handleLearnClick = () => setCurrentPage('learn');
  const handleBookmarksClick = () => setCurrentPage('bookmarks');
  const handleTipsClick = () => setCurrentPage('tips');
  const handlePracticeClick = () => setCurrentPage('practice');
  const handleProgressClick = () => setCurrentPage('progress');
  const handleLeaderboardClick = () => setCurrentPage('leaderboard');
  const handleHRClick = () => {
    setCurrentPage('hr');
    setSelectedHRQuestion(null);
  };
  const handleHRQuestionSelect = (question) => setSelectedHRQuestion(question);
  const handleBackFromHR = () => {
    if (selectedHRQuestion) {
      setSelectedHRQuestion(null);
    } else {
      setCurrentPage('learn');
    }
  };
  const handleBackToDashboard = () => setCurrentPage('dashboard');

  // Bookmark functions
  const handleBookmarkToggle = (question, isBookmarked) => {
    if (isBookmarked) {
      const newBookmark = {
        ...question,
        subject: question.subject || 'General',
        notes: '',
        bookmarkedAt: new Date().toISOString()
      };
      setBookmarks([...bookmarks, newBookmark]);
    } else {
      setBookmarks(bookmarks.filter(b => b.id !== question.id));
    }
  };

  const handleUpdateBookmark = (id, updatedBookmark) => {
    setBookmarks(bookmarks.map(b => b.id === id ? updatedBookmark : b));
  };

  const handleDeleteBookmark = (id) => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
  };

  const stats = [
    { label: 'Total Score', value: '0', subtext: 'Points earned' },
    { label: 'Interviews', value: '0', subtext: 'Completed' },
    { label: 'Status', value: 'Not Ready', subtext: 'Keep practicing!', isBadge: true },
  ];

  const features = [
    { icon: <FaBook />, title: 'Learn', desc: 'Browse technical & HR questions', color: 'blue', id: 'learn' },
    { icon: <FaMicrophone />, title: 'Practice Interview', desc: 'Live AI-powered interview practice', color: 'purple', id: 'practice' },
    { icon: <FaBookmark />, title: 'Bookmarks', desc: 'Your saved questions & answers', color: 'orange', id: 'bookmarks' },
    { icon: <FaLightbulb />, title: 'Tips', desc: 'Expert interview preparation tips', color: 'green', id: 'tips' },
    { icon: <FaChartLine />, title: 'Progress Report', desc: 'Track your improvement', color: 'red', id: 'progress' },
    { icon: <FaTrophy />, title: 'Leaderboard', desc: 'See top performers', color: 'yellow', id: 'leaderboard' },
  ];

  const quickTips = [
    { icon: <FaSearch />, title: 'Research Company', desc: 'Always research company culture and recent projects.', color: 'blue' },
    { icon: <FaIdea />, title: 'STAR Method', desc: 'Use Situation, Task, Action, Result for behavioral questions.', color: 'yellow' },
    { icon: <FaVideo />, title: 'Record Yourself', desc: 'Practice with AI and review your body language.', color: 'purple' },
  ];

  const colorMap = {
    blue: "text-blue-500 bg-blue-100 dark:bg-blue-900/40",
    purple: "text-purple-500 bg-purple-100 dark:bg-purple-900/40",
    orange: "text-orange-500 bg-orange-100 dark:bg-orange-900/40",
    green: "text-green-500 bg-green-100 dark:bg-green-900/40",
    red: "text-red-500 bg-red-100 dark:bg-red-900/40",
    yellow: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/40"
  };

  return (
    <div className="min-h-screen bg-light dark:bg-dark transition-colors duration-300">
      <HomeNavbar 
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        userName={user?.name}
        userEmail="sunil.2024@mitmeerut.ac.in"
        onLogout={onLogout}
        onSettingsClick={handleSettingsClick}
        onBookmarksClick={handleBookmarksClick}
        onLearnClick={handleLearnClick}
        onTipsClick={handleTipsClick}
        onPracticeClick={handlePracticeClick}
        onProgressClick={handleProgressClick}
        onLeaderboardClick={handleLeaderboardClick}
        onHomeClick={handleBackToDashboard}
      />
      
      {/* Dashboard Page */}
      {currentPage === 'dashboard' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <section id="dashboard" className="scroll-mt-20">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-8 shadow-md border border-gray-200 dark:border-gray-700 animate-fadeIn">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Welcome back, <span className="text-primary">{user?.name || 'User'}</span>!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Ready to ace your next interview? Let's continue your journey.
              </p>
            </div>
          </section>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg border border-gray-100 dark:border-gray-700 hover:border-primary transition-all animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
                  {stat.label}
                </div>
                {stat.isBadge ? (
                  <div className="mb-2">
                    <span className="inline-block bg-primary text-white px-6 py-1.5 rounded-full text-lg font-black shadow-lg shadow-primary/20">
                      {stat.value}
                    </span>
                  </div>
                ) : (
                  <div className="text-4xl font-black text-gray-900 dark:text-white mb-2">{stat.value}</div>
                )}
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.subtext}</div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
            Your <span className="text-primary">Learning Tools</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                id={feature.id}
                onClick={() => {
                  if (feature.id === 'learn') handleLearnClick();
                  else if (feature.id === 'bookmarks') handleBookmarksClick();
                  else if (feature.id === 'tips') handleTipsClick();
                  else if (feature.id === 'practice') handlePracticeClick();
                  else if (feature.id === 'progress') handleProgressClick();
                  else if (feature.id === 'leaderboard') handleLeaderboardClick();
                  else alert(`${feature.title} section coming soon!`);
                }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-7 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all group border-b-4 hover:border-primary animate-fadeInUp text-left active:scale-95"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-14 h-14 ${colorMap[feature.color]} rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform shadow-inner`}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Quick Tips */}
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
            Quick <span className="text-primary">Tips</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {quickTips.map((tip, index) => (
              <div 
                key={index}
                className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-7 shadow-inner border border-gray-200 dark:border-gray-700 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 ${colorMap[tip.color]} rounded-full flex items-center justify-center mb-6 text-xl shadow-sm`}>
                  {tip.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{tip.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Start Section */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-[2rem] p-10 shadow-2xl text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-black mb-2 leading-tight">Ready to practice?</h3>
                <p className="text-white/80 text-lg">Jump right into your interview preparation</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <button
                  onClick={handlePracticeClick}
                  className="bg-white text-primary font-black px-10 py-4 rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  Start Practice
                  <FaArrowRight />
                </button>
                <button
                  onClick={handleLearnClick}
                  className="bg-white/10 border border-white/20 text-white font-bold px-10 py-4 rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm"
                >
                  Browse Questions
                </button>
              </div>
            </div>
          </div>

          {/* Motivational Quote */}
          <div className="text-center mt-12 mb-8">
            <p className="text-gray-600 dark:text-gray-400 italic">
              "Your dream job is waiting. Keep practicing, keep improving."
            </p>
          </div>
        </div>
      )}

      {/* Settings Page */}
      {currentPage === 'settings' && <Settings user={user} onBack={handleBackToDashboard} />}

      {/* Learn Page */}
      {currentPage === 'learn' && (
        <Learn 
          onBack={handleBackToDashboard}
          bookmarks={bookmarks}
          onBookmarkToggle={handleBookmarkToggle}
          onHRClick={handleHRClick}
        />
      )}

      {/* HR Interview Pages */}
      {currentPage === 'hr' && !selectedHRQuestion && (
        <HRInterview onBack={handleBackFromHR} onSelectQuestion={handleHRQuestionSelect} />
      )}
      {currentPage === 'hr' && selectedHRQuestion && (
        <HRQuestionDetail
          question={selectedHRQuestion}
          onBack={handleBackFromHR}
          onBookmarkToggle={handleBookmarkToggle}
          bookmarks={bookmarks}
        />
      )}

      {/* Bookmarks Page */}
      {currentPage === 'bookmarks' && (
        <Bookmarks
          bookmarks={bookmarks}
          onBack={handleBackToDashboard}
          onUpdateBookmark={handleUpdateBookmark}
          onDeleteBookmark={handleDeleteBookmark}
        />
      )}

      {/* Tips Page */}
      {currentPage === 'tips' && <Tips onBack={handleBackToDashboard} />}

      {/* Progress Page */}
      {currentPage === 'progress' && <Progress onBack={handleBackToDashboard} />}

      {/* Leaderboard Page */}
      {currentPage === 'leaderboard' && <Leaderboard onBack={handleBackToDashboard} />}

      {/* Practice Page */}
      {currentPage === 'practice' && <Practice onBack={handleBackToDashboard} />}
    </div>
  );
};

export default Home;