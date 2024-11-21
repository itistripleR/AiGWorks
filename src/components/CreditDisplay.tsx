// src/components/CreditDisplay.tsx
import React from 'react';

interface CreditDisplayProps {
    credits: number;
}

const CreditDisplay: React.FC<CreditDisplayProps> = ({ credits }) => {
    return (
        <div className="credit-display">
            <h2>Your Credits</h2>
            <p>{credits} Credits</p>
        </div>
    );
};

export default CreditDisplay;
