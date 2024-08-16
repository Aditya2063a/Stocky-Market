import React from 'react'
import Card from './Card'

const Overview = (props) => {
    
  return (
    <Card>
        <span className='absolute left4 top-4 text-neutral-400 text-sm'>
            {props.symbol}
        </span>
    

    <div className='w-full h-fit flex items-center justify-between '>
        <span className='text-xl flex items-center'>
            {props.price}
            <span className='text-sm text-neutral-400 m-2'>  {props.currency} </span>
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
