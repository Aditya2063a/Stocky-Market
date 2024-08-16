import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import TypewriterSpinner from './TypewriterSpinner';
import StockContext from '../context/StockContext';

const StockTable = () => {
  const [data, setData] = useState({});
  const [symbols, setSymbols] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useContext(UserContext);
  const { stockSymbol, setStockSymbol } = useContext(StockContext);

  const API_URL = 'http://localhost:5000';

  useEffect(() => {
    if (user && user.savedData && user.savedData.length > 0) {
      const dataString = user.savedData.join(',');
      setSymbols(dataString);
    } else {
      setSymbols('');
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (symbols) {
        setLoading(true);
        setError('');
        try {
          const response = await axios.get(`${API_URL}/stock-data?symbols=${symbols}`);
          setData(response.data);
        } catch (error) {
          setError('Error fetching stock data. Please try again later.');
          console.error('Error fetching stock data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setData({});
      }
    };

    fetchData();
  }, [symbols]);

  const handleRowClick = (symbol) => {
    setStockSymbol(symbol);
  };

  return (
    <div className="container mx-auto mt-8 pb-14 w-full justify-center items-center">
      {user.name === '' ? (
        <p>Please login to save data.</p>
      ) : (
        <>
          {loading ? (
            <div className='flex justify-center items-center'>
              <TypewriterSpinner size={4} />
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : Object.keys(data).length > 0 ? (
            <table className="table-auto mt-4 w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 py-2">Symbol</th>
                  <th className="border border-gray-400 px-4 py-2">Close</th>
                  <th className="border border-gray-400 px-4 py-2">Open</th>
                  <th className="border border-gray-400 px-4 py-2">High</th>
                  <th className="border border-gray-400 px-4 py-2">Low</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data).map((symbol) => (
                  <tr key={symbol} className="bg-white cursor-pointer" onClick={() => handleRowClick(symbol)}>
                    <td className="border border-gray-400 px-4 py-2">{symbol}</td>
                    <td className="border border-gray-400 px-4 py-2">{data[symbol].Close}</td>
                    <td className="border border-gray-400 px-4 py-2">{data[symbol].Open}</td>
                    <td className="border border-gray-400 px-4 py-2">{data[symbol].High}</td>
                    <td className="border border-gray-400 px-4 py-2">{data[symbol].Low}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Start Tracking Stock</p>
          )}
        </>
      )}
    </div>
  );
};

export default StockTable;
