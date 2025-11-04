import { DatesProvider, DateTimePicker, DateInputProps } from '@mantine/dates';

import { dateTimeLocale } from '@/core/modules/Date'

import IconCalendar from '@/core/components/icons/calendar'

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
        value = ""
    }

    const onChange = (value) => {

        if (typeof (form) != 'undefined') {
            form.setFieldValue(formIndex, value)
        }

        if (typeof (onSet) == 'function') {
            onSet(formIndex, value)
        }


    }

    const dateTimeParser: DateInputProps['dateParser'] = (input) => {
        return new Date(dateTimeLocale(input));
    };

    return (
        <DatesProvider settings={{ locale: Config.locale, timezone: Config.timezone }}>{

            <DateTimePicker
                dateParser={dateTimeParser}
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