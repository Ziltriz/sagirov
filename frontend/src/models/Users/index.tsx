import { httpRequestAuth } from '@/core/modules/Http'
import { getAccessToken } from '@/core/models/User'

import { prepareList, getItems, deleteItem } from '@/core/models/Common'

import { Schema, SchemaDelete, SchemaUsers } from '@/request/User'

export const getUser = (id) => {

    if(typeof(id) != 'undefined') {

        return httpRequestAuth(Schema, getAccessToken(), {
            ...Schema.values,
            ...{
                id: id
            }
        }).then((data) => {

            if(data.hasOwnProperty('user') == true) {

                    return data.data.user
            
            }

            return {}

        }, (error) => {

            console.error(error);

            return {}

        })
    
    }


}

export const getUsers = (values) => {

    return getItems(SchemaUsers, values, 'items')

}

export const prepareUsers = (data, fields, fields_custom = {}) => {

    return prepareList(data, fields, 'id', fields_custom)

}

export const deleteUser = (id) => {

    return deleteItem(SchemaDelete, {
        ...SchemaUsers.values,
        ...{
            id: id
        }
    })

}
