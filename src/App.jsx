import React, { useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { QUIZ_DATA } from './data/quizData';

function App() {
  const [gameState, setGameState] = useState('home'); // home, quiz, result
  const [currentCategory, setCurrentCategory] = useState(null);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleStartQuiz = (categoryId) => {
    const category = QUIZ_DATA.find(c => c.id === categoryId);
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
        <Home onStart={handleStartQuiz} />
      )}

      {gameState === 'quiz' && currentCategory && (
        <Quiz
          category={currentCategory}
          onFinish={handleFinishQuiz}
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
        />
      )}
    </div>
  );
}

export default App;
