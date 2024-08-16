import React, { useState, useContext, useEffect } from 'react';
import { convertUnixtoDate, convertDateToUnix, createDate } from '../utils/dateUtils';
import Card from './Card';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Brush } from 'recharts'; // Import Brush from recharts
import { chartConfig } from '../constants/config';
import ChartFilter from './ChartFilter';
import { fetchHistoricalData } from '../api/stock-api';
import StockContext from '../context/StockContext';
import TradingViewWidget from './Trading';

const Chart = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("1wk");

    const { stockSymbol } = useContext(StockContext);

    useEffect(() => {
        const getDateRange = () => {
            const { days, weeks, months, years } = chartConfig[filter];

            const endDate = new Date();
            const startDate = createDate(endDate, -days, -weeks, -months, -years);

            const startUnix = convertDateToUnix(startDate);
            const endUnix = convertDateToUnix(endDate);

            return { startUnix, endUnix };
        };

        const updateChartData = async () => {
            try {
                const { startUnix, endUnix } = getDateRange();
                const resolution = chartConfig[filter].resolution;

                const result = await fetchHistoricalData(
                    stockSymbol,
                    resolution,
                    filter,
                );

                setData(formatData(result))

            } catch (e) {
                setData([]);
                console.log(e);
            }
        };

        updateChartData();

    }, [stockSymbol, filter])

    const formatData = (data) => {
        return data.map((item, index) => {
            return {
                value: item.Close.toFixed(2),
                date: filter !== '1d' ? new Date(item.Date).toLocaleDateString() : new Date(item.Datetime).toLocaleTimeString(),
            };
        });
    };

    return (
        // <Card>
        //     <ul className='flex absolute top-2 right-2 z-40'>
        //         {Object.keys(chartConfig).map((item) => {
        //             return (
        //                 <li key={item}>
        //                     <ChartFilter text={item} active={filter === item} onClick={() => {
        //                         setFilter(item);
        //                     }} />
        //                 </li>
        //             );
        //         })}
        //     </ul>

        //     <ResponsiveContainer width="100%" height={400}>
        //         <AreaChart data={data}>
        //             <defs>
        //                 <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
        //                     <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
        //                     <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        //                 </linearGradient>
        //             </defs>
        //             <Area
        //                 type="monotone"
        //                 dataKey="value"
        //                 stroke="#312e81"
        //                 fill="url(#colorValue)"
        //                 fillOpacity={1}
        //                 strokeWidth={0.5}
        //             />
        //             <Tooltip />
        //             <XAxis dataKey="date" />
        //             <YAxis domain={['dataMin', 'dataMax']} />
        //         </AreaChart>
        //     </ResponsiveContainer>
        // </Card>
        <Card>
            <TradingViewWidget stockSymbol={stockSymbol}/>
        </Card>
    );
};

export default Chart;
