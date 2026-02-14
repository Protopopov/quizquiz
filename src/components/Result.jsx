import React from 'react';
import resultGreat from '../assets/result_great.png';
import resultGood from '../assets/result_good.png';
import resultPoor from '../assets/result_poor.png';

const Result = ({ score, totalQuestions, category, onRestart, onHome, translate, nickname }) => {
    const percentage = Math.round((score / totalQuestions) * 100);

    let messageKey = "common.good_effort";
    let resultImage = resultPoor;

    if (percentage >= 80) {
        messageKey = "common.outstanding";
        resultImage = resultGreat;
    } else if (percentage >= 50) {
        messageKey = "common.well_done";
        resultImage = resultGood;
    }

    return (
        <div className="result-container fade-in" style={{ textAlign: 'center' }}>
            <div className="result-image-container" style={{ marginBottom: '2rem' }}>
                <img
                    src={resultImage}
                    alt="Result Illustration"
                    style={{ width: '200px', height: 'auto', borderRadius: '20px' }}
                />
            </div>

            <div>
                <h2 className="result-message">{nickname}, {translate(messageKey)}</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    {translate('common.you_scored')}
                </p>
                <div className="score-display">
                    {score} / {totalQuestions}
                </div>
            </div>

            <div className="action-buttons">
                <button
                    className="btn-primary"
                    onClick={onRestart}
                    style={{ backgroundColor: category.color }}
                >
                    {translate('common.play_again')}
                </button>
                <button
                    className="btn-secondary"
                    onClick={onHome}
                    style={{ border: 'none', color: 'var(--text-light)', background: 'transparent' }}
                >
                    {translate('common.choose_topic')}
                </button>
            </div>
        </div>
    );
};

export default Result;
