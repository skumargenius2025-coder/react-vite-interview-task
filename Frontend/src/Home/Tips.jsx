import React, { useState } from 'react';
import { FaArrowLeft, FaSearch, FaStar, FaVideo, FaRegLightbulb, FaRegClock, FaRegHandshake, FaRegSmile, FaRegCheckCircle, FaRegBookmark } from 'react-icons/fa';

const Tips = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedTip, setExpandedTip] = useState(null);

  const categories = [
    { id: 'all', name: 'All Tips', icon: <FaRegLightbulb /> },
    { id: 'before', name: 'Before Interview', icon: <FaRegClock /> },
    { id: 'during', name: 'During Interview', icon: <FaRegHandshake /> },
    { id: 'behavioral', name: 'Behavioral', icon: <FaRegSmile /> },
    { id: 'technical', name: 'Technical', icon: <FaSearch /> },
    { id: 'after', name: 'After Interview', icon: <FaRegCheckCircle /> },
  ];

  const allTips = [
    {
      id: 1,
      category: 'before',
      title: 'Research the Company',
      icon: <FaSearch className="text-blue-500" />,
      shortDesc: 'Always research company culture and recent projects before interview.',
      fullDesc: 'Visit company website, LinkedIn, Glassdoor. Understand their products, mission, values. Check recent news and achievements. Know your interviewers background.',
      tips: [
        'Study company website thoroughly',
        'Check their social media presence',
        'Read recent news and press releases',
        'Understand their competitors',
        'Prepare questions about company culture'
      ],
      color: 'blue'
    },
    {
      id: 2,
      category: 'before',
      title: 'Practice STAR Method',
      icon: <FaStar className="text-yellow-500" />,
      shortDesc: 'Use Situation, Task, Action, Result for behavioral questions.',
      fullDesc: 'Situation: Set the context. Task: Describe responsibility. Action: Explain steps taken. Result: Share outcomes and learnings.',
      tips: [
        'S - Describe the situation briefly',
        'T - Explain your task/goal',
        'A - Detail actions you took',
        'R - Share positive results',
        'Practice with common questions'
      ],
      color: 'yellow'
    },
    {
      id: 3,
      category: 'during',
      title: 'Record Yourself',
      icon: <FaVideo className="text-purple-500" />,
      shortDesc: 'Practice with AI and review your body language and tone.',
      fullDesc: 'Record mock interviews. Review body language, eye contact, voice modulation. Identify areas of improvement.',
      tips: [
        'Use camera to record practice sessions',
        'Watch for nervous habits',
        'Check eye contact with camera',
        'Listen to voice clarity and pace',
        'Review and improve daily'
      ],
      color: 'purple'
    },
    {
      id: 4,
      category: 'during',
      title: 'First Impression Matters',
      icon: <FaRegHandshake className="text-green-500" />,
      shortDesc: 'Greet confidently, maintain eye contact, and smile genuinely.',
      fullDesc: 'First 30 seconds create lasting impression. Dress professionally. Enter confidently. Greet with smile and firm handshake.',
      tips: [
        'Dress one level above company dress code',
        'Arrive 10-15 minutes early',
        'Greet everyone with smile',
        'Maintain good posture',
        'Show enthusiasm naturally'
      ],
      color: 'green'
    },
    {
      id: 5,
      category: 'behavioral',
      title: 'Tell Me About Yourself',
      icon: <FaRegSmile className="text-orange-500" />,
      shortDesc: 'Structure answer: Present → Past → Future in 2 minutes.',
      fullDesc: 'Start with current role. Highlight 2-3 achievements. Connect to company need. End with enthusiasm for role.',
      tips: [
        'Keep it to 90-120 seconds',
        'Focus on professional journey',
        'Highlight relevant achievements',
        'Connect to company/role',
        'Practice until natural'
      ],
      color: 'orange'
    },
    {
      id: 6,
      category: 'behavioral',
      title: 'Strengths & Weaknesses',
      icon: <FaRegCheckCircle className="text-red-500" />,
      shortDesc: 'Be honest but strategic. Show self-awareness and improvement.',
      fullDesc: 'Choose strength relevant to job. Support with example. Pick real weakness but show improvement plan.',
      tips: [
        'Choose job-relevant strengths',
        'Give specific examples',
        'Pick minor weakness',
        'Show improvement actions',
        'Never use "perfectionism" cliché'
      ],
      color: 'red'
    },
    {
      id: 7,
      category: 'technical',
      title: 'Explain Technical Concepts',
      icon: <FaSearch className="text-indigo-500" />,
      shortDesc: 'Use simple language. Start with definition, then example, then application.',
      fullDesc: 'Break complex topics into simple parts. Use analogies. Show practical understanding.',
      tips: [
        'Start with basic definition',
        'Use real-world analogy',
        'Give code/practical example',
        'Explain when to use',
        'Mention alternatives'
      ],
      color: 'indigo'
    },
    {
      id: 8,
      category: 'technical',
      title: 'Handle Unknown Questions',
      icon: <FaRegLightbulb className="text-amber-500" />,
      shortDesc: "Don't panic. Think aloud. Show problem-solving approach.",
      fullDesc: "Acknowledge honestly. Explain your thought process. Discuss similar problems solved. Ask clarifying questions.",
      tips: [
        'Stay calm and positive',
        'Think out loud',
        'Break problem into parts',
        'Relate to known concepts',
        'Ask thoughtful questions'
      ],
      color: 'amber'
    },
    {
      id: 9,
      category: 'after',
      title: 'Send Thank You Email',
      icon: <FaRegBookmark className="text-teal-500" />,
      shortDesc: 'Send personalized thank you within 24 hours to each interviewer.',
      fullDesc: 'Mention specific discussion points. Reinforce interest. Keep it professional and concise.',
      tips: [
        'Send within 2-4 hours',
        'Personalize each email',
        'Reference specific topics',
        'Reiterate your interest',
        'Proofread carefully'
      ],
      color: 'teal'
    },
    {
      id: 10,
      category: 'after',
      title: 'Follow Up Strategy',
      icon: <FaRegClock className="text-cyan-500" />,
      shortDesc: 'Follow up after 5-7 days if no response. Keep it professional.',
      fullDesc: 'Brief reminder email. Express continued interest. Ask about timeline. Stay patient and positive.',
      tips: [
        'Wait 5-7 business days',
        'Keep email brief',
        'Reiterate interest',
        'Ask about next steps',
        'Stay professional always'
      ],
      color: 'cyan'
    }
  ];

  const filteredTips = selectedCategory === 'all' 
    ? allTips 
    : allTips.filter(tip => tip.category === selectedCategory);

  const toggleExpand = (id) => {
    setExpandedTip(expandedTip === id ? null : id);
  };

  const getCategoryName = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.name : categoryId;
  };

  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300',
    orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300',
    red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300',
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300',
    amber: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300',
    teal: 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300',
    cyan: 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
        >
          <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Interview Tips & Tricks</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Expert advice to help you ace your next interview
          </p>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setExpandedTip(null);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTips.map((tip) => (
          <div
            key={tip.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            {/* Tip Header - Clickable area */}
            <div
              onClick={() => toggleExpand(tip.id)}
              className="p-6 cursor-pointer flex items-start gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                colorClasses[tip.color].split(' ')[0] + ' ' + colorClasses[tip.color].split(' ')[1]
              }`}>
                {tip.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{tip.title}</h3>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400">
                    {getCategoryName(tip.category)}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.shortDesc}</p>
              </div>
            </div>

            {/* Expanded Content - Only shows when this specific tip is expanded */}
            {expandedTip === tip.id && (
              <div className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-gray-700 animate-fadeIn">
                <div className={`p-4 rounded-xl mb-4 ${colorClasses[tip.color]}`}>
                  <p className="text-sm leading-relaxed">{tip.fullDesc}</p>
                </div>
                
                <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Quick Tips:
                </h4>
                <ul className="space-y-2">
                  {tip.tips.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedTip(null);
                    }}
                    className="text-xs text-primary hover:text-primary/80 font-medium"
                  >
                    Show less ↑
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No Tips Message */}
      {filteredTips.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <FaRegLightbulb className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No tips found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try selecting a different category
          </p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Expert Tips</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">10+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Free Access</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Practical</div>
          </div>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="text-center mt-12">
        <p className="text-gray-600 dark:text-gray-400 italic text-lg">
          "Success is where preparation and opportunity meet."
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">— Bobby Unser</p>
      </div>
    </div>
  );
};

export default Tips;