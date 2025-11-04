import { PasswordInput } from '@mantine/core';
import { useI18n } from 'next-localization';

export default ({
    key,
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
        <PasswordInput
            variant={variant}
            label={label}
            withAsterisk={false}
            disabled={disabled}
            required={required}
            withErrorStyles
            placeholder={placeholder}
            description={description}
            {...form.getInputProps(formIndex)}
            key={key}
        />
    )

}