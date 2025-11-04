import CommonSchema from '@/core/request/Common'

export default {
    ...CommonSchema,
    ...{
        method: 'post',
    }
}