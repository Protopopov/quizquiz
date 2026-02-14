import React, { useState } from 'react';

const Result = ({ score, totalQuestions, category, onRestart, onHome, userAnswers }) => {
    const [showReview, setShowReview] = useState(false);
    const percentage = Math.round((score / totalQuestions) * 100);

    let message = "Good effort!";
    let emoji = "👍";

    if (percentage >= 80) {
        message = "Outstanding!";
        emoji = "🏆";
    } else if (percentage >= 50) {
        message = "Well done!";
        emoji = "🌟";
    }

    if (showReview) {
        return (
            <div className="result-container fade-in">
                <h2 className="result-message">Review Answers</h2>

                <div className="review-list">
                    {userAnswers.map((item, index) => (
                        <div key={index} className="review-item">
                            <p className="review-question">{index + 1}. {item.question}</p>

                            <div style={{ marginBottom: '0.5rem' }}>
                                <p className={`review-answer ${item.isCorrect ? 'correct' : 'wrong'}`}>
                                    Your Answer: {item.userAnswer}
                                </p>
                                {!item.isCorrect && (
                                    <p className="review-answer correct">
                                        Correct Answer: {item.correctAnswer}
                                    </p>
                                )}
                            </div>

                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', borderTop: '1px solid #eee', paddingTop: '0.5rem' }}>
                                {item.explanation}
                            </p>
                        </div>
                    ))}
                </div>

                <button className="btn-primary" onClick={() => setShowReview(false)}>
                    Back to Result
                </button>
            </div>
        );
    }

    return (
        <div className="result-container fade-in">
            <div style={{ fontSize: '5rem' }}>{emoji}</div>

            <div>
                <h2 className="result-message">{message}</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    You scored
                </p>
                <div className="score-display">
                    {score} / {totalQuestions}
                </div>
            </div>

            <div className="action-buttons">
                <button
                    className="btn-secondary"
                    onClick={() => setShowReview(true)}
                >
                    Review Answers
                </button>
                <button
                    className="btn-primary"
                    onClick={onRestart}
                    style={{ backgroundColor: category.color }}
                >
                    Play Again
                </button>
                <button className="btn-secondary" onClick={onHome} style={{ border: 'none', color: 'var(--text-light)', background: 'transparent' }}>
                    Choose Topic
                </button>
            </div>
        </div>
    );
};

export default Result;
