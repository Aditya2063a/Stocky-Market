import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import TypewriterSpinner from './TypewriterSpinner';
import StockContext from '../context/StockContext';
import image from './corss.png';

const StockTable = () => {
  const [data, setData] = useState({});
  const [symbols, setSymbols] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, setUser } = useContext(UserContext);
  const { stockSymbol, setStockSymbol } = useContext(StockContext);

  const API_URL = 'https://stocks-dashboard-backend.onrender.com';

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

  const handleButtonClick = (symbol) => {
    handleRemoveStock(symbol);
  };


  const handleRemoveStock = async (symbolR) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(`${API_URL}/remove-user-stock?symbol=${symbolR}`, config);

      if (response.data.message === "User not found") {
        console.log("User not found (remove)!");
        localStorage.removeItem('accessToken');
        setUser({
          name: "",
          savedData: [],
        });
      } else {
        const newSavedData = user.savedData.filter(symbol => symbol !== symbolR);
        setUser({
          name: user.name,
          savedData: newSavedData,
        });
      }

    } catch (error) {
      console.error(error);
    }
  };


























  return (
    <div className="container mx-auto mt-8 pb-14 w-full justify-center items-center">
      {user && user.name ? (
        <>
          {loading ? (
            <div className='flex justify-center items-center'>
              <TypewriterSpinner size={4} />
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : Object.keys(data).length > 0 ? (
            <div className="flex flex-col">
              <div className="flex justify-end mb-4 ml-11"></div>
              <div className="flex">
                <table className="table-auto w-full">
                  <thead>
                    <tr className="bg-black font-bold text-white">
                      <th className="border border-gray-400 px-4 py-2">Symbol</th>
                      <th className="border border-gray-400 px-4 py-2">Close</th>
                      <th className="border border-gray-400 px-4 py-2">Open</th>
                      <th className="border border-gray-400 px-4 py-2">High</th>
                      <th className="border border-gray-400 px-4 py-2">Low</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(data).map((symbol) => (
                      <tr key={symbol} className="bg-gray-800 text-white font-bold cursor-pointer" onClick={() => handleRowClick(symbol)}>
                        <td className="border border-gray-400 px-4 py-2">{symbol}</td>
                        <td className="border border-gray-400 px-4 py-2">{data[symbol].Close}</td>
                        <td className="border border-gray-400 px-4 py-2">{data[symbol].Open}</td>
                        <td className="border border-gray-400 px-4 py-2">{data[symbol].High}</td>
                        <td className="border border-gray-400 px-4 py-2">{data[symbol].Low}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex flex-col justify-start mt-14">
                  {Object.keys(data).map((symbol) => (
                    <button 
                      key={symbol}
                      onClick={() => handleButtonClick(symbol)} 
                      className="ml-4 mb-2 border-2 w-7 h-7 border-white bg-red-600 rounded-full flex items-center justify-center transform transition ease-in-out duration-400 hover:bg-red-900 active:scale-105"
                    >
                      <img src={image} alt='Button Image' className='w-7 h-7' />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p>Start Tracking Stock</p>
          )}
        </>
      ) : (
        <div className='flex justify-center'>
          <p className='text-white font-bold text-2xl'>Please login to save data</p>
        </div>
      )}
    </div>
  );
};

export default StockTable;

