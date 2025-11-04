import CommonSchema from '@/core/request/Common'

export default {
    ...CommonSchema,
    ...{
        method: 'get',
        values: {
            id: false
        },
        required: ['id']
    }
}