import { useEffect, useState } from 'react';

export const useWebSocket = (order) => {
  const [prices, setPrices] = useState({});
  
  useEffect(() => {
    
    if (order === null) return; 
    
    const ws = new WebSocket('wss://locahost:8001/api/v1/ws/' + order.exchange_id + '/' + order.symbol);

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'ticker') {
        setPrices(prev => ({...prev, [data.symbol]: data.price}));
      }
    };

    return () => ws.close();
  }, [order.symbol]);

  return prices;
};