import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import { fetchPrediction } from '../api/stock-api';
import { createChart } from 'lightweight-charts';
import TypewriterSpinner from './TypewriterSpinner';

const PredictChart = (props) => {
    const [data, setData] = useState({
        Dates: [],
        Prediction: [],
        og_dates: [],
        values: [],
    });
    const [loading, setLoading] = useState(true); // Add loading state

    const chartInstance = useRef(null);
    const ogSeries = useRef(null);
    const predictionSeries = useRef(null);

    useEffect(() => {
        const handlePrediction = async () => {
            try {
                setLoading(true); // Set loading to true when fetching starts
                const prediction = await fetchPrediction(props.stockSymbol);
                setData({
                    Dates: prediction.dates,
                    Prediction: prediction.predictions,
                    og_dates: prediction.original_dates,
                    values: prediction.original_values,
                });
                setLoading(false); // Set loading to false when fetching ends
            } catch (error) {
                console.error('Error fetching prediction:', error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        handlePrediction();
    }, [props.stockSymbol]);

    useEffect(() => {
        if (data.values.length > 0 && data.Prediction.length > 0) {
            if (chartInstance.current) {
                updateChart();
            } else {
                renderChart();
            }
        }
    }, [data]);

    const renderChart = () => {
        const chartOptions = {
            layout: {
                background: { color: '#222' },
                textColor: '#DDD',
            },
            grid: {
                vertLines: { color: '#444' },
                horzLines: { color: '#444' },
            },
            crosshair: {
                vertLine: {
                    labelBackgroundColor: '#9B7DFF',
                },
                horzLine: {
                    labelBackgroundColor: '#9B7DFF',
                },
            },
        };
        const chartContainer = document.getElementById('chart-container');
        if (!chartContainer) return;

        chartInstance.current = createChart(chartContainer, chartOptions);

        ogSeries.current = chartInstance.current.addLineSeries({
            color: '#4ade80',
            lineWidth: 2,
        });

        ogSeries.current.setData(
            data.og_dates.map((date, index) => ({
                time: date, // Convert date to yyyy-mm-dd format
                value: data.values[index],
            }))
        );

        predictionSeries.current = chartInstance.current.addLineSeries({
            color: '#dc2626',
            lineWidth: 2,
        });

        predictionSeries.current.setData(
            data.Dates.map((date, index) => ({
                time: date,
                value: data.Prediction[index],
            }))
        );

        chartInstance.current.timeScale().fitContent();

        const handleResize = () => {
            chartInstance.current.applyOptions({
                width: chartContainer.clientWidth,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            chartInstance.current.remove();
            window.removeEventListener('resize', handleResize);
        };
    };

    const updateChart = () => {
        // if (!chartInstance.current || !ogSeries.current || !predictionSeries.current) return;

        ogSeries.current.setData(
            data.og_dates.map((date, index) => ({
                time: date,
                value: data.values[index],
            }))
        );

        predictionSeries.current.setData(
            data.Dates.map((date, index) => ({
                time: date,
                value: data.Prediction[index],
            }))
        );

        chartInstance.current.timeScale().fitContent();
    };

    return (
        <Card>
            <div className='relative w-full h-full'>
                {loading ? ( 
                    <div className='flex justify-center items-center h-full w-full'>
                        <TypewriterSpinner size={12} text={"Predicting..."}/>
                    </div>
                ) : (
                    <>
                        <div className='absolute top-4 left-10 p-4 z-10'>
                            <div className='flex items-center'>
                                <div className='w-3 h-3 bg-green-400 mr-2'></div>
                                <span className='text-sm text-white'>Original</span>
                            </div>
                            <div className='flex items-center mt-2'>
                                <div className='w-3 h-3 bg-red-600 mr-2'></div>
                                <span className='text-sm text-white'>Predicted</span>
                            </div>
                        </div>
                        <div className='w-full h-full' id="chart-container"></div>
                    </>
                )}
            </div>
        </Card>
    );
};

export default PredictChart;





