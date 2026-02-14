import React, { useState } from 'react';
import LanguageSelector from './LanguageSelector';
import '../styles/mobile.css';
import '../styles/desktop.css';

const Home = ({ onStart, translate, quizData, currentLanguage, onLanguageChange, nickname }) => {
    const [selectedId, setSelectedId] = useState(null);

    const handleSelect = (id) => {
        setSelectedId(id);
    };

    const handleStart = () => {
        if (selectedId) {
            onStart(selectedId);
        }
    };

    return (
        <div className="home-container fade-in">
            <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={onLanguageChange}
            />

            <div className="welcome-text">
                <h1>{translate('common.hello')} {nickname},</h1>
                <p>{translate('common.subject_question')}</p>
            </div>

            <div className="category-grid">
                {quizData.map((cat) => (
                    <div
                        key={cat.id}
                        className={`category-card ${selectedId === cat.id ? 'selected' : ''}`}
                        onClick={() => handleSelect(cat.id)}
                        style={{ borderColor: selectedId === cat.id ? cat.color : 'transparent' }}
                    >
                        <div className="category-icon" style={{ color: cat.color }}>
                            {cat.icon}
                        </div>
                        <div className="category-info">
                            <h3>{cat.name}</h3>
                            <p>{translate('common.questions_count', { count: cat.questions.length })}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedId && (
                <button
                    className="btn-primary"
                    onClick={handleStart}
                    style={{
                        marginTop: '2rem',
                        backgroundColor: quizData.find(c => c.id === selectedId).color,
                        boxShadow: `0 4px 14px 0 ${quizData.find(c => c.id === selectedId).color}66`
                    }}
                >
                    {translate('common.start_quiz', { name: quizData.find(c => c.id === selectedId).name })}
                </button>
            )}
        </div>
    );
};

export default Home;
