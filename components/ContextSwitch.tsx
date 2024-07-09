import React from 'react';

interface ContextSwitchProps {
    type: string;
    onChange: () => void;
}

const ContextSwitch = ({ type, onChange }: ContextSwitchProps) => {
    return (
        <label htmlFor="type-switch" className="flex items-center cursor-pointer">
            <span className={`mr-3 ${type === 'candidate' ? 'text-green-500' : 'text-gray-700'}`}>Candidate</span>
            <div className="relative">
                <input id="type-switch" type="checkbox" className="sr-only" checked={type === 'recruiter'} onChange={onChange} />
                <div className={`block w-14 h-8 rounded-full ${type === 'candidate' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${type === 'recruiter' ? 'transform translate-x-full' : ''}`}></div>
            </div>
            <span className={`ml-3 ${type === 'recruiter' ? 'text-blue-500' : 'text-gray-700'}`}>Recruiter</span>
        </label>
    );
};

export default ContextSwitch;
