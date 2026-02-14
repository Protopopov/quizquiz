import React, { useState } from 'react';

const NicknameScreen = ({ onNameSubmit, translate }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onNameSubmit(name.trim());
        }
    };

    return (
        <div className="nickname-container fade-in">
            <div className="nickname-card">
                <h1>👋 {translate('common.hello')}!</h1>
                <p>{translate('common.enter_nickname')}</p>

                <form onSubmit={handleSubmit} className="nickname-form">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={translate('common.nickname_placeholder')}
                        autoFocus
                        required
                        className="nickname-input"
                    />
                    <button type="submit" className="btn-primary" disabled={!name.trim()}>
                        {translate('common.continue')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NicknameScreen;
