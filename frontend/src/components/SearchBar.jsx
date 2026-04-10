import { useState } from 'react';

function SearchBar({ onSearch, placeholder = "Search products..." }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="w-full max-w-5xl">
      <div className="bg-white/95 border border-blue-100 shadow-xl rounded-3xl px-6 py-4 flex items-center gap-4">
        <div className="bg-blue-50 text-blue-600 rounded-3xl p-3 shadow-sm">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full bg-transparent border-none px-4 py-3 pr-14 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-0"
          />
          {searchTerm && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-500">Search by product name, description, or category.</p>
    </div>
  );
}

export default SearchBar;
