import React, { useState } from 'react';
import { QUIZ_DATA } from '../data/quizData';
import '../styles/mobile.css';
import '../styles/desktop.css';

const Home = ({ onStart }) => {
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
            <div className="welcome-text">
                <h1>Hello User,</h1>
                <p>What subject do you want to improve today?</p>
            </div>

            <div className="category-grid">
                {QUIZ_DATA.map((cat) => (
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
                            <p>{cat.questions.length} Questions</p>
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
                        backgroundColor: QUIZ_DATA.find(c => c.id === selectedId).color,
                        boxShadow: `0 4px 14px 0 ${QUIZ_DATA.find(c => c.id === selectedId).color}66`
                    }}
                >
                    Start {QUIZ_DATA.find(c => c.id === selectedId).name} Quiz
                </button>
            )}
        </div>
    );
};

export default Home;
