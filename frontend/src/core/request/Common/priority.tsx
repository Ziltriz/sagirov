import CommonSchema from '@/core/request/Common'

export default {
    ...CommonSchema,
    ...{
        method: 'post',
        json: true,
        values: {
            id: 0,
            type: '',
            step: ''
        }
    }
}