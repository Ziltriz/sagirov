import { useState, useEffect } from 'react'
import { Box, Image, Switch } from '@mantine/core'

import { getAccessToken } from '@/core/models/User'
import { httpRequestAuth } from '@/core/modules/Http'
import Classes from '@/core/styles/pages/list.module.scss'

export default ({
    index,
    labelGroup,
    view_labelGroup = false,
    label,
    labelPosition = "left",
    value,
    schema,
    variant,
    prepareRequest = (value) => { return { checked: value } },
    onRequest
}) => {
    
    const timeout = 500;

    const [Rtimeout, setRtimeout] = useState(undefined);

    const [checked, setChecked] = useState( value === true || value === "true" || value === 1 )

    const onChangeEvent = (event) => {

        setChecked(event.target.checked)

        request(event.target.checked)

    }

    const request = (checked) => {

        if (Rtimeout != undefined) {
            clearTimeout(Rtimeout);
        }

        setRtimeout(setTimeout(() => {

            setRtimeout(undefined)

            if(typeof(onRequest) == 'function') {

                onRequest(checked)

            } else {

                let result = httpRequestAuth(schema, getAccessToken(), prepareRequest(checked))

                return result.then((data) => {

                    console.log(data);

                }, (error) => {

                    console.error(error);

                })

            }

            


        }, timeout))

    }

    return (
        <Box key={index} className={Classes.bodyitemvalue} variant={variant}>
            {(view_labelGroup ? <Box
                className="mantine-switch-label"
                variant={variant}
            > { labelGroup } </Box> : '') }
            <Switch
                label={label}
                labelPosition={labelPosition}
                key={index}
                size="md"
                className={Classes.switch}
                checked={checked}
                onChange={(event) => {
                    onChangeEvent(event)
                }}
                variant={variant ? variant : index}
            />
        </Box>
    )

}