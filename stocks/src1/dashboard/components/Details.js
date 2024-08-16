import React from 'react'
import Card from './Card'

const Details = ({details}) => {
    const detailsList = {
        name: "Name",
        country: "Country",
        currency: "Exchange",
        marketCapitalization: "Capitalization",
        finnhubIndustry: "Industry",
    };

    

  return (
    <Card>
        <ul className='w-full h-full flex flex-col justify-between divide-y-1'>
            {
                Object.keys(detailsList).map((item) => {
                    return <li key = {item} className='flex-1 flex justify-between items-center'>
                        <span> {detailsList[item]} </span>
                        <span> {details[item]} </span>

                    </li>
                })
            }
        </ul>



    </Card>
    
  )
}

export default Details
