import { Box, Image } from '@mantine/core'

import Classes from '@/core/styles/pages/list.module.scss'

export default ( { index, item, value, name = '' }) => {

    return (
        <Box key={index} className={Classes.bodyitemvalue} variant="image" data-name={name}>
            { typeof value == 'object' && value.hasOwnProperty('url') == true ? <Image className={Classes.bodyitemvalueimage} src={value.url} /> : ''} 
        </Box>
    )

}