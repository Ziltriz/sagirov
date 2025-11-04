
import { httpRequest } from '@/core/modules/Http'
import { set as setObj } from '@/core/modules/Object'

import { SchemaAddress, SchemaFio } from '@/core/request/DaData'

const request = (schema, values, setSuggestion = undefined, setSuggestionDetail = undefined) => {

    httpRequest(schema, values).then((response) => {
        return response.text()
    }).then((data) => {

        let result = [],
            detail = {}

        try {

            data = JSON.parse(data)

        } catch (e) {

            data = {}

        }

        if (data.hasOwnProperty('suggestions') == true) {

            if (Array.isArray(data.suggestions) == true) {

                if (data.suggestions.length > 0) {

                    data.suggestions.forEach((item) => {

                        if (Object.keys(item).length > 0) {

                            if (item.hasOwnProperty('value') == true && item.hasOwnProperty('data') == true) {

                                result.push(item.value)

                                setObj(detail, item.value, item.data)

                            }
                        }

                    })

                }

            }

        }

        if (typeof (setSuggestion) == 'function') {
            setSuggestion([...result])
        }

        if (typeof (setSuggestionDetail) == 'function') {
            setSuggestionDetail({ ...detail })
        }

        return {
            'result': [...result],
            'detail': { ...detail }
        }

    })

}

export const requestFio = (values, setSuggestion = undefined, setSuggestionDetail = undefined) => {
    return request(SchemaFio, values, setSuggestion)
}

export const requestAdress = (values, setSuggestion = undefined, setSuggestionDetail = undefined) => {
    return request(SchemaAddress, values, setSuggestion, setSuggestionDetail)
}