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
                    <div className="input-group">
                        <label htmlFor="nickname" className="input-label">
                            {translate('common.enter_nickname')}
                        </label>
                        <input
                            id="nickname"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={translate('common.nickname_placeholder')}
                            autoFocus
                            required
                            className="nickname-input"
                        />
                    </div>
                    <button type="submit" className="btn-primary" disabled={!name.trim()}>
                        {translate('common.continue')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NicknameScreen;
