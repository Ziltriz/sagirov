export type Exchange = 'binance' | 'bybit'
export type Symbol = 'BTC/USDT' | 'ETH/USDT' | 'SOL/USDT' | 'XRP/USDT' | 'ADA/USDT';

export type OrderBookEntry = [price: number, amount: number]

export interface OrdrBookData {
    bids: OrderBookEntry[];
    asks: OrderBookEntry[];
    spread?: number;
}

export interface TickerData {
    price?: number;
    change?: number;
    volume?: number;
    timestamp?: number;
}

export type StatusType = 'connecting' | 'connected' | 'error' | 'disconnected';

export interface Status {
    type: StatusType;
    message: string;
}

export interface PriceHistory {
    timestamp: string[];
    prices: number;
}

