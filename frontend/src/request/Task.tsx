
import Common from '@/core/request/Common'

export const SchemaTasks = {
    ...Common,
    ...{
        name:"get_task",
        uri: 'historical/task/get_task/{id}',
        method: 'get',
        values: {
            id: ''
        }
    }
}
