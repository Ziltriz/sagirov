import Common from '@/core/request/Common'

export default {
    ...Common,
    ...{
        name: 'isauth',
        uri: '/webauth/isauth',
        method: 'get',
    }
}