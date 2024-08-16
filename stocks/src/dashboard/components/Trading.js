import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget({ stockSymbol }) {
  const container = useRef();

  useEffect(() => {
    // Clear previous script if any
    if (container.current) {
      container.current.innerHTML = '';
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "${stockSymbol}",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      }`;
    container.current.appendChild(script);
  }, [stockSymbol]);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);



// import React, { useEffect, useRef, memo } from 'react';

// function TradingViewWidget({ stockSymbol }) {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const container = containerRef.current;

//     // Clear any existing widget content
//     container.innerHTML = "";

//     const script = document.createElement("script");
//     script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
//     script.type = "text/javascript";
//     script.async = true;
//     script.innerHTML = `
//       {
//         "autosize": true,
//         "symbol": "NASDAQ:${stockSymbol}",
//         "interval": "D",
//         "timezone": "Etc/UTC",
//         "theme": "dark",
//         "style": "1",
//         "locale": "en",
//         "allow_symbol_change": true,
//         "calendar": false,
//         "support_host": "https://www.tradingview.com"
//       }`;

//     script.onload = () => {
//       console.log('TradingView script loaded successfully.');
//     };

//     script.onerror = (error) => {
//       console.error('Error loading TradingView script:', error);
//     };

//     container.appendChild(script);

//     // Clean up script when component unmounts or stockSymbol changes
//     return () => {
//       container.innerHTML = "";
//     };
//   }, [stockSymbol]);

//   return (
//     <div className="tradingview-widget-container" ref={containerRef} style={{ height: "100%", width: "100%" }}>
//       <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
//       <div className="tradingview-widget-copyright">
//         <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
//           <span className="blue-text">Track all markets on TradingView</span>
//         </a>
//       </div>
//     </div>
//   );
// }

// export default memo(TradingViewWidget);

