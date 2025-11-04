

import Common from '@/core/request/Common'

export const SchemaMenu= {
    ...Common,
    ...{
        name: 'menu',
        uri: '/menu-items/',
        typeRequest: 'json',
        method: 'GET',
    }
}