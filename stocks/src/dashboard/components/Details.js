import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const Details = ({ details }) => {
    const detailsList = {
        name: "Name",
        country: "Country",
        currency: "Exchange",
        marketCapitalization: "Capitalization",
        finnhubIndustry: "Industry",
    };

    // Helper function to format the market capitalization
    const formatCapitalization = (value) => {
        return value ? value.toFixed(3) : 'N/A';
    };

    return (
        <Card>
            <ul className='w-full h-full flex flex-col justify-between divide-y-1'>
                {
                    Object.keys(detailsList).map((item) => (
                        <li key={item} className='flex-1 flex justify-between items-center font-bold text-white'>
                            <span>{detailsList[item]}</span>
                            <span>
                                {item === 'marketCapitalization' ? formatCapitalization(details[item]) : details[item] || 'N/A'}
                            </span>
                        </li>
                    ))
                }
            </ul>
        </Card>
    );
};

Details.propTypes = {
    details: PropTypes.shape({
        name: PropTypes.string,
        country: PropTypes.string,
        currency: PropTypes.string,
        marketCapitalization: PropTypes.number,
        finnhubIndustry: PropTypes.string,
    })
};

Details.defaultProps = {
    details: {
        name: 'N/A',
        country: 'N/A',
        currency: 'N/A',
        marketCapitalization: 0,
        finnhubIndustry: 'N/A',
    }
};

export default Details;

