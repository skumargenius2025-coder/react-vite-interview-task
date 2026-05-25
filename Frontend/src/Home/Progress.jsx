import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const Progress = ({ onBack }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Progress Report
        </h1>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Progress tracking coming soon! Check back later.
        </p>
      </div>
    </div>
  );
};

export default Progress;