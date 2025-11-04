import { getItems } from '@/core/models/Common'
import { set, get } from '@/core/modules/WindowCache'


const getUsersItems = async (schema, values, key) => {
    let items,
        item = get('users_' + key)

    if (typeof (item) != 'undefined') {
        items = new Promise((resolve) => {
            resolve(item.value)
        })
    }

    if (typeof (items) == 'undefined') {
        items = getItems(schema, values, 'items')

        items.then(async (data) => {
            if (data.hasOwnProperty('items') == true) {
                set('users_' + key, data)
            }
        })
    }

    return items
}