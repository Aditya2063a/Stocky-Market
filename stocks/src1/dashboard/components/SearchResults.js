import React, { useContext, useEffect, useRef } from 'react';
import StockContext from '../context/StockContext';

const SearchResults = ({ results, hideResults }) => {
  const { setStockSymbol } = useContext(StockContext);
  const resultsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        hideResults(); // Call hideResults function passed from parent (Search)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hideResults]);

  return (
    <ul ref={resultsRef} className='absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll bg-white border-neutral-200'>
      {results.map((item) => (
        <li
          key={item.symbol}
          className='cursor-pointer p-4 m-2 flex items-center justify-between rounded-md hover:bg-indigo-200'
          onClick={() => {
            setStockSymbol(item.symbol);
            hideResults(); // Hide results on item click
          }}
        >
          <span>{item.symbol}</span>
          <span>{item.description}</span>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;

