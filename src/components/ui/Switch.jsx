import React, { useState } from 'react';


function Switch({ T1, T2, onSelect, className = '' }) {
    const [activeTab, setActiveTab] = useState('T1');
    const backgroundPosition = activeTab === 'T2' ? 'translate-x-full' : 'translate-x-0';

    const handleSelect = (tabName) => {
        setActiveTab(tabName);
        if (onSelect) {
            onSelect(tabName);
        }
    };

    const getButtonClasses = (tabName) => `
        relative z-10 flex-1 py-2 px-4 text-center text-sm font-bold transition-colors duration-300
        ${activeTab === tabName ? 'text-[#157259]' : 'text-white hover:text-white'}
    `;

    return (
        <div className={`relative flex bg-[#157259] rounded-full shadow-inner w-72 ${className}`}> 
            
            <span 
                aria-hidden="true"
                className={`
                    absolute top-0 left-0 h-[calc(100%)] w-[calc(50%)] 
                    bg-white rounded-full shadow-md 
                    transform ${backgroundPosition}
                    transition-transform duration-300 ease-out z-0
                `}
            />

            <button
                className={getButtonClasses('T1')}
                onClick={() => handleSelect('T1')}
            >
                {T1}
            </button>

            <button
                className={getButtonClasses('T2')}
                onClick={() => handleSelect('T2')}
            >
                {T2}
            </button>
        </div>
    );
} 
export default Switch

