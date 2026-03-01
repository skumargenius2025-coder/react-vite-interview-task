import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const HRInterview = ({ onBack, onSelectQuestion }) => {
  const hrQuestions = [
    { id: 1, question: "Tell something about yourself?" },
    { id: 2, question: "What are your strengths and weaknesses?" },
    { id: 3, question: "Why should I hire you?" },
    { id: 4, question: "Why do you want to work at our company?" },
    { id: 5, question: "Can you work under pressure?" },
    { id: 6, question: "Tell me something about our company." },
    { id: 7, question: "How long would you expect to work for us if hired?" },
    { id: 8, question: "How much salary do you expect?" },
    { id: 9, question: "Where do you see yourself five years from now?" },
    { id: 10, question: "Do you have any questions for me?" },
    { id: 11, question: "Why did you resign from your previous job?" },
    { id: 12, question: "Could you have done better in your last job?" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
        >
          <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Personal Interview</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Common HR interview questions</p>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {hrQuestions.map((q) => (
          <button
            key={q.id}
            onClick={() => onSelectQuestion(q)}
            className="w-full text-left bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700 hover:border-primary group"
          >
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm group-hover:scale-110 transition-transform">
                {q.id.toString().padStart(2, '0')}
              </span>
              <p className="text-gray-900 dark:text-white font-medium flex-1">{q.question}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HRInterview;