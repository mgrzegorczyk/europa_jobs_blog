import React from 'react';

interface SearchProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
    loading: boolean;
}

const Search = ({ value, onChange, onClear, loading }: SearchProps) => {
    return (
        <div className="relative flex items-center">
            <svg className="w-5 h-5 absolute left-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.42-1.42l4.58 4.58a1 1 0 01-1.42 1.42l-4.58-4.58zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"></path>
            </svg>
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="pl-10 pr-10 py-2 border rounded"
                placeholder="Search..."
                disabled={loading}
            />
            {value && (
                <button onClick={onClear} className="absolute right-3 text-gray-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414L10 8.586z" clipRule="evenodd"></path>
                    </svg>
                </button>
            )}
        </div>
    );
};

export default Search;
