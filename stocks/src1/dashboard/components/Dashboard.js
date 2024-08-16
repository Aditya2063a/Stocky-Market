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
  
  const API_URL = 'http://localhost:5000';

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

      if(response.data.message === "User not found") {
        setPopupMessage("Please Login!");
        localStorage.removeItem('accessToken');
        setUser({
          name: "",
          savedData: [],
        });
      } else {
        setPopupMessage(response.data.message);
        const newSavedData = [...user.savedData, stockSymbol];
        console.log(newSavedData);

        setUser({
          name : user.name,
          savedData: newSavedData,
        });
        
        console.log(user.savedData);

      }
    } catch (error) {
      setPopupMessage('Failed to add stock. Please try again.');
      console.log("Error:")
      console.error(error);
    }
  };

  return (

    <div className='h-full '>
      <div className='flex justify-between items-center'>
        <Header name={stockDetails.name} />
        <div className='pr-11'>
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded mr-2'
            onClick={handleAddStock}
          >
            Add Stock
          </button>
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded'
            onClick={toggleChart}
          >
            {showPredictChart ? 'Show Chart' : 'Show Predict Chart'}
          </button>
        </div>
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
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
            <span className='block sm:inline'>{popupMessage}</span>
          </div>
        )}
      </div>


      <StockTable/>
    </div>
    
  );
};

export default Dashboard;