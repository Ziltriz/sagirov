import { getAccessToken } from '@/core/models/User'
import { httpRequestAuth } from '@/core/modules/Http'
import { request } from '@/core/modules/Request'
import { set as setObj } from '@/core/modules/Object'

export const setPriority = (schema, values) => {

    let result = request(schema, {
        ...schema.values,
        ...values
    })

    return result.then((data) => {

        var items = [],
            total = 0

        if (data.data.hasOwnProperty('items') == true) {
            if (Object.keys(data.data.items).length > 0) {
                items = Object.values(data.data.items)
            }
        }

        if (data.data.hasOwnProperty('total') == true) {
            total = data.data.total
        }

        return { items: items, total: total }

    }, (error) => {

        console.error(error)

        return { items: [], total: 0 }

    })

}

export const getItems = (schema, values, key = 'items') => {

    let result = request(schema, values)

    return result.then((data) => {

        var items = [],
            total = 0

        if (data.data.hasOwnProperty(key) == true) {
            items = Object.values(data.data[key])
        }

        if (data.data.hasOwnProperty('total') == true) {
            total = data.data.total
        }

        return { items: items, total: total }

    }, (error) => {

        console.error(error)

        return { items: [], total: 0 }

    })

}

export const getItem = (schema, values, slug = false, slugKey = 'id') => {

    schema = { ...schema };

    if (slug != false) {
        schema.uri = schema.uri + '/' + values[slugKey]
    }

    let result = httpRequestAuth(schema, getAccessToken(), values)

    return result.then((data) => {

        if (data.data.hasOwnProperty([slugKey]) == true) {
            if (data.data[slugKey] == values[slugKey]) {
                return data.data;
            }
        }

        return {}

    }, (error) => {

        console.error(error)

        return {}

    })

}

export const get = (schema, values) => {

    let result = httpRequestAuth(schema, getAccessToken(), values)

    return result.then((data) => {

        if (data.hasOwnProperty('data') == true) {
            return data.data
        }

        return {}

    }, (error) => {

        console.error(error)

        return {}

    })

}

export const deleteItem = (schema, values) => {

    schema = { ...schema };

    let result = httpRequestAuth(schema, getAccessToken(), values)

    return result.then((data) => {

        if (data.hasOwnProperty('data') == true) {
            return data.data
        }

        return {}

    }, (error) => {

        console.error(error)

        return {}

    })

}

export const prepareList = (data, fields, hrefName = 'id', fields_custom = {}) => {

    if (typeof fields_custom != 'object') {
        fields_custom = {}
    }

    if (data.length > 0) {

        return data.map((item) => {

            let element = {}

            for (let fieldIndex in fields) {

                var type = fields[fieldIndex],
                    value = (item.hasOwnProperty(fieldIndex) == true ? item[fieldIndex] : '')

                if (fields_custom.hasOwnProperty(fieldIndex) == true && typeof fields_custom[fieldIndex] == 'function') {
                    setObj(element, fieldIndex, fields_custom[fieldIndex](item, value))
                } else {

                    switch (type) {

                        case 'json':

                            try {
                                setObj(element, fieldIndex, JSON.parse(value))
                            } catch ($e) {
                                setObj(element, fieldIndex, [])
                            }
                            break;

                        default:
                            if (item.hasOwnProperty(fieldIndex) == true) {
                                setObj(element, fieldIndex, value)
                            }
                            break;

                    }

                }

            }

            setObj(element, 'target', item)

            if (element.target.hasOwnProperty(hrefName) == true) {
                setObj(element, 'href', element.target[hrefName])
            }

            return element

        })

    }

    return data

}