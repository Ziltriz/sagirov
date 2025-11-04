import { Textarea } from '@mantine/core';
import { useI18n } from 'next-localization';

export default ({
    index,
    positionIndex = undefined,
    parentIndex = undefined,
    form,
    variant,
    label,
    disabled,
    required,
    placeholder,
    description
}) => {

    const i18n = useI18n();

    const formIndex = (parentIndex != undefined ? parentIndex + '.' + ( positionIndex != undefined ? positionIndex + "." : "") + index : index)
    
    return (
        <Textarea
            variant={variant}
            label={label}
            description={description}
            withAsterisk={false}
            disabled={disabled}
            required={required}
            withErrorStyles
            placeholder={placeholder}
            {...form.getInputProps(formIndex)}
            key={index}
            minRows={4}
        />
    )

}