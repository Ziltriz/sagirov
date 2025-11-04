import { Select, MultiSelect } from '@mantine/core';
import { useI18n } from 'next-localization';
import { useState, useEffect } from 'react';

import IconOrderDown from '@/core/components/icons/orderDown'
import IconOrderUp from '@/core/components/icons/orderUp'
import { set as setObj } from '@/core/modules/Object'
import { schemaGetToPath } from '@/core/modules/Form'

export default ({
    name,
    multi = false,
    item,
    values = [],
    index,
    positionIndex = undefined,
    parentIndex = undefined,
    form,
    variant,
    label,
    disabled,
    required,
    placeholder,
    description,
    select_first = true,
    onSet = (key, values) => {

    }
}) => {

    const i18n = useI18n();

    const formIndex = (parentIndex != undefined ? parentIndex + '.' + (positionIndex != undefined ? positionIndex + "." : "") + index : index)

    const formElement = (typeof (form) != 'undefined' ? schemaGetToPath(form.values, formIndex) : undefined)

    const [init, setInit] = useState(false);

    const [open, setOpen] = useState(false);

    const [value, setValue] = useState((typeof (formElement) != 'undefined' ? formElement : (multi == true ? (Array.isArray(item) == true ? item : []) : (typeof (item) == 'string' ? item : ""))));

    const [items, setItems] = useState([]);

    useEffect(() => {

        if (init == false) {

            if (values instanceof Promise) {

                values.then((data) => {
                    setItems(prepareValues(data));
                })

            } else if (typeof (values.length) != 'undefined') {

                setItems(prepareValues(values));

            }

            setInit(true);

        }

    });

    const prepareValues = (values) => {

        var array = []

        if (Array.isArray(values) == true) {

            if (values.length > 0) {

                values.forEach((value_element, index_element) => {

                    var element = {};

                    if (!index_element && select_first == false) {
                        array.push({
                            value: "",
                            label: ""
                        });
                    }

                    if (typeof value_element != 'object') {

                        var label_element = '';

                        if (i18n.t(`${name}.${formIndex}_list.${value_element}`)) {
                            label_element = i18n.t(`${name}.${formIndex}_list.${value_element}`);
                        } else if (i18n.t(`${name}.labels.${value_element}`)) {
                            label_element = i18n.t(`${name}.labels.${value_element}`);
                        } else if (i18n.t(`${name}.${value_element}`)) {
                            label_element = i18n.t(`${name}.${value_element}`);
                        } else if (i18n.t(`labels.${value_element}`)) {
                            label_element = i18n.t(`$labels.${value_element}`);
                        }

                        if (!label_element) {
                            label_element = value_element
                        }

                        setObj(element, 'value', String(value_element));
                        setObj(element, 'label', String(label_element));

                    } else {

                        if (value_element.hasOwnProperty('value') == true && value_element.hasOwnProperty('label') == true) {

                            setObj(element, 'value', String(value_element.value));
                            setObj(element, 'label', String(value_element.label));

                        }

                    }

                    array.push(element);

                    if (!index_element && value.length == 0) {

                        let tmpValue = element.value

                        if (multi == true) {

                            // if (typeof (tmpValue) == 'string') {
                            //     tmpValue = tmpValue.split(',')
                            // } else if (Array.isArray(tmpValue) != true) {
                            //     tmpValue = []
                            // }

                            // setValue(tmpValue);

                            // if (typeof (form) != 'undefined') {
                            //     form.setFieldValue(index, tmpValue)
                            // }

                        } else {

                            setValue(tmpValue);

                            if (typeof (form) != 'undefined') {
                                form.setFieldValue(index, tmpValue)
                            }
                        }

                    }


                })

            }

        }

        return array;

    }

    if (init == true) {

        if (multi == true) {

            return (
                <MultiSelect
                    rightSection={open == true ? <IconOrderUp /> : <IconOrderDown />}
                    checkIconPosition="right"
                    data={items}
                    onOptionSubmit={(eventValue) => {

                        let tmpValue = value

                        if (Array.isArray(tmpValue) == true) {

                            if (tmpValue.includes(eventValue) == false) {
                                tmpValue.push(eventValue)
                            }

                        } else {

                            tmpValue = [eventValue]

                        }

                        setValue(Object.values(Object.assign(tmpValue)))

                        if (typeof (form) != 'undefined') {
                            form.setFieldValue(index, tmpValue)
                        }

                        if (typeof (onSet) == 'function') {
                            onSet(index, tmpValue)
                        }

                    }}
                    onRemove={(eventValue) => {

                        let tmpValue;

                        if (Array.isArray(value) == true) {

                            tmpValue = [...value.filter((subItem) => {
                                return subItem != eventValue
                            })]

                        } else {
                            tmpValue = []
                        }

                        setValue(Object.values(Object.assign(tmpValue)))

                        if (typeof (form) != 'undefined') {
                            form.setFieldValue(index, tmpValue)
                        }

                        if (typeof (onSet) == 'function') {
                            onSet(index, tmpValue)
                        }

                    }}
                    variant={variant}
                    label={label}
                    withAsterisk={false}
                    disabled={disabled}
                    required={required}
                    withErrorStyles
                    placeholder={placeholder}
                    description={description}
                    {...(typeof (form) != "undefined" ? form.getInputProps(index) : {
                        value: (Array.isArray(item) == true ? item : [])
                    })}
                    key={index}
                    onDropdownClose={() => setOpen(false)}
                    onDropdownOpen={() => setOpen(true)}
                />
            );

        } else {

            return (
                <Select
                    rightSection={open == true ? <IconOrderUp /> : <IconOrderDown />}
                    checkIconPosition="right"
                    data={items}
                    onOptionSubmit={(eventValue) => {

                        setValue(eventValue)

                        if (typeof (form) != 'undefined') {
                            form.setFieldValue(index, eventValue)
                        }

                        if (typeof (onSet) == 'function') {
                            onSet(index, eventValue)
                        }

                    }}
                    variant={variant}
                    label={label}
                    withAsterisk={false}
                    disabled={disabled}
                    required={required}
                    withErrorStyles
                    placeholder={placeholder}
                    description={description}
                    {...(typeof (form) != "undefined" ? form.getInputProps(index) : {
                        value: (typeof (item) == 'string' ? item : "")
                    })}
                    key={index}
                    onDropdownClose={() => setOpen(false)}
                    onDropdownOpen={() => setOpen(true)}
                />
            );

        }

    }

}