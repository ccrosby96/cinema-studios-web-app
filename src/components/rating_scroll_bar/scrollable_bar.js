import React from 'react';

function Slider({ value, onChange, max, step }) {
    return (
        <input
            type="range"
            min={0}
            max={max}
            step = {step}
            value={value}
            onChange={onChange}
            className="slider custom-slider bg-light"
        />
    );
}

export default Slider;
