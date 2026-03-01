import React, { useState } from 'react';
import { FaArrowLeft, FaPython, FaJava, FaJs, FaReact, FaDatabase, FaHtml5, FaCss3, FaPhp, FaAndroid, FaApple, FaCode, FaBookmark } from 'react-icons/fa';
import { SiMysql, SiCplusplus, SiFlutter, SiTensorflow } from 'react-icons/si';
import QuestionDetail from './QuestionDetail';

// Sample Questions Data
const questionsData = {
  Android: [
    {
      id: 1,
      question: "What's Android anyway?",
      answer: "Android is a Linux-based, open-sourced operating system commonly found on mobile devices, such as smartphones and tablets. It's a kernel-based system that gives developers the flexibility to design and deploy simple and/or advanced apps."
    },
    {
      id: 2,
      question: "What is Application in Android?",
      answer: "The Application class in Android is the base class within an Android app that contains all other components such as activities and services. The Application class, or any subclass of the Application class, is instantiated before any other class when the process for your application/package is created."
    }
  ],
  Linux: [
    {
      id: 1,
      question: "What are basic elements or components of Linux?",
      answer: "Linux generally consists of five basic elements or components:\n\nKernel: It is considered a core or main part of Linux and is generally responsible for all major activities of OS such as process management, device management, etc.\n\nSystem Library: These are special functions or programs with the help of which application programs or system utilities can access features of the kernel without any requirement of code.\n\nSystem Utility: These are utility programs that are responsible to perform specialized and individual-level tasks."
    }
  ],
  Python: [
    {
      id: 1,
      question: "What is Python?",
      answer: "Python is a high-level, interpreted programming language known for its simplicity and readability. It supports multiple programming paradigms including procedural, object-oriented, and functional programming."
    }
  ],
  Java: [
    {
      id: 1,
      question: "What is Java?",
      answer: "Java is a class-based, object-oriented programming language designed for portability across platforms. It follows the 'Write Once, Run Anywhere' principle."
    }
  ],
  JavaScript: [
    {
      id: 1,
      question: "What is JavaScript?",
      answer: "JavaScript is a lightweight, interpreted programming language that conforms to the ECMAScript specification. It is best known as the scripting language for Web pages."
    }
  ],
  React: [
    {
      id: 1,
      question: "What is React?",
      answer: "React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta and a community of individual developers and companies."
    }
  ],
  SQL: [
    {
      id: 1,
      question: "What is SQL?",
      answer: "SQL (Structured Query Language) is a domain-specific language used in programming and designed for managing data held in a relational database management system."
    }
  ],
  'Data Structures': [
    {
      id: 1,
      question: "What is an Array?",
      answer: "An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together."
    }
  ]
};

const Learn = ({ onBack, bookmarks, onBookmarkToggle }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const categories = [
    {
      id: 'technical',
      title: 'Technical Interview',
      icon: <FaCode className="text-2xl" />,
      description: 'Practice coding, algorithms, and technical concepts',
      color: 'blue'
    },
    {
      id: 'hr',
      title: 'HR / Personal Interview',
      icon: <FaBookmark className="text-2xl" />,
      description: 'Master behavioral questions and personal interview scenarios',
      color: 'green'
    }
  ];

  const subjects = [
    { name: 'Python', icon: <FaPython />, available: true, color: 'blue', category: 'technical' },
    { name: 'Java', icon: <FaJava />, available: true, color: 'orange', category: 'technical' },
    { name: 'JavaScript', icon: <FaJs />, available: true, color: 'yellow', category: 'technical' },
    { name: 'React', icon: <FaReact />, available: true, color: 'cyan', category: 'technical' },
    { name: 'SQL', icon: <SiMysql />, available: true, color: 'blue', category: 'technical' },
    { name: 'Data Structures', icon: <FaDatabase />, available: true, color: 'purple', category: 'technical' },
    { name: 'C++', icon: <SiCplusplus />, available: false, color: 'gray', category: 'technical' },
    { name: 'HTML', icon: <FaHtml5 />, available: false, color: 'orange', category: 'technical' },
    { name: 'CSS', icon: <FaCss3 />, available: false, color: 'blue', category: 'technical' },
    { name: 'PHP', icon: <FaPhp />, available: false, color: 'purple', category: 'technical' },
    { name: 'Machine Learning', icon: <SiTensorflow />, available: false, color: 'green', category: 'technical' },
    { name: 'Android', icon: <FaAndroid />, available: true, color: 'green', category: 'technical' },
    { name: 'iOS', icon: <FaApple />, available: false, color: 'gray', category: 'technical' },
    { name: 'Flutter', icon: <SiFlutter />, available: false, color: 'cyan', category: 'technical' },
    { name: 'Linux', icon: <FaCode />, available: true, color: 'yellow', category: 'technical' },
  ];

  const colorMap = {
    blue: "text-blue-500 bg-blue-100 dark:bg-blue-900/30",
    orange: "text-orange-500 bg-orange-100 dark:bg-orange-900/30",
    yellow: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30",
    cyan: "text-cyan-500 bg-cyan-100 dark:bg-cyan-900/30",
    purple: "text-purple-500 bg-purple-100 dark:bg-purple-900/30",
    green: "text-green-500 bg-green-100 dark:bg-green-900/30",
    gray: "text-gray-500 bg-gray-100 dark:bg-gray-700"
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSubjectClick = (subject) => {
    if (subject.available) {
      setSelectedSubject(subject);
    }
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  const handleBack = () => {
    if (selectedQuestion) {
      setSelectedQuestion(null);
    } else if (selectedSubject) {
      setSelectedSubject(null);
    } else if (selectedCategory) {
      setSelectedCategory(null);
    } else {
      onBack();
    }
  };

  const getQuestionsForSubject = (subjectName) => {
    return questionsData[subjectName] || [];
  };

  // Render Categories
  if (!selectedCategory) {
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Learn & Prepare</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Choose a category to start practicing</p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-left group border-2 border-transparent hover:border-primary"
            >
              <div className={`w-14 h-14 ${colorMap[category.color]} rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform`}>
                {category.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                {category.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {category.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Render Subjects (Technical or HR)
  if (selectedCategory && !selectedSubject) {
    const filteredSubjects = subjects.filter(s => s.category === selectedCategory);
    
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
          >
            <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {selectedCategory === 'technical' ? 'Technical Interview Questions' : 'HR Interview Questions'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Choose a subject to start practicing</p>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSubjects.map((subject, index) => (
            <button
              key={index}
              onClick={() => handleSubjectClick(subject)}
              disabled={!subject.available}
              className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all text-left group ${
                subject.available 
                  ? 'hover:border-primary cursor-pointer' 
                  : 'opacity-60 cursor-not-allowed'
              } border-2 border-transparent`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-12 h-12 ${colorMap[subject.color]} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                  {subject.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    {subject.name}
                  </h3>
                  {subject.available ? (
                    <p className="text-sm text-primary font-semibold">Click to practice</p>
                  ) : (
                    <p className="text-sm text-gray-400">Coming soon</p>
                  )}
                </div>
              </div>
              {subject.available && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {getQuestionsForSubject(subject.name).length} questions available
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Render Questions List
  if (selectedSubject && !selectedQuestion) {
    const questions = getQuestionsForSubject(selectedSubject.name);
    
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
          >
            <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{selectedSubject.name} Questions</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{questions.length} questions available</p>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => handleQuestionClick(q)}
              className="w-full text-left bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700 hover:border-primary"
            >
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                  {index + 1}
                </span>
                <div>
                  <p className="text-gray-900 dark:text-white font-medium mb-2">{q.question}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Click to view answer</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Render Question Detail
  if (selectedQuestion) {
    return (
      <QuestionDetail
        subject={selectedSubject?.name}
        question={selectedQuestion}
        onBack={handleBack}
        onBookmarkToggle={onBookmarkToggle}
        bookmarks={bookmarks}
      />
    );
  }

  return null;
};

export default Learn;