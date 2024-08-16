import React, { useContext, useEffect, useRef } from 'react';
import StockContext from '../context/StockContext';


const truncateStyle = `
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const SearchResults = ({ results, hideResults }) => {
  const { setStockSymbol } = useContext(StockContext);
  const resultsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        hideResults(); 
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
          key={item[0]}
          className='cursor-pointer p-4 m-2 flex items-center justify-between rounded-md hover:bg-indigo-200'
          onClick={() => {
            setStockSymbol(item[0]);
            hideResults(); 
          }}
        >
          <span className='pr-3'>{item[0]}</span>
          <span className="truncate text-sm">{item[1]}</span>
        </li>
      ))}
    </ul>
  );
};

// Append the truncate CSS to the head of the document
const styleElement = document.createElement('style');
styleElement.innerHTML = truncateStyle;
document.head.appendChild(styleElement);

export default SearchResults;


