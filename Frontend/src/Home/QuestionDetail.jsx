import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaBookmark, FaRegBookmark, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const QuestionDetail = ({ subject, question, onBack, onBookmarkToggle, bookmarks }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState('');

  useEffect(() => {
    // Check if this specific question is bookmarked
    const bookmarked = bookmarks?.some(b => b.id === question?.id && b.subject === subject);
    setIsBookmarked(bookmarked);
  }, [question, subject, bookmarks]);

  const handleBookmarkToggle = () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    if (onBookmarkToggle) {
      onBookmarkToggle({ ...question, subject }, newBookmarkState);
    }
  };

  const handleSaveNotes = () => {
    setIsEditing(false);
    if (onBookmarkToggle) {
      onBookmarkToggle({ ...question, subject, notes: editedAnswer }, true);
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

        {/* Bookmark Button - Individual per question */}
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

      {/* Question Card - Direct Answer Show (No Show Answer Button) */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          Q: {question.question}
        </h2>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Answer:</h3>
            {isBookmarked && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-gray-500 hover:text-primary transition-all flex items-center gap-1"
              >
                <FaEdit size={16} /> Edit
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <textarea
                value={editedAnswer || question.answer}
                onChange={(e) => setEditedAnswer(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary"
                rows="8"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleSaveNotes}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  <FaSave /> Save Changes
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedAnswer('');
                  }}
                  className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                {editedAnswer || question.answer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;