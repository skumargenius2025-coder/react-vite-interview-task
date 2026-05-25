import React, { useState, useEffect, useRef } from 'react';
import { 
  FaMicrophone, FaStop, FaVolumeUp, FaBookmark, 
  FaArrowLeft, FaArrowRight, FaCheckCircle, FaExclamationTriangle,
  FaVideo, FaRegClock, FaChartLine, FaLightbulb,
  FaShieldAlt, FaBolt, FaFire, FaLock, FaPlay, FaHome,
  FaStar, FaRegStar, FaAward, FaUser, FaCode, FaUsers,
  FaPython, FaJava, FaJs, FaReact, FaDatabase, FaCodeBranch,
  FaHtml5, FaCss3Alt, FaPhp, FaRobot, FaAndroid, FaApple,
  FaSass, FaVuejs, FaAngular, FaNodeJs, FaDocker, FaAws,
  FaGithub, FaGitAlt, FaLinux, FaWindows, FaServer,
  FaCloud, FaNetworkWired, FaBrain, FaChartBar, FaComments,
  FaHandshake, FaBullseye, FaRocket, FaCrown, FaGraduationCap,
  FaLockOpen, FaPlayCircle, FaCheckDouble, FaRegCheckCircle,
  FaTrash, FaEdit, FaSave, FaTimes, FaPlus, FaSearch,
  FaFilter, FaSort, FaDownload, FaUpload, FaShare,
  FaHeart, FaComment, FaBell, FaCog, FaSignOutAlt,
  FaUserCircle, FaUserTie, FaUserGraduate, FaUserCog,
  FaChartPie, FaChartLine as FaChartLineIcon, FaChartBar as FaChartBarIcon,
  FaCalendarAlt, FaClock, FaHourglassHalf, FaHourglassEnd,
  FaHourglassStart, FaSpinner, FaCircle, FaDotCircle,
  FaRegCircle, FaCheckSquare, FaRegSquare, FaSquare,
  FaRegCheckSquare, FaMinusCircle, FaPlusCircle, FaInfoCircle,
  FaQuestionCircle, FaExclamationCircle, FaTimesCircle,
  FaCheckCircle as FaCheckCircleIcon, FaRegCheckCircle as FaRegCheckCircleIcon
} from 'react-icons/fa';

const Practice = ({ onBack }) => {
  // State for navigation
  const [currentScreen, setCurrentScreen] = useState('home'); // home, categories, subjects, difficulty, levels, interview, feedback, bookmarks
  const [selectedCategory, setSelectedCategory] = useState('technical');
  const [selectedDifficulty, setSelectedDifficulty] = useState('basic');
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState(null);
  
  // Interview state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [timer, setTimer] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [feedbackData, setFeedbackData] = useState(null);
  
  // Anti-cheat state
  const [cheatWarnings, setCheatWarnings] = useState(0);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [warningActive, setWarningActive] = useState(false);
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  
  // Progress state
  const [completedLevels, setCompletedLevels] = useState(() => {
    const saved = localStorage.getItem('selfviewai_completed');
    return saved ? JSON.parse(saved) : {
      technical: {},
      hr: {}
    };
  });
  
  const [difficultyUnlocked, setDifficultyUnlocked] = useState(() => {
    const saved = localStorage.getItem('selfviewai_unlocked');
    return saved ? JSON.parse(saved) : {
      technical: { basic: true, intermediate: false, hard: false },
      hr: { basic: true, intermediate: false, hard: false }
    };
  });
  
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('selfviewai_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  // Refs
  const videoRef = useRef(null);
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const streamRef = useRef(null);

  // Subjects data with icons - ALL AVAILABLE
  const subjects = {
    technical: [
      { name: 'Python', icon: <FaPython />, color: 'text-blue-600' },
      { name: 'Java', icon: <FaJava />, color: 'text-red-600' },
      { name: 'JavaScript', icon: <FaJs />, color: 'text-yellow-500' },
      { name: 'React', icon: <FaReact />, color: 'text-cyan-500' },
      { name: 'SQL', icon: <FaDatabase />, color: 'text-orange-600' },
      { name: 'Data Structures', icon: <FaCodeBranch />, color: 'text-purple-600' },
      { name: 'C++', icon: <FaCode />, color: 'text-blue-700' },
      { name: 'HTML', icon: <FaHtml5 />, color: 'text-orange-600' },
      { name: 'CSS', icon: <FaCss3Alt />, color: 'text-blue-500' },
      { name: 'PHP', icon: <FaPhp />, color: 'text-indigo-600' },
      { name: 'Machine Learning', icon: <FaBrain />, color: 'text-green-600' },
      { name: 'Android', icon: <FaAndroid />, color: 'text-green-600' },
      { name: 'iOS', icon: <FaApple />, color: 'text-gray-600' },
      { name: 'Flutter', icon: <FaCode />, color: 'text-blue-400' },
      { name: 'Linux', icon: <FaLinux />, color: 'text-yellow-600' },
      { name: 'Git', icon: <FaGitAlt />, color: 'text-orange-600' },
      { name: 'Docker', icon: <FaDocker />, color: 'text-blue-500' },
      { name: 'AWS', icon: <FaAws />, color: 'text-orange-500' },
      { name: 'Node.js', icon: <FaNodeJs />, color: 'text-green-600' },
      { name: 'Vue.js', icon: <FaVuejs />, color: 'text-green-500' },
      { name: 'Angular', icon: <FaAngular />, color: 'text-red-600' },
      { name: 'TypeScript', icon: <FaCode />, color: 'text-blue-600' },
      { name: 'MongoDB', icon: <FaDatabase />, color: 'text-green-600' },
      { name: 'PostgreSQL', icon: <FaDatabase />, color: 'text-blue-600' },
      { name: 'Redis', icon: <FaServer />, color: 'text-red-500' }
    ],
    hr: [
      { name: 'Behavioral', icon: <FaUsers />, color: 'text-blue-500' },
      { name: 'Leadership', icon: <FaCrown />, color: 'text-yellow-600' },
      { name: 'Conflict Resolution', icon: <FaHandshake />, color: 'text-green-600' },
      { name: 'Communication', icon: <FaComments />, color: 'text-purple-600' },
      { name: 'Teamwork', icon: <FaUsers />, color: 'text-indigo-600' },
      { name: 'Problem Solving', icon: <FaBrain />, color: 'text-red-500' },
      { name: 'Adaptability', icon: <FaRocket />, color: 'text-orange-500' },
      { name: 'Time Management', icon: <FaRegClock />, color: 'text-cyan-600' },
      { name: 'Motivation', icon: <FaBullseye />, color: 'text-green-500' },
      { name: 'Career Goals', icon: <FaGraduationCap />, color: 'text-purple-500' },
      { name: 'Stress Management', icon: <FaLightbulb />, color: 'text-yellow-500' },
      { name: 'Decision Making', icon: <FaChartBar />, color: 'text-blue-600' },
      { name: 'Emotional Intelligence', icon: <FaBrain />, color: 'text-pink-500' },
      { name: 'Negotiation', icon: <FaHandshake />, color: 'text-orange-600' },
      { name: 'Presentation Skills', icon: <FaVideo />, color: 'text-red-500' }
    ]
  };

  // Questions data
  const questions = {
    technical: {
      basic: [
        "What is programming and why is it important?",
        "Explain variables with real-world examples.",
        "What are different data types in programming?",
        "What is a function and why do we use it?",
        "Explain loops with examples.",
        "What is an array?",
        "Explain conditional statements.",
        "What is debugging?",
        "What is version control?",
        "Explain frontend vs backend."
      ],
      intermediate: [
        "Explain OOP concepts with examples.",
        "What is inheritance?",
        "What is polymorphism?",
        "Explain design patterns.",
        "What are data structures?",
        "Explain RESTful APIs.",
        "What is database indexing?",
        "Explain authentication vs authorization.",
        "What is caching?",
        "Explain microservices."
      ],
      hard: [
        "Design a scalable architecture.",
        "How to optimize database performance?",
        "Explain microservices in detail.",
        "How to handle high traffic?",
        "Design a notification system.",
        "Explain distributed systems.",
        "Design a payment system.",
        "Explain load balancing.",
        "Design a fault-tolerant system.",
        "Handle data consistency."
      ]
    },
    hr: {
      basic: [
        "Tell me about yourself.",
        "What are your greatest strengths?",
        "What is your biggest weakness?",
        "Why do you want this job?",
        "Where do you see yourself in 5 years?",
        "Why should we hire you?",
        "Tell me about a time you worked in a team.",
        "How do you handle stress?",
        "What are your salary expectations?",
        "Do you have any questions?"
      ],
      intermediate: [
        "Describe a difficult work situation.",
        "How do you handle conflict?",
        "Tell me about a time you showed leadership.",
        "Describe a time you failed.",
        "How do you prioritize work?",
        "Tell me about a time you went above and beyond.",
        "How do you adapt to change?",
        "Describe your ideal work environment.",
        "How do you handle criticism?",
        "Tell me about a time you motivated others."
      ],
      hard: [
        "Tell me about an unpopular decision you made.",
        "How would your previous boss describe you?",
        "Describe a time you persuaded someone.",
        "How do you handle multiple deadlines?",
        "Tell me about a time you disagreed with your manager.",
        "How do you stay updated?",
        "Describe a time you improved a process.",
        "How do you build relationships?",
        "Tell me about tough feedback you received.",
        "What motivates you?"
      ]
    }
  };

  // ==================== CAMERA - FIXED ====================
  const startCamera = async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraActive(true);
        console.log("Camera started successfully");
      }
      return true;
    } catch (err) {
      console.error("Camera error:", err);
      alert("Please allow camera access to start the interview.");
      return false;
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setCameraActive(false);
    }
  };

  // ==================== MICROPHONE - FIXED WITH TRANSCRIPTION ====================
  const initSpeech = () => {
    if ('webkitSpeechRecognition' in window) {
      createNewRecognition();
    } else {
      alert("Speech recognition not supported. Please use Chrome.");
    }
  };

  const createNewRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onstart = () => {
      setIsListening(true);
      console.log("Speech recognition started");
    };
    
    recognition.onresult = (event) => {
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        }
      }
      
      if (finalTranscript) {
        setTranscript(prev => prev + finalTranscript);
        console.log("Final transcript:", finalTranscript);
      }
    };
    
    recognition.onend = () => {
      console.log("Speech recognition ended");
      setIsListening(false);
    };
    
    recognition.onerror = (event) => {
      console.error("Speech error:", event.error);
      setIsListening(false);
    };
    
    recognitionRef.current = recognition;
  };

  const toggleMic = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Speech recognition not supported. Please use Chrome.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } else {
      createNewRecognition();
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Failed to start recognition:", error);
      }
    }
  };

  // ==================== ANTI-CHEAT - FIXED ====================
  useEffect(() => {
    if (!isInterviewActive) return;

    const handleVisibilityChange = () => {
      if (document.hidden && !warningActive) {
        const newCount = cheatWarnings + 1;
        setCheatWarnings(newCount);
        setWarningActive(true);
        setShowWarningPopup(true);
        
        setTimerActive(false);
        if (isListening && recognitionRef.current) {
          recognitionRef.current.stop();
        }
        
        if (newCount >= 3) {
          alert('Interview terminated due to multiple violations.');
          stopAntiCheat();
          stopCamera();
          setCurrentScreen('home');
        }
      }
    };

    const handleBlur = () => {
      if (!warningActive) {
        const newCount = cheatWarnings + 1;
        setCheatWarnings(newCount);
        setWarningActive(true);
        setShowWarningPopup(true);
        
        setTimerActive(false);
        if (isListening && recognitionRef.current) {
          recognitionRef.current.stop();
        }
        
        if (newCount >= 3) {
          alert('Interview terminated due to multiple violations.');
          stopAntiCheat();
          stopCamera();
          setCurrentScreen('home');
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [isInterviewActive, warningActive, cheatWarnings, isListening]);

  const startAntiCheat = () => {
    setIsInterviewActive(true);
    setCheatWarnings(0);
    setWarningActive(false);
    setShowWarningPopup(false);
  };

  const stopAntiCheat = () => {
    setIsInterviewActive(false);
    setWarningActive(false);
    setShowWarningPopup(false);
  };

  const cancelTabSwitch = () => {
    setWarningActive(false);
    setShowWarningPopup(false);
    setTimerActive(true);
  };

  const endInterviewAndGoHome = () => {
    stopAntiCheat();
    stopCamera();
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setCurrentScreen('home');
  };

  // ==================== TIMER ====================
  useEffect(() => {
    if (timerActive && timer > 0 && currentScreen === 'interview') {
      timerRef.current = setTimeout(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0 && timerActive && currentScreen === 'interview') {
      handleNext();
    }
    return () => clearTimeout(timerRef.current);
  }, [timer, timerActive, currentScreen]);

  // ==================== WORD COUNT ====================
  useEffect(() => {
    const words = transcript.trim().split(/\s+/).filter(w => w.length > 0);
    setWordCount(words.length);
  }, [transcript]);

  // ==================== NAVIGATION ====================
  const goToCategories = () => setCurrentScreen('categories');
  const goBackToHome = () => setCurrentScreen('home');
  const goBackToCategories = () => setCurrentScreen('categories');
  const goBackToSubjects = () => setCurrentScreen('subjects');
  const goBackToDifficulty = () => setCurrentScreen('difficulty');
  const goBackToLevels = () => {
    stopAntiCheat();
    stopCamera();
    setCurrentScreen('levels');
  };
  const goToBookmarks = () => setCurrentScreen('bookmarks');

  const selectCategory = (cat) => {
    setSelectedCategory(cat);
    setCurrentScreen('subjects');
  };

  const selectSubject = (subject) => {
    setSelectedSubject(subject);
    setCurrentScreen('difficulty');
  };

  const selectDifficulty = (diff) => {
    if (!difficultyUnlocked[selectedCategory][diff]) {
      alert('Complete all previous levels first!');
      return;
    }
    setSelectedDifficulty(diff);
    setCurrentScreen('levels');
  };

  const startLevel = async (id) => {
    const cameraStarted = await startCamera();
    if (!cameraStarted) return;
    
    setSelectedLevel(id);
    
    // Get questions for this level (3 questions per level)
    const levelQuestions = [];
    const questionSet = questions[selectedCategory][selectedDifficulty];
    const startIdx = (id - 1) * 3;
    for (let i = 0; i < 3; i++) {
      if (questionSet[startIdx + i]) {
        levelQuestions.push(questionSet[startIdx + i]);
      }
    }
    setCurrentQuestions(levelQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTranscript('');
    setTimer(30);
    setTimerActive(true);
    
    startAntiCheat();
    setCurrentScreen('interview');
  };

  // ==================== INTERVIEW FUNCTIONS ====================
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
      }
      
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = transcript;
      setAnswers(newAnswers);
      
      setCurrentQuestionIndex(prev => prev - 1);
      setTranscript(answers[currentQuestionIndex - 1] || '');
      setTimer(30);
      setTimerActive(true);
    }
  };

  const handleNext = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = transcript;
    setAnswers(newAnswers);

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTranscript(answers[currentQuestionIndex + 1] || '');
      setTimer(30);
      setTimerActive(true);
    } else {
      setTimerActive(false);
      stopAntiCheat();
      stopCamera();
      
      // Save progress
      const subjectKey = `${selectedSubject.name}_${selectedDifficulty}`;
      const newCompleted = {...completedLevels};
      if (!newCompleted[selectedCategory][subjectKey]) {
        newCompleted[selectedCategory][subjectKey] = [];
      }
      if (!newCompleted[selectedCategory][subjectKey].includes(selectedLevel)) {
        newCompleted[selectedCategory][subjectKey].push(selectedLevel);
        setCompletedLevels(newCompleted);
        localStorage.setItem('selfviewai_completed', JSON.stringify(newCompleted));
      }
      
      // Update difficulty unlocked
      const totalLevels = selectedDifficulty === 'basic' ? 10 : selectedDifficulty === 'intermediate' ? 20 : 50;
      if (newCompleted[selectedCategory][subjectKey]?.length === totalLevels) {
        const newUnlocked = {...difficultyUnlocked};
        if (selectedDifficulty === 'basic') newUnlocked[selectedCategory].intermediate = true;
        else if (selectedDifficulty === 'intermediate') newUnlocked[selectedCategory].hard = true;
        setDifficultyUnlocked(newUnlocked);
        localStorage.setItem('selfviewai_unlocked', JSON.stringify(newUnlocked));
      }
      
      generateFeedback(newAnswers);
      setCurrentScreen('feedback');
    }
  };

  const speakQuestion = () => {
    const utterance = new SpeechSynthesisUtterance(currentQuestions[currentQuestionIndex]);
    window.speechSynthesis.speak(utterance);
  };

  // ==================== FEEDBACK ====================
  const generateFeedback = (finalAnswers) => {
    const answeredCount = finalAnswers.filter(a => a && a.trim().length > 0).length;
    const totalQuestions = currentQuestions.length;
    
    let totalScore = 0;
    let fillerWords = 0;
    
    finalAnswers.forEach(answer => {
      if (answer) {
        const fillers = (answer.match(/\b(um|uh|like|you know|actually|basically)\b/gi) || []).length;
        fillerWords += fillers;
        const words = answer.split(/\s+/).length;
        if (words > 20) totalScore += 80;
        else if (words > 10) totalScore += 60;
        else totalScore += 30;
      }
    });
    
    const score = answeredCount > 0 ? Math.round(totalScore / totalQuestions) : 0;
    const pace = Math.floor(Math.random() * 30) + 120;
    const clarity = (Math.random() * 3 + 7).toFixed(1);
    const relevance = (Math.random() * 2 + 8).toFixed(1);

    setFeedbackData({
      score,
      fillerWords,
      answered: `${answeredCount}/${totalQuestions}`,
      pace,
      clarity,
      relevance,
      situation: answeredCount > 0 ? <FaCheckCircle className="text-green-500" /> : <FaRegCircle className="text-gray-400" />,
      task: answeredCount > 0 ? <FaCheckCircle className="text-green-500" /> : <FaRegCircle className="text-gray-400" />,
      action: answeredCount > 0 ? <FaCheckCircle className="text-yellow-500" /> : <FaRegCircle className="text-gray-400" />,
      result: answeredCount > 0 ? <FaExclamationTriangle className="text-red-500" /> : <FaRegCircle className="text-gray-400" />,
      strengths: answeredCount === totalQuestions 
        ? ['Answered all questions', 'Good structure', 'Clear communication']
        : answeredCount > 0 ? ['Started practicing', 'Good effort'] : ['No answers provided'],
      improvements: answeredCount < totalQuestions
        ? [`Skipped ${totalQuestions - answeredCount} questions`, 'Try to answer all questions']
        : ['Add specific examples', 'Quantify results', 'Use STAR method']
    });
  };

  const restartCurrentLevel = () => {
    startLevel(selectedLevel);
  };

  const goToNextLevel = () => {
    const nextLevel = selectedLevel + 1;
    const totalLevels = selectedDifficulty === 'basic' ? 10 : selectedDifficulty === 'intermediate' ? 20 : 50;
    if (nextLevel <= totalLevels) {
      startLevel(nextLevel);
    } else {
      goBackToLevels();
    }
  };

  // ==================== BOOKMARKS - FIXED WITH REMOVE FUNCTION ====================
  const toggleBookmark = () => {
    const bookmark = {
      id: Date.now(),
      category: selectedCategory,
      subject: selectedSubject?.name,
      level: selectedLevel,
      question: currentQuestions[currentQuestionIndex],
      answer: transcript,
      date: new Date().toISOString()
    };
    
    const existingIndex = bookmarks.findIndex(b => 
      b.subject === bookmark.subject && 
      b.level === bookmark.level && 
      b.question === bookmark.question
    );
    
    let newBookmarks;
    if (existingIndex >= 0) {
      // Remove bookmark
      newBookmarks = bookmarks.filter((_, index) => index !== existingIndex);
    } else {
      // Add bookmark
      newBookmarks = [...bookmarks, bookmark];
    }
    
    setBookmarks(newBookmarks);
    localStorage.setItem('selfviewai_bookmarks', JSON.stringify(newBookmarks));
  };

  const removeBookmark = (index) => {
    const newBookmarks = bookmarks.filter((_, i) => i !== index);
    setBookmarks(newBookmarks);
    localStorage.setItem('selfviewai_bookmarks', JSON.stringify(newBookmarks));
  };

  // ==================== RENDER FUNCTIONS ====================
  const renderHomeScreen = () => (
    <div className="text-center py-12">
      <h2 className="text-5xl font-black mb-4 text-gray-900 dark:text-white">
        Ready for your AI Interview?
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-xl mx-auto">
        Get real-time feedback on your confidence, communication, and technical depth.
      </p>
      
      <div className="flex justify-center gap-8 mb-12">
        <div className="p-8 bg-blue-50 dark:bg-blue-900/20 rounded-3xl border border-blue-100 dark:border-blue-800 w-44">
          <FaVideo className="text-blue-600 dark:text-blue-400 w-10 h-10 mb-4 mx-auto" />
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            CAMERA READY
          </p>
        </div>
        <div className="p-8 bg-purple-50 dark:bg-purple-900/20 rounded-3xl border border-purple-100 dark:border-purple-800 w-44">
          <FaMicrophone className="text-purple-600 dark:text-purple-400 w-10 h-10 mb-4 mx-auto" />
          <p className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
            MIC READY
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={goToCategories}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xl px-16 py-5 rounded-2xl font-bold hover:shadow-2xl transition-all"
        >
          Start Interview Now
        </button>
        <button
          onClick={goToBookmarks}
          className="bg-gray-600 hover:bg-gray-700 text-white text-xl px-8 py-5 rounded-2xl font-bold hover:shadow-2xl transition-all flex items-center gap-2"
        >
          <FaBookmark /> Bookmarks
        </button>
      </div>
    </div>
  );

  const renderCategoriesScreen = () => (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button onClick={goBackToHome} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
          <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
        </button>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Choose Your Practice</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <div onClick={() => selectCategory('technical')} className="bg-white dark:bg-gray-800 p-8 rounded-3xl text-center cursor-pointer hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-500">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FaCode className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Technical Interview</h3>
          <p className="text-gray-500 dark:text-gray-400 font-medium">25+ Subjects • 80 Levels</p>
        </div>
        
        <div onClick={() => selectCategory('hr')} className="bg-white dark:bg-gray-800 p-8 rounded-3xl text-center cursor-pointer hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-500">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FaUsers className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">HR Interview</h3>
          <p className="text-gray-500 dark:text-gray-400 font-medium">15+ Topics • 80 Levels</p>
        </div>
      </div>
    </div>
  );

  const renderSubjectsScreen = () => (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={goBackToCategories} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
          <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {selectedCategory === 'technical' ? 'Technical Subjects' : 'HR Topics'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">Choose a topic to start practicing</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subjects[selectedCategory].map((subject, index) => (
          <div
            key={index}
            onClick={() => selectSubject(subject)}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center cursor-pointer hover:shadow-lg hover:border-orange-500 border-2 border-transparent transition-all"
          >
            <div className={`text-4xl ${subject.color} mb-2 flex justify-center`}>
              {subject.icon}
            </div>
            <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">{subject.name}</h3>
            <p className="text-xs text-orange-500">Click to practice</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDifficultyScreen = () => (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button onClick={goBackToSubjects} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
          <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <span className="text-sm text-gray-500 font-bold">{selectedSubject?.name}</span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Choose Difficulty</h2>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div onClick={() => selectDifficulty('basic')} className="bg-white dark:bg-gray-800 p-8 rounded-3xl text-center cursor-pointer hover:shadow-xl transition-all">
          <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaShieldAlt className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Basic</h3>
          <p className="text-gray-500">10 Levels</p>
          {difficultyUnlocked[selectedCategory].basic ? (
            <div className="mt-4 text-sm font-semibold text-green-600">Start Here</div>
          ) : (
            <div className="mt-4 text-sm font-semibold text-gray-400"><FaLock className="inline mr-1" /> Locked</div>
          )}
        </div>
        
        <div onClick={() => selectDifficulty('intermediate')} className="bg-white dark:bg-gray-800 p-8 rounded-3xl text-center cursor-pointer hover:shadow-xl transition-all">
          <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaBolt className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Intermediate</h3>
          <p className="text-gray-500">20 Levels</p>
          {difficultyUnlocked[selectedCategory].intermediate ? (
            <div className="mt-4 text-sm font-semibold text-yellow-600">✨ Available</div>
          ) : (
            <div className="mt-4 text-sm font-semibold text-gray-400"><FaLock className="inline mr-1" /> Complete Basic First</div>
          )}
        </div>
        
        <div onClick={() => selectDifficulty('hard')} className="bg-white dark:bg-gray-800 p-8 rounded-3xl text-center cursor-pointer hover:shadow-xl transition-all">
          <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaFire className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Hard</h3>
          <p className="text-gray-500">50 Levels</p>
          {difficultyUnlocked[selectedCategory].hard ? (
            <div className="mt-4 text-sm font-semibold text-red-600">🔥 Available</div>
          ) : (
            <div className="mt-4 text-sm font-semibold text-gray-400"><FaLock className="inline mr-1" /> Complete Intermediate First</div>
          )}
        </div>
      </div>
    </div>
  );

  const renderLevelsScreen = () => {
    const totalLevels = selectedDifficulty === 'basic' ? 10 : selectedDifficulty === 'intermediate' ? 20 : 50;
    const subjectKey = `${selectedSubject.name}_${selectedDifficulty}`;
    const completed = completedLevels[selectedCategory][subjectKey] || [];
    
    return (
      <div>
        <div className="flex items-center gap-4 mb-6">
          <button onClick={goBackToDifficulty} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
            <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <span className="text-sm text-gray-500 font-bold">
              {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{selectedSubject.name} Levels</h2>
          </div>
        </div>
        <p className="text-gray-500 mb-4">
          Complete all {totalLevels} levels to unlock {selectedDifficulty === 'basic' ? 'Intermediate' : 'Hard'}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {Array.from({ length: totalLevels }, (_, i) => i + 1).map(level => {
            const status = completed.includes(level) ? 'completed' : 
                          (level === 1 || completed.includes(level - 1)) ? 'current' : 'locked';
            
            return (
              <div
                key={level}
                className={`p-4 rounded-xl text-center border-2 transition-all ${
                  status === 'completed' ? 'bg-green-50 dark:bg-green-900/20 border-green-500' :
                  status === 'current' ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-500 cursor-pointer hover:shadow-lg' :
                  'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 opacity-50 cursor-not-allowed'
                }`}
                onClick={() => status !== 'locked' && startLevel(level)}
              >
                <div className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center font-bold ${
                  status === 'completed' ? 'bg-green-500 text-white' :
                  status === 'current' ? 'bg-orange-500 text-white' :
                  'bg-gray-400 text-white'
                }`}>
                  {level}
                </div>
                <div className="mb-1 text-xl">
                  {status === 'completed' ? <FaCheckCircle className="text-green-500 mx-auto" /> : 
                   status === 'current' ? <FaPlayCircle className="text-orange-500 mx-auto" /> : 
                   <FaLock className="text-gray-400 mx-auto" />}
                </div>
                {status !== 'locked' && (
                  <div className="text-xs font-bold text-orange-500">SELECT</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderInterviewScreen = () => (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Camera Section */}
      <div className="relative bg-black rounded-3xl overflow-hidden aspect-video border-4 border-orange-500 shadow-2xl">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover scale-x-[-1]"
        />
        {isListening && (
          <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2 animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            <span className="text-sm font-bold">Recording Answer</span>
          </div>
        )}
        {!cameraActive && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <p className="text-white text-lg">Camera starting...</p>
          </div>
        )}
      </div>

      {/* Interview Section */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
            Level {selectedLevel}
          </span>
          <span className={`text-4xl font-mono font-bold ${timer <= 10 ? 'text-red-500 animate-pulse' : 'text-orange-500'}`}>
            00:{timer < 10 ? `0${timer}` : timer}
          </span>
        </div>

        <div className="mb-2 flex justify-between items-center">
          <span className="text-sm font-bold text-gray-400">
            Question {currentQuestionIndex + 1}/{currentQuestions.length}
          </span>
          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-full transition-all ${
              bookmarks.some(b => 
                b.subject === selectedSubject?.name && 
                b.level === selectedLevel && 
                b.question === currentQuestions[currentQuestionIndex]
              ) 
                ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400'
            }`}
          >
            <FaBookmark className={bookmarks.some(b => 
              b.subject === selectedSubject?.name && 
              b.level === selectedLevel && 
              b.question === currentQuestions[currentQuestionIndex]
            ) ? 'fill-current' : ''} />
          </button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 mb-6">
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            {currentQuestions[currentQuestionIndex]}
          </p>
        </div>

        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Your answer will appear here as you speak..."
          className="w-full h-32 p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:border-orange-500 focus:outline-none transition-colors"
        />
        <div className={`text-right text-sm mb-4 ${wordCount > 20 ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
          {wordCount}/20 words
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button onClick={speakQuestion} className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95">
            <FaVolumeUp /> Speak
          </button>
          <button onClick={toggleMic} className={`${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95`}>
            {isListening ? <FaStop /> : <FaMicrophone />} {isListening ? 'Stop' : 'Start'}
          </button>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-bold flex items-center gap-2 transition-all ${
              currentQuestionIndex === 0
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <FaArrowLeft /> Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all active:scale-95"
          >
            Next <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Warning Popup */}
      {showWarningPopup && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex justify-center items-center z-[9999]">
          <div className="bg-white rounded-[30px] p-10 max-w-[450px] text-center border-4 border-red-500">
            <FaExclamationTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">⚠️ Warning!</h2>
            <p className="text-gray-600 mb-4">Do not switch tabs or minimize the window during interview.</p>
            <p className="text-sm font-bold mb-4">Warning {cheatWarnings} of 3</p>
            <div className="flex gap-4">
              <button onClick={cancelTabSwitch} className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700">
                Continue Interview
              </button>
              <button onClick={endInterviewAndGoHome} className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700">
                End & Go Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderFeedbackScreen = () => (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button onClick={goBackToLevels} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
          <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
        </button>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">AI Interview Analysis</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-md">
          <div className="text-sm font-bold text-gray-400 uppercase mb-2">Overall Score</div>
          <div className="text-4xl font-bold text-orange-600">{feedbackData?.score || 0}</div>
          <div className="text-sm text-gray-500 mt-1">out of 100</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-md">
          <div className="text-sm font-bold text-gray-400 uppercase mb-2">Filler Words</div>
          <div className="text-4xl font-bold text-green-600">{feedbackData?.fillerWords || 0}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-md">
          <div className="text-sm font-bold text-gray-400 uppercase mb-2">Questions</div>
          <div className="text-4xl font-bold text-orange-600">{feedbackData?.answered || '0/3'}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
          <div className="text-sm font-bold text-gray-400 uppercase mb-2">Speaking Pace</div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold">{feedbackData?.pace || 0}</span>
            <span className="text-sm text-gray-500">words/min</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${((feedbackData?.pace || 0) / 200) * 100}%` }}></div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
          <div className="text-sm font-bold text-gray-400 uppercase mb-2">Clarity</div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold">{feedbackData?.clarity || 0}</span>
            <span className="text-sm text-gray-500">/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(feedbackData?.clarity || 0) * 10}%` }}></div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
          <div className="text-sm font-bold text-gray-400 uppercase mb-2">Relevance</div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold">{feedbackData?.relevance || 0}</span>
            <span className="text-sm text-gray-500">/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${(feedbackData?.relevance || 0) * 10}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-purple-600">
            <FaChartLine /> STAR Method Analysis
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Situation</span>
              <span className="text-xl">{feedbackData?.situation || <FaRegCircle className="text-gray-400" />}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Task</span>
              <span className="text-xl">{feedbackData?.task || <FaRegCircle className="text-gray-400" />}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Action</span>
              <span className="text-xl">{feedbackData?.action || <FaRegCircle className="text-gray-400" />}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Result</span>
              <span className="text-xl">{feedbackData?.result || <FaRegCircle className="text-gray-400" />}</span>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-purple-600">
            <FaChartBar /> Key Metrics
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Answer Length</span>
              <span className="font-bold">{wordCount} words</span>
            </div>
            <div className="flex justify-between">
              <span>Speaking Time</span>
              <span className="font-bold">{Math.floor(Math.random() * 20 + 10)} seconds</span>
            </div>
            <div className="flex justify-between">
              <span>Pauses</span>
              <span className="font-bold">{Math.floor(Math.random() * 3)} pauses</span>
            </div>
            <div className="flex justify-between">
              <span>Filler Words</span>
              <span className="font-bold">{feedbackData?.fillerWords || 0}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-green-600"><FaCheckCircle className="inline mr-2" /> Strengths</h3>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border-l-4 border-green-500">
            {feedbackData?.strengths?.map((s, i) => (
              <p key={i} className="text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                <FaCheckCircle className="text-green-500 text-sm" /> {s}
              </p>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-red-600"><FaExclamationTriangle className="inline mr-2" /> Areas to Improve</h3>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border-l-4 border-red-500">
            {feedbackData?.improvements?.map((i, idx) => (
              <p key={idx} className="text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                <FaExclamationTriangle className="text-red-500 text-sm" /> {i}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl mb-8 border border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-bold mb-2 text-blue-600 flex items-center gap-2">
          <FaLightbulb /> Feedback Summary
        </h3>
        <p className="italic text-gray-700 dark:text-gray-300">
          {feedbackData?.score === 0 
            ? "No questions were answered. Please practice with the interview."
            : feedbackData?.answered === '3/3'
            ? "✅ Great job! You answered all questions. Keep practicing to improve further."
            : `⚠️ You answered ${feedbackData?.answered}. Answer all questions for complete feedback.`
          }
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={restartCurrentLevel}
          className="bg-gray-600 hover:bg-gray-700 text-white py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
        >
          <FaPlay /> Again
        </button>
        <button
          onClick={goToNextLevel}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          Next Level <FaArrowRight />
        </button>
      </div>
    </div>
  );

  const renderBookmarksScreen = () => (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setCurrentScreen('home')} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
          <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
        </button>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">My Bookmarks</h2>
      </div>

      {bookmarks.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center">
          <FaBookmark className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No bookmarks yet. Save questions during practice!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map((bookmark, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 border-l-4 border-yellow-500 shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-bold text-orange-600 mb-1 flex items-center gap-2">
                    <FaBookmark className="text-yellow-500" />
                    {bookmark.subject} • Level {bookmark.level}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">{bookmark.question}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(bookmark.date).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => removeBookmark(index)}
                  className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all"
                  title="Remove bookmark"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {currentScreen !== 'interview' && currentScreen !== 'feedback' && currentScreen !== 'bookmarks' && (
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Practice Platform</h1>
            <button onClick={onBack} className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:shadow-lg transition-all">
              <FaHome /> Back to Dashboard
            </button>
          </div>
        )}

        {currentScreen === 'home' && renderHomeScreen()}
        {currentScreen === 'categories' && renderCategoriesScreen()}
        {currentScreen === 'subjects' && renderSubjectsScreen()}
        {currentScreen === 'difficulty' && renderDifficultyScreen()}
        {currentScreen === 'levels' && renderLevelsScreen()}
        {currentScreen === 'interview' && renderInterviewScreen()}
        {currentScreen === 'feedback' && renderFeedbackScreen()}
        {currentScreen === 'bookmarks' && renderBookmarksScreen()}
      </div>
    </div>
  );
};

export default Practice;