import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaBookmark, FaRegBookmark } from 'react-icons/fa';

const HRQuestionDetail = ({ question, onBack, onBookmarkToggle, bookmarks }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Sample answers for HR questions
  const getAnswer = (qId) => {
    const answers = {
      1: `Hi Good morning Sir. My name is Khushi. I have completed my graduation in 2020 with an aggregate 70%. Coming to my family we are 4 members. My father is working as a driver, My mother is a homemaker and I have one younger brother. My hobbies are playing cricket and surfing internet. My strengths are my attitude toward positive thoughts. Basically, I am a Hard working person and I have ability to do work effectively and efficiently even under pressure. That's all about my self. Thanking you.`,
      
      2: `My greatest strength is my positive attitude and ability to work under pressure. I am a quick learner and always ready to take new challenges. Regarding weaknesses, I sometimes focus too much on details, but I'm working on finding the right balance.`,
      
      3: `You should hire me because I have the right skills and experience for this position. I am passionate about this field and I'm confident that I can contribute significantly to your team. My previous experience has prepared me well for this role.`,
      
      4: `I want to work at your company because I admire your innovative approach and the impact you've made in the industry. I believe my skills align perfectly with your requirements and I'm excited about the opportunity to grow with such a reputable organization.`,
      
      5: `Yes, I can work under pressure. In my previous role, I've successfully managed multiple deadlines and high-stress situations. I believe pressure brings out the best in me and helps me stay focused and productive.`,
      
      6: `Your company is known for its excellence in [industry]. I've researched your recent projects and I'm particularly impressed by [specific project]. Your company culture of innovation and employee development really appeals to me.`,
      
      7: `I'm looking for a long-term opportunity where I can grow and contribute meaningfully. I'd like to build my career here and take on more responsibilities as I prove myself.`,
      
      8: `Based on my skills and experience, and considering industry standards, I'm looking for a competitive salary. However, I'm more focused on finding the right fit and I'm open to discussing this further.`,
      
      9: `In five years, I see myself as a valuable asset to your company, having grown both professionally and personally. I aim to take on more responsibilities and perhaps move into a leadership role while continuing to contribute to the company's success.`,
      
      10: `Yes, I would like to know more about the team I'll be working with, the company's future plans, and opportunities for professional development.`,
      
      11: `I resigned from my previous job because I was looking for new challenges and opportunities to grow. I learned a lot there but felt it was time to take the next step in my career.`,
      
      12: `While I'm proud of my achievements in my last role, there's always room for improvement. I believe every experience teaches us something new, and I've learned valuable lessons that I'll apply in this role.`
    };
    return answers[qId] || "Answer not available.";
  };

  useEffect(() => {
    if (question) {
      const bookmarked = bookmarks?.some(b => b.id === `hr-${question.id}`);
      setIsBookmarked(bookmarked);
    }
  }, [question, bookmarks]);

  const handleBookmarkToggle = () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    if (onBookmarkToggle) {
      onBookmarkToggle(
        { 
          id: `hr-${question.id}`, 
          question: question.question,
          answer: getAnswer(question.id),
          subject: 'HR Interview'
        }, 
        newBookmarkState
      );
    }
  };

  if (!question) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
          >
            <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Interview Master</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Question {question.id}</p>
          </div>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={handleBookmarkToggle}
          className={`p-3 rounded-full transition-all ${
            isBookmarked 
              ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' 
              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
          }`}
        >
          {isBookmarked ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />}
        </button>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-6">
        <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">
            Que. {question.id.toString().padStart(2, '0')}
          </span>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {question.question}
          </h2>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Answer:</h3>
          
          {/* Answer Box - Full height, no scrollbar */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-base">
                {getAnswer(question.id)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRQuestionDetail;