import React from 'react';

interface PaginatorProps {
    currentPage: number;
    totalPages: number;
    loading: boolean;
    inputPage: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPageSubmit: () => void;
    onPageChange: (page: number) => void;
}

const Paginator = ({
    currentPage,
    totalPages,
    loading,
    inputPage,
    onInputChange,
    onPageSubmit,
    onPageChange
}: PaginatorProps) => {
    return (
        <div className="flex justify-center my-4 items-center">
            <button
                className="px-3 py-1 mx-1 bg-orange-500 text-white rounded disabled:bg-gray-400"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
            >
                &lt;
            </button>
            <div className="flex items-center mx-2">
                <input
                    type="text"
                    value={inputPage}
                    onChange={onInputChange}
                    className="w-16 px-2 py-1 border rounded"
                    placeholder="Page"
                    disabled={loading}
                />
                <span className="mx-2">from {totalPages}</span>
                <button
                    className="ml-2 px-3 py-1 bg-orange-500 text-white disabled:bg-gray-400 rounded"
                    onClick={onPageSubmit}
                    disabled={loading}
                >
                    Go
                </button>
            </div>
            <button
                className="px-3 py-1 mx-1 bg-orange-500 text-white rounded disabled:bg-gray-400"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
            >
                &gt;
            </button>
        </div>
    );
};

export default Paginator;
