import { useI18n } from 'next-localization';
import { Box, Button } from '@mantine/core'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'

import Breadcrumps from '@/core/components/layouts-parts/breadcrumps'

import Classes from '@/core/styles/layouts-parts/view.module.scss'
import List from './list';

export default observer(({
    store,
    section,
    breadcrumps,
    name,
    href,
    content
}) => {

    const i18n = useI18n();

    const [title, setTitle] = useState((i18n.t('headlings.' + name + '_view').length > 0 ? i18n.t('headlings.' + name + '_view') : i18n.t('headlings.' + name)));

    const onContent = () => {

        if (typeof (content) == 'function') {
            return content()
        }

    }

    return (
        <>  
            <Box className={Classes.block}>
                {onContent()}
            </Box>
        </>
    )

})