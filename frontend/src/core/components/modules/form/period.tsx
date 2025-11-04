import { Group } from '@mantine/core';
import { DateInput, DatesProvider, DateInputProps } from '@mantine/dates';
import { useI18n } from 'next-localization';
import { useState, useEffect } from 'react'
import { useEventListener } from '@mantine/hooks';

import IconCalendar from '@/core/components/icons/calendar'
import { set as setObj } from '@/core/modules/Object'
import { compareDate } from '@/core/modules/Date'
import { dateLocale } from '@/core/modules/Date'

import Config from '@/config'

export default ({
    name,
    item,
    index,
    positionIndex = undefined,
    parentIndex = undefined,
    form,
    variant,
    label,
    disabled,
    required,
    disableds = [],
    requireds = [],
    placeholder,
    refs,
    valueFormat,
    description,
    onSet = (key, values) => {

    }
}) => {

    const i18n = useI18n();

    const formIndex = (parentIndex != undefined ? parentIndex + '.' + (positionIndex != undefined ? positionIndex + "." : "") + index : index)

    const [init, setInit] = useState(false);

    const [items, setItems] = useState({});

    useEffect(() => {

        if (init == false && typeof item != 'undefined') {

            var tmp = {}

            refs[index].map((ref, refIndex) => {
                if (item.hasOwnProperty(ref) == true) {
                    setObj(tmp, ref, item[ref])
                }
            })

            setItems(tmp);
            setInit(true);

        }

    })

    const onDateChange = (index, value) => {

        if (value instanceof Date) {

            if (index.indexOf('start') + 1 != 0) {

                value.setHours(0)
                value.setMinutes(0)
                value.setSeconds(0)
                value.setMilliseconds(0)

            } else if (index.indexOf('end') + 1 != 0) {

                value.setHours(23)
                value.setMinutes(59)
                value.setSeconds(59)
                value.setMilliseconds(99)

            }

        }

        if (item.hasOwnProperty(index) == true) {

            if (compareDate(items[index], value) == true) {

                let tmpItems = items

                if (typeof (form) != 'undefined') {
                    form.setFieldValue(index, value);
                }

                tmpItems[index] = value

                setItems(tmpItems)

                if (typeof (onSet) == 'function') {

                    onSet(formIndex, tmpItems)

                }

            }

        }

    }

    const onChange = (event) => {

        var element = event.target;
        var index = element.getAttribute('data-path')

        if (index != null) {
            onDateChange(index, element.value);
        }

    }

    const dateParser: DateInputProps['dateParser'] = (input) => {
        return new Date(dateLocale(input));
    };

    const elementRefs = {};

    return (
        <Group
            variant={variant}
        > <DatesProvider settings={{ locale: Config.locale, timezone: Config.timezone }}>{refs[index].map((ref, refIndex) => {

            let formIndexRef = (parentIndex != undefined ? parentIndex + '.' + (positionIndex != undefined ? positionIndex + "." : "") + ref : ref)

            if (elementRefs.hasOwnProperty(ref) == false) {

                var elementRef = useEventListener('keyup', onChange);

                setObj(elementRefs, ref, elementRef)

            }

            let required_ref = (requireds != undefined ? requireds.includes(ref) : false)

            let disabled_ref = (requireds != undefined ? disableds.includes(ref) : false)

            let placeholder_ref = ''

            if (i18n.t(`${name}.placeholders.${ref}`)) {
                placeholder_ref = i18n.t(`${name}.placeholders.${ref}`)
            } else if (i18n.t(`${name}.${ref}`)) {
                placeholder_ref = i18n.t(`${name}.${ref}`)
            } else if (i18n.t(`placeholders.${ref}`)) {
                placeholder_ref = i18n.t(`placeholders.${ref}`)
            }

            let valueRef = item[formIndexRef]

            try {

                if (!(valueRef instanceof Date) && String(valueRef).length > 0) {
                    valueRef = new Date(valueRef)
                }

            } catch (e) {

                valueRef = new Date()

            }

            return (
                <DateInput
                    dateParser={dateParser}
                    ref={elementRefs[ref]}
                    variant={variant}
                    label={label && !refIndex ? label : ''}
                    placeholder={placeholder_ref}
                    description={description}
                    disabled={disabled_ref}
                    required={required_ref}
                    withAsterisk={false}
                    withErrorStyles
                    {...(typeof (form) != "undefined" ? form.getInputProps(formIndexRef) : {
                        value: (item.hasOwnProperty(formIndexRef) ? valueRef : "")
                    })}
                    key={ref}
                    valueFormat={valueFormat}
                    rightSection={<IconCalendar className="montine-InputDate-icon" variant="right" />}
                    onChange={(value) => {

                        onDateChange(ref, value)

                    }}
                />
            )

        })} </DatesProvider> </Group>
    )

}