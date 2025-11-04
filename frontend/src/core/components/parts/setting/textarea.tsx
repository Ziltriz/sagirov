import { useState } from 'react'
import { Box, Textarea } from '@mantine/core'

import Classes from '@/core/styles/pages/list.module.scss'

export default ({
    index,
    label,
    view_label = false,
    placeholder,
    itemValue = '',
    variant,
    minRows = 4,
    prepareRequest = (value) => { return { value: value } },
    onRequest = (value) => { }
}) => {

    const timeout = 500;

    const [Rtimeout, setRtimeout] = useState(undefined);

    const [value, setValue] = useState(itemValue)

    const onChangeEvent = (event) => {

        setValue(event.target.value)

        request(event.target.value)

    }

    const request = (value) => {

        if (Rtimeout != undefined) {
            clearTimeout(Rtimeout);
        }

        setRtimeout(setTimeout(() => {

            setRtimeout(undefined)

            onRequest(value)

        }, timeout))

    }

    return (
        <Box key={index} className={Classes.bodyitemvalue} variant={variant}>
            <Textarea
                key={index}
                variant={variant}
                label={ (view_label ? label : '') }
                placeholder={placeholder}
                minRows={minRows}
                className={Classes.text}
                value={value}
                onChange={(event) => {
                    onChangeEvent(event)
                }}
            />
        </Box>
    )

}