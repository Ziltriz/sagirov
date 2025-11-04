import { Box } from '@mantine/core'
import { useI18n } from 'next-localization';
import { useState, useEffect } from 'react'

import Classes from '@/core/styles/pages/list.module.scss'
import ClassesState from '@/styles/parts/state.module.scss'

export default ({ index, item, value, indexKey, name }) => {

    const [init, setInit] = useState(false)

    const i18n = useI18n();

    useEffect(() => {

        if (init == false) {

            setInit(true)

        }

    }, [])

    let label = i18n.t(`${name}.values.${indexKey}.${value}`)

    if (!label) {
        label = value
    }

    return (
        <Box key={index} className={Classes.bodyitemvalue}>
            <Box className={ClassesState.block} variant={value}>
                {label}
            </Box>
        </Box>
    )

}