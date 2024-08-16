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
            <h2 className="text-lg mb-2">Sentiment</h2>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handlePredictClick}
            >
              Predict
            </button>
          </div>
        )}
        {loading && (
          // Show loading spinner while fetching data
          <TypewriterSpinner size={8} />
        )}
        {!loading && Object.keys(sentiment).length > 0 && (
          <ul className='w-full h-full flex flex-col justify-between divide-y-1'>
            {Object.keys(sentiment).map((item) => (
              <li key={item} className='flex-1 flex justify-between items-center'>
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
