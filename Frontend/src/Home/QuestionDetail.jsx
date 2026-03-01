import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaBookmark, FaRegBookmark } from 'react-icons/fa';

const QuestionDetail = ({ subject, question, onBack, onBookmarkToggle, bookmarks }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Check if this specific question is bookmarked - Technical ke liye
    const bookmarked = bookmarks?.some(b => 
      b.id === question?.id || 
      (b.id === `tech-${question?.id}` && b.subject === subject)
    );
    setIsBookmarked(bookmarked);
  }, [question, subject, bookmarks]);

  const handleBookmarkToggle = () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    
    if (onBookmarkToggle) {
      // Technical ke liye unique ID with tech- prefix
      const bookmarkData = {
        id: `tech-${question.id}`,
        question: question.question,
        answer: question.answer,
        subject: subject,
        originalId: question.id
      };
      onBookmarkToggle(bookmarkData, newBookmarkState);
    }
  };

  if (!question) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={onBack} className="flex items-center gap-2 text-primary">
          <FaArrowLeft /> Back
        </button>
        <p className="text-center py-12">Select a question to view</p>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{subject}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Question {question.id}</p>
          </div>
        </div>

        {/* Bookmark Button - Only Bookmark, No Edit */}
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

      {/* Question Card - Direct Answer Show */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          Q: {question.question}
        </h2>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Answer:</h3>
          
          {/* Answer Box - No Edit Option */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                {question.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;