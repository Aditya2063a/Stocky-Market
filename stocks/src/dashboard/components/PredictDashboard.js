import React , {useContext, useEffect, useState}from 'react';
import Header from './Header';
import Details from './Details';
import Overview from './Overview';
import PredictChart from './Predict_Chart';
import StockContext from '../context/StockContext';
import { fetchQuote, fetchStockDetails } from '../api/stock-api';
import Predictor from './Predictor';

const PredictDashboard = () => {
    const {stockSymbol} = useContext(StockContext);

  const [stockDetails, setStockDetails] = useState({});
  const [quote, setQuote] = useState({});


  useEffect(() => {
  const updateStockDetails = async () =>{
    try{
      const result = await fetchStockDetails(stockSymbol);
      setStockDetails(result);
    }
    catch(e){
      setStockDetails({})
      console.log(e);
    }
  }

  const updateStockOverview = async () =>{
    try{
      const result = await fetchQuote(stockSymbol);
      setQuote(result);
    }
    catch(e){
      setQuote({})
      console.log(e);
    }
  }
  updateStockDetails();
  updateStockOverview();

  } ,[stockSymbol] )

  return (

    <div className='h-screen overflow-auto'>
    <div className='flex justify-start items-center'>
        <Header name={stockDetails.name}></Header>
        </div>
    <div className='grid grid-cols-1 grid-rows-9 md:grid-cols-4 md:grid-rows-5 xl:grid-cols-8 gap-6 p-10 font-lato'>
        
        <div className='col-span-6 row-span-4 md:row-span-6 xl:row-span-5 flex'>
        <PredictChart stockSymbol={stockSymbol}/>
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
        <Predictor stockSymbol={stockSymbol}/>
        </div>

        
    </div>
    </div>


  )
}

export default PredictDashboard
