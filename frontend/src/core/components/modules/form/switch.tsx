import { Switch, Box } from '@mantine/core';
import { useI18n } from 'next-localization';
import { useState } from 'react';

export default ({
    name,
    value,
    index,
    positionIndex = undefined,
    parentIndex = undefined,
    form,
    variant,
    label,
    labelGroup,
    disabled,
    required,
    placeholder,
    labelPosition,
    description,
    onSet = (key, values) => {

    }
}) => {

    const i18n = useI18n();

    const formIndex = (parentIndex != undefined ? parentIndex + '.' + ( positionIndex != undefined ? positionIndex + "." : "") + index : index)

    const [checked, setChecked] = useState(value === true || value === "true" || value === 1);

    return (

        <Box
            className="mantine-switch-root"
            variant={variant}
        >
            <Box
                className="mantine-switch-label"
                variant={variant}
            > { labelGroup } </Box>
            <Switch
                variant={variant}
                size="md"
                label={placeholder}
                description={description}
                labelPosition={labelPosition}
                disabled={disabled}
                required={required}
                withErrorStyles
                {...(typeof(form) != "undefined" ? form.getInputProps(formIndex): {})}
                checked={checked}
                onChange={(event) => {
                    
                    setChecked(event.target.checked)

                    if(typeof(form) != 'undefined') {
                        form.setFieldValue(formIndex, event.target.checked)
                    }

                    if(typeof(onSet) == 'function') {
                        onSet(formIndex, String(event.target.checked))
                    }

                }}
                key={formIndex}
            />
        </Box>
    )

}