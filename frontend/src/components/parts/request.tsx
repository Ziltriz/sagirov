import { Box } from '@mantine/core'
import { useI18n } from 'next-localization';
import { useState, useEffect } from 'react'

import Classes from '@/core/styles/pages/list.module.scss'

export default ({ schema, index, item, value, indexKey, name }) => {

    const [init, setInit] = useState(false)
    const i18n = useI18n();

    useEffect(() => {
        if (init == false) {
            setInit(true)
        }
    })

    if (typeof (value) == 'object') {

        return (
            <Box key={index} className={Classes.bodyitemvalue}>
                {
                    Object.keys(value).map((subValue) => {

                        let label = i18n.t(`${name}.values.${indexKey}.${subValue}`)

                        if (!label) {
                            label = i18n.t(`${name}.${subValue}`)
                        }

                        if (!label) {
                            label = subValue
                        }

                        return (<> {value[subValue]} &nbsp; </>)
                    })
                }

            </Box>
        )

    }

}