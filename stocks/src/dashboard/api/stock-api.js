const basePath = "https://finnhub.io/api/v1";


// export const searchSymbols = async (query) => {
//     const url = `${basePath}/search?q=${query}&token=${process.env.REACT_APP_API_KEY}`;

//     const response = await fetch(url);


//     if(!response.ok){
//         const message = `An error has occured: ${response.status}`;
//         throw new Error(message);
//     }

//     return await response.json();
// }


let basePath2 = "https://randomly-next-aardvark.ngrok-free.app";//"https://stocks-dashboard-backend.onrender.com";//process.env.URL1;//
let basePath3 = "https://randomly-next-aardvark.ngrok-free.app"; //process.env.URL2;//"https://stocks-dashboard-backend-1.onrender.com";
let basePath4 ='https://stocks-dashboard-backend.onrender.com';


basePath2 = "http://127.0.0.1:8000";
basePath3 = "http://127.0.0.1:8000";
basePath4 = "http://127.0.0.1:8000";

export const searchSymbols = async (query) => {
    const url = `${basePath4}/search_stocks?q=${query}`;

    const response = await fetch(url);


    if(!response.ok){
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}


export const fetchStockDetails = async (stockSymbol) => {
    const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`;

    const response = await fetch(url);


    if(!response.ok){
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}


export const fetchQuote = async (stockSymbol) => {
    const url = `${basePath}/quote?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`;

    const response = await fetch(url);


    if(!response.ok){
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}



export const fetchHistoricalData = async (
    stockSymbol,
    resolution,
    period
) => {
    const url =  `${basePath2}/fetch_historical_data?symbol=${stockSymbol}&period=${period}&interval=${resolution}`
    
    
    
    // const response = await fetch(url);
        const response = await fetch(url, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "true",
        }),
      })


    if(!response.ok){
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}

export const fetchSentiment = async (
    stockSymbol,
) => {
    const url =  `${basePath2}/sentiment?stock_symbol=${stockSymbol}`  
    
    
    
    const response = await fetch(url, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "true",
        }),
      })


    if(!response.ok){
        
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}


export const fetchPrediction = async (
    stockSymbol,
) => {
    const url =  `${basePath3}/predict?symbol=${stockSymbol}`   
    
    

    
    const response = await fetch(url, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "true",
        }),
      })


    if(!response.ok){
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
}