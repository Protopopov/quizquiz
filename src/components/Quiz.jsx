import React, { useState, useEffect } from 'react';
import Timer from './Timer';

const Quiz = ({ category, onFinish }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]); // Store answers for review
    const [animClass, setAnimClass] = useState('slide-in');

    const questions = category.questions;
    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;

    useEffect(() => {
        // Reset animation and state on question change
        setAnimClass('slide-in');

        // Remove the class after animation completes to allow re-triggering
        const timer = setTimeout(() => {
            setAnimClass('');
        }, 500);
        return () => clearTimeout(timer);
    }, [currentQuestionIndex]);

    const handleOptionClick = (option) => {
        if (isAnswered) return;

        setSelectedOption(option);
        setIsAnswered(true);

        const isCorrect = option === currentQuestion.answer;
        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        // Record Answer
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
        if (!isAnswered) {
            setIsAnswered(true);
            // Record time-out answer
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
        } else {
            onFinish(score, userAnswers); // Pass score AND detailed answers
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
                    ✕ Quit
                </div>
                <div className="question-counter">
                    {currentQuestionIndex + 1} / {totalQuestions}
                </div>
            </div>

            <Timer
                duration={20}
                onTimeUp={handleTimeUp}
                questionIndex={currentQuestionIndex}
                isPaused={isAnswered} // Pause timer when answered
            />

            <div className={`question-card ${animClass}`}>
                <h2 className="question-text">{currentQuestion.question}</h2>
                {currentQuestion.type === 'image' && (
                    <img
                        src={currentQuestion.image}
                        alt="Question visual"
                        className="question-image"
                    />
                )}

                <div className="options-grid">
                    {currentQuestion.options.map((option, index) => {
                        let extraClass = '';
                        if (isAnswered) {
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
                                disabled={isAnswered}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>

                {isAnswered && (
                    <div className="feedback-section">
                        <p><strong>{selectedOption === currentQuestion.answer ? "Correct!" : "Incorrect"}</strong></p>
                        <p style={{ marginTop: '0.5rem' }}>{currentQuestion.explanation}</p>
                        <button className="btn-primary next-btn" onClick={handleNext}>
                            {currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "Finish Quiz"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;
