import { Box } from '@mantine/core'
//import ReactHtmlParser from 'react-html-parser';

import Classes from '@/core/styles/pages/list.module.scss'

export default ({ index, item, value = '' }) => {

    const slice = 60

    const isHtml = (test) => {
        return new RegExp(/(<([^>]+)>)/i).test(test);
    }

    // ReactHtmlParser(value)

    return (
        <Box key={index} className={Classes.bodyitemvalue} variant="html">
            {(isHtml(value) ? 'to_html' : (typeof value == 'string' ? String(value).slice(0, slice) + (value.length > slice ? '...' : '') : ''))}
        </Box>
    )

}