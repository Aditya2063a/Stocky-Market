import React, { useContext, useEffect, useState } from 'react';
import Header from './Header';
import Details from './Details';
import Overview from './Overview';
import Chart from './Chart';
import StockContext from '../context/StockContext';
import { fetchQuote, fetchStockDetails } from '../api/stock-api';
import Predictor from './Predictor';
import PredictChart from './Predict_Chart';
import UserContext from '../context/UserContext';
import axios from 'axios';
import StockTable from './StockTable';

const Dashboard = () => {
  const { stockSymbol } = useContext(StockContext);
  const { user, setUser } = useContext(UserContext);

  const [stockDetails, setStockDetails] = useState({});
  const [quote, setQuote] = useState({});
  const [showPredictChart, setShowPredictChart] = useState(true); // State to toggle between Chart and PredictChart
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [stockTableMarginTop, setStockTableMarginTop] = useState(0); // State to manage StockTable margin top

  const API_URL = 'https://stocks-dashboard-backend.onrender.com';

  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(stockSymbol);
        setStockDetails(result);
      } catch (e) {
        setStockDetails({});
      }
    };

    const updateStockOverview = async () => {
      try {
        const result = await fetchQuote(stockSymbol);
        setQuote(result);
      } catch (e) {
        setQuote({});
        console.log(e);
      }
    };

    updateStockDetails();
    updateStockOverview();
    setShowPredictChart(false);
  }, [stockSymbol]);

  const toggleChart = () => {
    setShowPredictChart((prev) => !prev);
  };

  const handleAddStock = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(`${API_URL}/add-user-stock?symbol=${stockSymbol}`, config);

      if (response.data.message === "User not found") {
        setPopupMessage("Please Login!");
        console.log("Please Login!")
        localStorage.removeItem('accessToken');
        setUser({
          name: "",
          savedData: [],
        });
      } else {
        setPopupMessage(response.data.message);
        const newSavedData = [...user.savedData, stockSymbol];
        setUser({
          name: user.name,
          savedData: newSavedData,
        });
      }

      setShowPopup(true); // Show the popup

      setTimeout(() => {
        setShowPopup(false); // Hide popup after 3 seconds
        setStockTableMarginTop(0); // Reset StockTable margin top
      }, 3000);

    } catch (error) {
      setPopupMessage('Failed to add stock. Please try again.');
      console.error(error);
    }
  };

  // Adjust margin top of StockTable based on popup visibility
  useEffect(() => {
    if (showPopup) {
      setStockTableMarginTop('2rem'); // Move StockTable down when popup is visible
    } else {
      setStockTableMarginTop(0); // Reset StockTable position when popup disappears
    }
  }, [showPopup]);

  return (
    <div className='h-full'>
      <div className='flex justify-between items-center pr-11'>
        {/* Header component */}
      </div>
      <div className='flex justify-between items-center mt-4'>
        <button
          className='px-4 py-2 bg-transparent border-2 border-green-400 text-green-400 font-bold rounded cursor-pointer transition duration-300 ease-in-out hover:bg-green-400 hover:text-white active:bg-green-700 active:border-white ml-10'
          onClick={handleAddStock}
        >
          Add Stock
        </button>
        <button
          className='px-4 py-2 bg-transparent border-2 border-green-400 text-green-400 font-bold rounded cursor-pointer transition duration-300 ease-in-out hover:bg-green-400 hover:text-white active:bg-green-700 active:border-white mr-10'
          onClick={toggleChart}
        >
          {showPredictChart ? 'Show Chart' : 'Show Predict Chart'}
        </button>
      </div>
      <div className='grid grid-cols-1 grid-rows-9 md:grid-cols-4 md:grid-rows-5 xl:grid-cols-8 gap-6 p-10 font-lato'>
        <div className='col-span-1 row-span-4 md:col-span-6 md:row-span-4 xl:col-span-6 xl:row-span-5 flex'>
          {showPredictChart ? (
            <PredictChart stockSymbol={stockSymbol} />
          ) : (
            <Chart stockSymbol={stockSymbol} />
          )}
        </div>
        <div className='col-span-1 row-span-1 md:row-span-1 md:col-span-1 xl:row-span-1 xl:col-span-2'>
          <Overview
            symbol={stockSymbol}
            price={quote.pc}
            change={quote.d}
            changePercent={quote.dp}
            currency={stockDetails.currency}
          />
        </div>
        <div className='col-span-1 row-span-2 md:row-span-2 md:col-span-2 xl:row-span-2 xl:col-span-2'>
          <Details details={stockDetails} />
        </div>
        <div className='col-span-1 row-span-2 md:row-span-2 md:col-span-2 xl:row-span-2 xl:col-span-2'>
          <Predictor stockSymbol={stockSymbol} />
        </div>
      </div>
      <div className='flex justify-center mt-4'>
        {popupMessage && (
          <div
            className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${showPopup ? 'animate-fade-in' : ''}`}
            role='alert'
            style={{
              opacity: showPopup ? 1 : 0,
              transition: 'opacity 1s ease-out',
            }}
          >
            <span className='block sm:inline'>{popupMessage}</span>
          </div>
        )}
      </div>
      <StockTable style={{ marginTop: stockTableMarginTop }} />
    </div>
  );
};

export default Dashboard;
