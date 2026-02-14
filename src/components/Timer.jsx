import React, { useEffect, useState } from 'react';

const Timer = ({ duration, onTimeUp, questionIndex, isPaused }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        setTimeLeft(duration);
    }, [questionIndex, duration]);

    useEffect(() => {
        if (isPaused) return;

        if (timeLeft <= 0) {
            onTimeUp();
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft, isPaused, onTimeUp]);

    const percentage = (timeLeft / duration) * 100;
    const strokeDashoffset = 283 - (283 * percentage) / 100;

    // Determine color based on time left
    let timerColor = "var(--primary-color)";
    if (timeLeft <= 5) timerColor = "var(--error)";
    else if (timeLeft <= 10) timerColor = "var(--warning)";

    return (
        <div className="timer-container">
            <div className="timer-text" style={{ color: timerColor }}>
                {timeLeft}s
            </div>
            <div className="timer-bar-container">
                <div
                    className="timer-fill"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: timerColor
                    }}
                ></div>
            </div>
        </div>
    );
};

export default Timer;
