import { Box } from '@mantine/core'

import Classes from '@/core/styles/pages/list.module.scss'

export default ({ index, item, value = '' }) => {

    const slice = 60

    return (
        <Box key={index} className={Classes.bodyitemvalue} variant="text">
            {(typeof value == 'string' ? (value.slice(0, slice) + (value.length > slice ? '...' : '')) : '')}
        </Box>
    )

}