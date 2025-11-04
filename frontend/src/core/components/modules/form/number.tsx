import { NumberInput } from '@mantine/core';
import { useI18n } from 'next-localization';
import { IMaskInput } from 'react-imask';

export default ({
    name,
    mask,
    value,
    index,
    positionIndex = undefined,
    parentIndex = undefined,
    form,
    variant,
    label,
    required,
    disabled,
    placeholder,
    description,
    callbacks = {},
    hideControls=true,
    onSet = (key, values) => {

    }
}) => {

    const i18n = useI18n();

    const formIndex = (parentIndex != undefined ? parentIndex + '.' + (positionIndex != undefined ? positionIndex + "." : "") + index : index)

    const onChange = (value) => {

        if (typeof (form) != 'undefined') {
            form.setFieldValue(formIndex, value)
        }

        if (typeof (onSet) == 'function') {
            onSet(formIndex, value)
        }

    }

    return (
        <NumberInput
            hideControls={hideControls}
            component={IMaskInput}
            mask={mask}
            variant={variant}
            label={label}
            disabled={disabled}
            required={required}
            withAsterisk={false}
            withErrorStyles
            placeholder={placeholder}
            description={description}
            key={formIndex}
            {...(typeof (form) != "undefined" ? form.getInputProps(formIndex) : {
                value: value
            })}
            onCut={onChange}
            onPaste={onChange}
            onChange={onChange}
        />
    )



}