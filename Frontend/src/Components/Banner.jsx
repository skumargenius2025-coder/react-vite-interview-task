import React from 'react';
import heroImg from '../assets/hero.png';
import { FaArrowRight, FaBolt, FaVideo, FaShieldAlt, FaGlobe, FaFileAlt, FaRobot, FaChartBar, FaGraduationCap } from 'react-icons/fa';

const Banner = ({ onLoginClick }) => {  // 👈 prop receive kiya
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section id="home" className="scroll-mt-16">
        <div className="bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-12 shadow-xl animate-fadeIn">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slideInLeft">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
                Welcome to SelfViewAI <span className="gradient-text">"Empowering your career confidence"</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Don't leave your career to chance. Practice with our advanced AI-driven platform designed to simulate real-world pressure.
              </p>
              {/* Start Free Session Button - Login Open Karega */}
              <button 
                onClick={onLoginClick}  // 👈 yahan add kiya
                className="hero-btn group animate-pulse-slow"
              >
                Start Free Session 
                <FaArrowRight className="inline ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
            <div className="relative animate-slideInRight">
              <img 
                src={heroImg} 
                alt="Interview Practice" 
                className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 hover:shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-bold animate-bounce">
                AI Powered 🛄
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - (same as before) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-16">
        {[
          { number: '10k+', label: 'Success Stories', delay: '0s' },
          { number: '500+', label: 'Real Scenarios', delay: '0.1s' },
          { number: '95%', label: 'Offer Rate', delay: '0.2s' },
          { number: '50+', label: 'Job Roles', delay: '0.3s' },
        ].map((stat, index) => (
          <div 
            key={index} 
            className="stat-card animate-fadeInUp"
            style={{ animationDelay: stat.delay }}
          >
            <h3 className="text-3xl md:text-4xl font-black text-primary animate-pulse">{stat.number}</h3>
            <p className="text-gray-600 dark:text-gray-400 font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Why Trust Section - (same as before) */}
      <section id="about" className="my-24 scroll-mt-16">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-4 animate-fadeIn">
          Why Thousands Trust <span className="text-primary">SelfViewAI</span>
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto animate-fadeIn">
          Gamified interview prep with real-time AI feedback that builds real confidence.
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: <FaBolt />, title: 'Real-time', desc: 'Live session feedback.', delay: '0s' },
            { icon: <FaVideo />, title: 'Mock Video', desc: 'Body analysis AI.', delay: '0.1s' },
            { icon: <FaShieldAlt />, title: 'Role Based', desc: 'Custom questions.', delay: '0.2s' },
            { icon: <FaGlobe />, title: 'Confidence', desc: 'Win every call.', delay: '0.3s' },
          ].map((item, i) => (
            <div 
              key={i} 
              className="feature-card animate-fadeInUp"
              style={{ animationDelay: item.delay }}
            >
              <div className="text-primary text-3xl mb-4 animate-bounce">{item.icon}</div>
              <h3 className="font-bold text-xl mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Feedback Bubble */}
        <div className="mt-16 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg max-w-2xl mx-auto animate-float">
          <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
            "Excellent technical depth! Try to maintain more eye contact during the closing statement."
          </p>
          <div className="flex justify-between items-center">
            <span className="font-bold">Communication</span>
            <span className="text-primary font-bold">88%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full animate-pulse"
              style={{width: '88%'}}
            ></div>
          </div>
        </div>
      </section>

      {/* Everything You Need Section - (same as before) */}
      <div className="my-24">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-12 animate-fadeIn">
          Everything You Need to <span className="text-primary">Succeed</span>
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: <FaFileAlt />, title: 'Resume Smart-Scan', desc: 'Beat ATS filters with AI-optimized scoring.', color: 'blue', delay: '0s' },
            { icon: <FaRobot />, title: 'AI Simulations', desc: 'Voice-activated mock interviewer.', color: 'purple', delay: '0.1s' },
            { icon: <FaChartBar />, title: 'Deep Analytics', desc: 'Tone, pace, eye contact analysis.', color: 'orange', delay: '0.2s' },
            { icon: <FaGraduationCap />, title: 'Expert Coaching', desc: 'Tips from industry leaders.', color: 'green', delay: '0.3s' },
          ].map((item, i) => (
            <div 
              key={i} 
              className={`need-card border-t-4 border-${item.color}-500 animate-fadeInUp`}
              style={{ animationDelay: item.delay }}
            >
              <div className={`w-16 h-16 bg-${item.color}-100 dark:bg-${item.color}-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl text-${item.color}-500 animate-pulse`}>
                {item.icon}
              </div>
              <h4 className="font-bold mb-2">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section - (same as before) */}
      <section id="tips" className="my-24 scroll-mt-16">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-12 animate-fadeIn">
          Interview <span className="text-primary">Tips & Tricks</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { emoji: <FaGlobe />, title: 'Research Company', desc: 'Always research company culture and recent projects.', delay: '0s' },
            { emoji: <FaBolt />, title: 'STAR Method', desc: 'Use Situation, Task, Action, Result for behavioral questions.', delay: '0.1s' },
            { emoji: <FaVideo />, title: 'Record Yourself', desc: 'Practice with AI and review your body language.', delay: '0.2s' },
          ].map((tip, i) => (
            <div 
              key={i} 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 animate-fadeInUp"
              style={{ animationDelay: tip.delay }}
            >
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-2xl animate-bounce text-primary">
                {tip.emoji}
              </div>
              <h3 className="font-bold mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-500">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section - Claim Your Free Session Button */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white text-center py-16 px-8 rounded-3xl my-24 animate-fadeIn">
        <h2 className="text-3xl md:text-4xl font-black mb-4 animate-pulse">Stop Stressing, Start Winning.</h2>
        <p className="text-xl mb-8 opacity-90">Your dream career is just one practice session away.</p>
        {/* Claim Your Free Session Button - Login Open Karega */}
        <button 
          onClick={onLoginClick}  // 👈 yahan bhi add kiya
          className="bg-white text-primary font-bold py-4 px-8 rounded-full hover:shadow-2xl hover:scale-110 transition-all duration-300 group"
        >
          Claim Your Free Session 
          <FaArrowRight className="inline ml-2 group-hover:translate-x-2 transition-transform duration-300" />
        </button>
      </div>

      {/* Footer - (same as before) */}
      <footer className="bg-dark dark:bg-gray-900 text-white rounded-3xl p-12 my-8 animate-fadeIn" id="contact">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-black mb-4 hover:text-primary transition-colors duration-300 cursor-pointer" onClick={() => scrollToSection('home')}>
              SelfViewAI
            </h3>
            <p className="text-gray-400 text-sm">Revolutionizing career preparation with proprietary AI technology built for everyone.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('home')} className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2">Practice Arena</button></li>
              <li><button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2">Success Stories</button></li>
              <li><button className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2">Pricing Plans</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><button className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2">Help Center</button></li>
              <li><button className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2">Privacy Policy</button></li>
              <li><button className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2">Terms of Use</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2">About Us</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2">Contact Us</button></li>
              <li><button className="text-gray-400 hover:text-primary transition-all duration-300 hover:translate-x-2">Careers</button></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-12 pt-8 border-t border-gray-800">
          © 2026 SelfViewAI Technologies. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Banner;