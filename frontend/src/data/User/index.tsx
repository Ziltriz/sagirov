import DataAdd  from '@/data/User/add'
import { roles } from '@/data/Admin'

export default {
    callbacks: DataAdd.callbacks,
    fields: {
        active: 'switch',
        login: 'string',
        role: 'string',
        actions: 'actions',
    },
    fields_access_roles: {
        role: ['root']
    },
    fields_custom: {
        // created_at: (item, value) => {
        //     return dateLocaleToTimestamp(value)
        // },
        // updated_at: (item, value) => {
        //     return dateLocaleToTimestamp(value)
        // },
        // session_at: (item, value) => {
        //     return dateLocaleToTimestamp(value)
        // }
    },
    sort: [
        'name',
        'login',
    ],
    sort_custom: {},
    filter: [
        {
            key: 'active',
            type: "switch"
        },
        {
            key: 'name',
            type: "text"
        },
        {
            key: 'login',
            type: "text"
        },
        {
            key: 'role',
            type: 'select',
            data: roles
        }
    ],
    filter_access_roles: {
        role: ['root']
    },
    actions: ['add', 'edit', 'view', 'delete_confirm'],
    actions_access_roles: {
        'delete_confirm': ['root']
    }
}