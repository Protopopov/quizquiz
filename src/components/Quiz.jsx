import React, { useState, useEffect } from 'react';
import Timer from './Timer';

const Quiz = ({ category, onFinish, translate }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [animClass, setAnimClass] = useState('slide-in');
    const [isTimeOut, setIsTimeOut] = useState(false);

    const questions = category.questions;
    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;

    useEffect(() => {
        setAnimClass('slide-in');
        setIsTimeOut(false);
        const timer = setTimeout(() => {
            setAnimClass('');
        }, 500);
        return () => clearTimeout(timer);
    }, [currentQuestionIndex]);

    const handleOptionClick = (option) => {
        if (isAnswered || isTimeOut) return;

        setSelectedOption(option);
        setIsAnswered(true);

        const isCorrect = option === currentQuestion.answer;
        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        setUserAnswers(prev => [
            ...prev,
            {
                question: currentQuestion.question,
                userAnswer: option,
                correctAnswer: currentQuestion.answer,
                isCorrect: isCorrect,
                explanation: currentQuestion.explanation
            }
        ]);
    };

    const handleTimeUp = () => {
        if (!isAnswered && !isTimeOut) {
            setIsTimeOut(true);
            setIsAnswered(true); // Treat as answered to show feedback
            setSelectedOption(null); // No option was selected

            setUserAnswers(prev => [
                ...prev,
                {
                    question: currentQuestion.question,
                    userAnswer: "Time Out",
                    correctAnswer: currentQuestion.answer,
                    isCorrect: false,
                    explanation: currentQuestion.explanation
                }
            ]);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
            setIsTimeOut(false);
        } else {
            onFinish(score, userAnswers);
        }
    };

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <div
                    className="cancel-btn"
                    style={{ cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-light)' }}
                    onClick={() => onFinish(null)}
                >
                    ✕ {translate('common.quit')}
                </div>
                <div className="question-counter">
                    {currentQuestionIndex + 1} / {totalQuestions}
                </div>
            </div>

            <Timer
                key={currentQuestionIndex}
                duration={20}
                onTimeUp={handleTimeUp}
                questionIndex={currentQuestionIndex}
                isPaused={isAnswered}
            />

            <div className={`question-card ${animClass}`}>
                <h2 className="question-text">{currentQuestion.question}</h2>
                {currentQuestion.image && (
                    <img
                        src={currentQuestion.image}
                        alt="Question visual"
                        className="question-image"
                    />
                )}

                <div className="options-grid">
                    {currentQuestion.options.map((option, index) => {
                        let extraClass = '';
                        if (isAnswered || isTimeOut) {
                            if (option === currentQuestion.answer) {
                                extraClass = 'correct';
                            } else if (option === selectedOption) {
                                extraClass = 'wrong';
                            }
                        }

                        return (
                            <button
                                key={index}
                                className={`option-btn ${selectedOption === option ? 'selected' : ''} ${extraClass}`}
                                onClick={() => handleOptionClick(option)}
                                disabled={isAnswered || isTimeOut}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>

                {isTimeOut && (
                    <div className="timeout-notification" style={{ color: '#ef4444', fontWeight: 'bold', marginTop: '1rem', textAlign: 'center' }}>
                        {translate('common.time_out')}
                    </div>
                )}

                {isAnswered && (
                    <div className="feedback-section">
                        {!isTimeOut && (
                            <p><strong>{selectedOption === currentQuestion.answer ? translate('common.correct') : translate('common.incorrect')}</strong></p>
                        )}
                        <p style={{ marginTop: '0.5rem' }}>{currentQuestion.explanation}</p>
                        <button className="btn-primary next-btn" onClick={handleNext}>
                            {currentQuestionIndex < totalQuestions - 1 ? translate('common.next_question') : translate('common.finish_quiz')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;
