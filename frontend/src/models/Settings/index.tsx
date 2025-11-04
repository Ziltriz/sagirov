import { getItems } from '@/core/models/Common'

import { Schema } from '@/request/Settings'

export const getSettings = (values) => {
    return getItems(Schema, values, 'items')
}