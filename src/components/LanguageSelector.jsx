import React from 'react';

const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
    const languages = [
        { id: 'en', label: 'English', flag: '🇬🇧' },
        { id: 'hr', label: 'Hrvatski', flag: '🇭🇷' },
        { id: 'uk', label: 'Українська', flag: '🇺🇦' }
    ];

    return (
        <div className="language-selector">
            {languages.map((lang) => (
                <button
                    key={lang.id}
                    className={`lang-btn ${currentLanguage === lang.id ? 'active' : ''}`}
                    onClick={() => onLanguageChange(lang.id)}
                    title={lang.label}
                >
                    <span className="lang-flag">{lang.flag}</span>
                    <span className="lang-label">{lang.label}</span>
                </button>
            ))}
        </div>
    );
};

export default LanguageSelector;
