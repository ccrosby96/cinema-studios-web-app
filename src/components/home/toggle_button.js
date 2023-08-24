import React, { useState } from 'react';

const ToggleButton = ({ label, initialValue, onToggle }) => {
    const [isActive, setIsActive] = useState(initialValue);

    const handleToggle = () => {
        setIsActive(!isActive);
        onToggle(!isActive);
    };

    return (
        <button
            className={`btn ${isActive ? 'btn-primary m-1' : 'btn-secondary m-1'}`}
            onClick={handleToggle}
        >
            {label}
        </button>
    );
};

export default ToggleButton;
