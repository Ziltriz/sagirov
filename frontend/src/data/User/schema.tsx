import { SchemaAdd, SchemaEdit, SchemaImage, SchemaDelete } from '@/request/User'

import { schemaPrepareUseForm } from '@/core/modules/Form'

const prepareUseForm = {
    company: (store, schema, value) => {
        if (store.user.user.role != 'root') {
            return [store.user.user.company]
        }
        return value
    }
}

export const getSchemaAdd = (store) => {
    return schemaPrepareUseForm(store, SchemaAdd, {
        prepareUseForm: prepareUseForm
    })
}

export const getSchemaAddInline = (store) => {
    return schemaPrepareUseForm(store, SchemaAdd, {
        prepareUseForm: prepareUseForm
    })
}

export const getSchemaEdit = (store) => {
    return schemaPrepareUseForm(store, SchemaEdit, {
        prepareUseForm: prepareUseForm
    })
}

export const getSchemaEditInline = (store) => {
    return schemaPrepareUseForm(store, SchemaEdit, {
        prepareUseForm: prepareUseForm
    })
}

export const getSchemaImage = (store) => {
    return SchemaImage
}


export const getSchemaDeleteConfirm = (store) => {
    return SchemaDelete
}

