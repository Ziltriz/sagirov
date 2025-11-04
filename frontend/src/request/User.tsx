import { lenghtNotNullValidate } from '@/core/modules/Validate'
import Common from '@/core/request/Common'
import Add from '@/core/request/Common/add';
import Inline from '@/core/request/Common/inline';
import Delete from '@/core/request/Common/delete';

export const Schema = {
    ...Common,
    ...{
        name: 'users',
        uri: 'users/get_user',
        method: 'get',
        values: {
            id: false
        }
    }
}

export const SchemaAdd = {
    ...Schema,
    ...Add,
    ...{
        form_data: true,
        uri: 'users/add_user',
        values: {
            active: false,
            role: ['user'],
            name: '',
            login: '',
            password:'',
            description: '',
        },
        types: {
            role: "select",
            login: 'text',
            password:'password',
            name: 'text',
            description: 'text',
            active: "switch",
        },
        labels: {
            role: "role",
            rules: "rules",
            login: 'login',
            password:'password',
            name: 'name',
            description: 'description',
            active: "active"
        },
        types_values: {
            role: [],
           
        },
        required: ["login", "password"],
        validate: {
            login: lenghtNotNullValidate,
            password: lenghtNotNullValidate,
        },
        values_access_roles: {
            role: ['root'],
            company: ['root']
        }
    }    
}


export const SchemaEdit = {
    ...SchemaAdd,
    ...{
        form_data: true,
        uri: 'users/update_token',
        values: {
            ...SchemaAdd.values,
            ...{ id: undefined },
        },
        types: {
            ...SchemaAdd.types,
            ...{ id: 'hidden' }
        },
        required: ["login", "tarif"],
        validate: {
            login: lenghtNotNullValidate,
            tarif: lenghtNotNullValidate
        }
    }
}

export const SchemaInline = {
    ...Schema,
    ...Inline,
    ...{
        form_data: true,
        method: 'post',
        uri: 'users/update_token',
        values: {
            active: false,
            rules: [],
            providers: [],
            scorring: [],
            id: undefined,
        },
        required: ["login", "tarif"]
    }    
}

export const SchemaDelete = {
    ...Schema,
    ...Delete,
    ...{
        uri: 'users/remove_token',
    }    
}

export const SchemaUsers = {
    ...Common,
    ...{
        name: 'users',
        uri: 'users/get_tokens',
        method: 'get',
        values: {
            filter: {},
            limit: 0,
            page: 0,
            providers: "",
            sortKey:"",
            sortType:"",
        }
    }
}