import { DatesProvider, DateInput, DateInputProps } from '@mantine/dates';

import IconCalendar from '@/core/components/icons/calendar'

import { dateLocale } from '@/core/modules/Date'

import Config from '@/config'

export default ({
    name,
    value,
    index,
    positionIndex = undefined,
    parentIndex = undefined,
    form,
    variant,
    label,
    disabled,
    required,
    placeholder,
    valueFormat,
    description,
    onSet = (key, values) => {

    }
}) => {

    const formIndex = (parentIndex != undefined ? parentIndex + '.' + (positionIndex != undefined ? positionIndex + "." : "") + index : index)

    try {

        if (!(value instanceof Date) && String(value).length > 0) {
            value = new Date(value)
        }

    } catch (e) {
        value = new Date()
    }

    const onChange = (value) => {

        if (value instanceof Date) {
            value.setHours(0)
            value.setMinutes(0)
            value.setSeconds(0)
            value.setMilliseconds(0)
        }

        if (typeof (form) != 'undefined') {
            form.setFieldValue(formIndex, value)
        }

        if (typeof (onSet) == 'function') {
            onSet(formIndex, value)
        }

    }

    const dateParser: DateInputProps['dateParser'] = (input) => {
        return new Date(dateLocale(input));
    };

    return (
        <DatesProvider settings={{ locale: Config.locale, timezone: Config.timezone }}>{

            <DateInput
                dateParser={dateParser}
                variant={variant}
                label={label ? label : ''}
                placeholder={placeholder}
                description={description}
                disabled={disabled}
                required={required}
                withAsterisk={false}
                withErrorStyles
                {...(typeof (form) != "undefined" ? form.getInputProps(formIndex) : {
                    value: value
                })}
                key={formIndex}
                valueFormat={valueFormat}
                rightSection={<IconCalendar className="montine-InputDate-icon" variant="right" />}
                onChange={onChange}
            />

        } </DatesProvider>
    )

}