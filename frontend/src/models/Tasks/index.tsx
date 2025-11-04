import { httpRequestAuth } from '@/core/modules/Http'
import { getAccessToken } from '@/core/models/User'

import { prepareList, getItems, deleteItem } from '@/core/models/Common'

import { Schema } from '@/request/Task'
import { values } from 'mobx';

export interface Task {
    user_id: string;
    exchange_id: string;
    symbol: string;
    limit: string;
    timeframe: Date;
    interval_min: number;
}
  
export interface TradingPageProps {
    store: any;
}


export const getTasks = (values) =>  {
    
    return getItems(Schema, values, 'items')
}

