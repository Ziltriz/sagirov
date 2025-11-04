import { getUser } from '@/models/Users/'
import { getSchemaAdd, getSchemaAddInline, getSchemaEdit, getSchemaEditInline, getSchemaImage, getSchemaDeleteConfirm } from '@/data/User/schema'
import { roles } from '@/data/Admin'

export default {
    callbacks: {

        getSchemaAdd: getSchemaAdd,
        getSchemaAddInline: getSchemaAddInline,
        getSchemaEdit: getSchemaEdit,
        getSchemaEditInline: getSchemaEditInline,
        getSchemaImage: getSchemaImage,
        getSchemaDeleteConfirm: getSchemaDeleteConfirm,
        getItem: getUser,

        autocomplete: {
            tarif: (form, index, value) => {
                form.setFieldValue(index, String(value).replace(/([^0-9])/g, ''))
            }
        },

        autocomplete_timeout_time: () => {
            return 0
        },

        getValues: {
            role: (index, values, store) => {
                return roles
            }

        },
        prepareValues: {
            company: (values, value) => {
                if (typeof (value) == 'string') {
                    return [value]
                } else {
                    return value
                }
            }
        }
    }
}