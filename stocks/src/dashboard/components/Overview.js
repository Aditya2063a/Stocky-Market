import React from 'react'
import Card from './Card'

const Overview = (props) => {
    
  return (
    <Card>
        <span className='relative left-2 top-2 text-white text-sm'>
            {props.symbol}
        </span>
    

    <div className='w-full h-fit flex items-center justify-between '>
        <span className='text-xl flex items-center text-green-400'>
            {props.price}
            <span className='text-sm text-white m-2'>  {props.currency} </span>
        </span>

        <span
        className={`text-sm ${props.change>0 ? "text-lime-500":"text-red-500"}`}
        >
            {props.change} <span>({props.changePercent}%) </span>
        </span>


    </div>
    </Card>
  );
}

export default Overview
