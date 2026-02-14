import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { QUIZ_DATA_METADATA } from './data/quizData';
import en from './locales/en.json';
import hr from './locales/hr.json';
import uk from './locales/uk.json';

const locales = { en, hr, uk };

function App() {
  const [gameState, setGameState] = useState('home'); // home, quiz, result
  const [currentCategory, setCurrentCategory] = useState(null);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [language, setLanguage] = useState(localStorage.getItem('quiz_lang') || 'en');

  const t = locales[language];

  useEffect(() => {
    localStorage.setItem('quiz_lang', language);
  }, [language]);

  const translate = (key, params = {}) => {
    const keys = key.split('.');
    let value = t;
    for (const k of keys) {
      value = value?.[k];
    }
    if (!value) return key;

    // Handle string interpolation {{name}}, {{count}}
    Object.keys(params).forEach(param => {
      value = value.replace(`{{${param}}}`, params[param]);
    });

    return value;
  };

  const getLocalizedQuizData = () => {
    return QUIZ_DATA_METADATA.map(cat => ({
      ...cat,
      name: t.categories[cat.id].name,
      questions: t.categories[cat.id].questions.map((q, idx) => ({
        ...q,
        ...cat.questions[idx] // Keep metadata like type, image, id
      }))
    }));
  };

  const localizedQuizData = getLocalizedQuizData();

  const handleStartQuiz = (categoryId) => {
    const category = localizedQuizData.find(c => c.id === categoryId);
    setCurrentCategory(category);
    setScore(0);
    setUserAnswers([]);
    setGameState('quiz');
  };

  const handleFinishQuiz = (finalScore, answers) => {
    if (finalScore === null) {
      // User cancelled
      setGameState('home');
      setCurrentCategory(null);
      return;
    }
    setScore(finalScore);
    setUserAnswers(answers);
    setGameState('result');
  };

  const handleRestart = () => {
    setScore(0);
    setUserAnswers([]);
    setGameState('quiz');
  };

  const handleGoHome = () => {
    setGameState('home');
    setCurrentCategory(null);
    setScore(0);
    setUserAnswers([]);
  };

  return (
    <div className="app-container">
      {gameState === 'home' && (
        <Home
          onStart={handleStartQuiz}
          translate={translate}
          quizData={localizedQuizData}
          currentLanguage={language}
          onLanguageChange={setLanguage}
        />
      )}

      {gameState === 'quiz' && currentCategory && (
        <Quiz
          category={currentCategory}
          onFinish={handleFinishQuiz}
          translate={translate}
        />
      )}

      {gameState === 'result' && currentCategory && (
        <Result
          score={score}
          totalQuestions={currentCategory.questions.length}
          category={currentCategory}
          onRestart={handleRestart}
          onHome={handleGoHome}
          userAnswers={userAnswers}
          translate={translate}
        />
      )}
    </div>
  );
}

export default App;
