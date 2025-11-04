import { lenghtNotNullValidate } from '@/core/modules/Validate'

import Common from '@/core/request/Common'
import Add from '@/core/request/Common/add'
import One from '@/core/request/Common/one'

export const Schema = {
    ...Common,
    ...{
        name: 'settings',
        uri: 'gets_setting'
    }
}
export const ConfigExchange = {
    ...Common,
    ...{
        name: 'configs',
        uri: '/exchange_config'
    }
}

export const SchemaAdd = {
    ...Schema,
    ...Add,
    ...{
        method: 'post',
        form_data: true,
        uri: 'set_setting',
        values: {
            code: "",
            value: ""
        },
        types: {
            code: "text",
            value: "text"
        },
        labels: {
            code: 'code',
            value: 'value'
        },
        required: ['code', 'value'],
        validate: {
            code: lenghtNotNullValidate,
            value: lenghtNotNullValidate
        }
    }
}

export const SchemaEdit = {
    ...SchemaAdd,
    ...{
        uri: 'set_setting',
        values: {
            ...SchemaAdd.values
        },
        types: {
            ...SchemaAdd.types
        }
    }
}

export const SchemaDetail = {
    ...Schema,
    ...One,
    ...{
        uri: 'get_setting',
        values: {
            code: false
        }
    }
}
