import CommonSchema from '@/core/request/Common'

export default {
    ...CommonSchema,
    ...{
        values: {
            slug: ""
        }
    }
}