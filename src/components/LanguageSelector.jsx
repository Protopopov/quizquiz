import React, { useState, useRef, useEffect } from 'react';

const LanguageSelector = ({ currentLanguage, onLanguageChange, translate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languages = [
        { id: 'en', label: 'English', flag: '🇬🇧' },
        { id: 'hr', label: 'Hrvatski', flag: '🇭🇷' },
        { id: 'uk', label: 'Українська', flag: '🇺🇦' }
    ];

    const currentLang = languages.find(l => l.id === currentLanguage) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="language-dropdown-container" ref={dropdownRef}>
            <button
                className={`lang-dropdown-trigger ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="lang-flag">{currentLang.flag}</span>
                <span className="lang-label">{currentLang.label}</span>
                <span className="dropdown-arrow">▼</span>
            </button>

            {isOpen && (
                <div className="lang-dropdown-menu fade-in">
                    {languages.map((lang) => (
                        <button
                            key={lang.id}
                            className={`lang-option ${currentLanguage === lang.id ? 'selected' : ''}`}
                            onClick={() => {
                                onLanguageChange(lang.id);
                                setIsOpen(false);
                            }}
                        >
                            <span className="lang-flag">{lang.flag}</span>
                            <span className="lang-label">{lang.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
