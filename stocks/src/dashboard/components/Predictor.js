import React, { useState, useEffect } from 'react';
import Card from './Card'; 
import { fetchSentiment } from '../api/stock-api';
import TypewriterSpinner from './TypewriterSpinner';

const Predictor = (props) => {
  const [sentiment, setSentiment] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSentiment({});
  }, [props.stockSymbol]);

  const fetchSentimentData = async () => {
    try {
      setLoading(true); // Set loading to true when fetching starts
      const senti = await fetchSentiment(props.stockSymbol);
      setSentiment({
        Sentiment: senti.sentiment,
        Confidence: parseFloat(senti.confidence.toFixed(4)),
        Trend: senti.trend,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false); // Set loading to false when fetching ends
    }
  };

  const handlePredictClick = () => {
    fetchSentimentData();
  };

  return (
    <Card>
      <div className="flex flex-col items-center justify-center h-full">
        {!loading && Object.keys(sentiment).length === 0 && (
          <div>
            <h2 className="text-lg mb-2 text-white font-bold">Sentiment</h2>
            <button
              className="mt-4 rounded-sm border-2 border-red-600 text-red-600 font-bold py-2 px-4 bg-transparent transform transition ease-in-out duration-300 active:scale-105 hover:bg-red-600 hover:text-white active:border-white active:bg-red-800"
              onClick={handlePredictClick}
            >
              Predict
            </button>
          </div>
        )}
        {loading && (
          // centered loading....
          <div className="flex mt-10 items-center justify-center h-full">
            <TypewriterSpinner size={8} />
          </div>
        )}
        {!loading && Object.keys(sentiment).length > 0 && (
          <ul className='w-full h-full flex flex-col justify-between divide-y-1'>
            {Object.keys(sentiment).map((item) => (
              <li key={item} className='flex-1 flex justify-between items-center text-green-400 font-bold'>
                <span>{item}</span>
                <span>{sentiment[item]}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
};

export default Predictor;
