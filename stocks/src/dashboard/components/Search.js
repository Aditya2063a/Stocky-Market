import React, { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import SearchResults from './SearchResults';
import { searchSymbols } from '../api/stock-api';

const Search = () => {
  const [input, setInput] = useState("");
  const [bestMatches, setBestMatches] = useState([]);
  const [showResults, setShowResults] = useState(false); // State to control visibility
  const resultsRef = useRef(null); // Ref to the search results

  const clear = () => {
    setInput("");
    setBestMatches([]);
    setShowResults(false); // Hide results when clearing input
  };

  const handleChange = (value) => {
    setInput(value);
    updateBestMatches();
  }

  const updateBestMatches = async () => {
    try {
      if (input) {
        const searchResults = await searchSymbols(input);
        const result = searchResults;
        setBestMatches(result);
        setShowResults(true); // Show results after updating bestMatches
      }
    } catch (e) {
      setBestMatches([]);
      setShowResults(false); // Hide results on error
    }
  };

  const hideResults = () => {
    setShowResults(false); // Function to hide results
  };

  // Handle click outside to hide results
  const handleClickOutside = (event) => {
    if (resultsRef.current && !resultsRef.current.contains(event.target)) {
      hideResults();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative z-40 w-auto'>
      <div className='flex items-center my-4 border-2 border-green-400 rounded-full bg-white'>
        <input
          type="text"
          value={input}
          className="w-full px-4 py-2 font-bold focus:outline-none rounded-full"
          placeholder="Search stock..."
          onChange={(event) => {
            handleChange(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              updateBestMatches();
            }
          }}
        />
        {input && (
          <button onClick={clear} className="rounded-full">
            <XMarkIcon className='h-4 w-4 fill-gray-500 p'/>
          </button>
        )}

        <button
          onClick={updateBestMatches}
          className='h-8 w-8 bg-green-400 rounded-full flex justify-center items-center m-1 p-2
          transition duration-300 hover:ring-2'
        >
          <MagnifyingGlassIcon className='h-4 w-4 fill-gray-100' />
        </button>
      </div>

      {/* Pass visibility and hide function to SearchResults */}
      {input && showResults && bestMatches.length > 0 && (
        <SearchResults results={bestMatches} hideResults={hideResults} />
      )}
    </div>
  );
}

export default Search;
