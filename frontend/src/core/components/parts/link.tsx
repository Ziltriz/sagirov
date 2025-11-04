import { Box, Anchor } from '@mantine/core'

import Classes from '@/core/styles/pages/list.module.scss'

export default ( { index, item, value, target }) => {

    return (
        <Box key={index} className={Classes.bodyitemvalue} variant="link">
            { typeof value != 'undefined' ? <Anchor className={Classes.bodyitemvaluelink} href={value} target={target}> {item} </Anchor> : ''} 
        </Box>
    )

}