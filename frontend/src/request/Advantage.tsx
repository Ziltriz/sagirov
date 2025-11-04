

import Common from '@/core/request/Common'

export const SchemaAdvantage = {
    ...Common,
    ...{
        name: 'advantage',
        uri: '/advantages/',
        typeRequest: 'json',
        method: 'GET',
    }
}