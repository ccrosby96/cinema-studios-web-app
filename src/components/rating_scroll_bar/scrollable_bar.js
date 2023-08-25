import React from 'react';

function Slider({ value, onChange }) {
    return (
        <input
            type="range"
            min={0}
            max={100}
            step = {5}
            value={value}
            onChange={onChange}
            className="slider"
        />
    );
}

export default Slider;
