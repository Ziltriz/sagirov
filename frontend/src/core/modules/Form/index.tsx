import { useForm } from '@mantine/form';

import { type, isObject, isArray } from '@/core/modules/Types'
import { dateTimeRequest, dateTimeOnDateRequest } from '@/core/modules/Date'
import Form from '@/core/components/modules/form'

export const schemaPrepareUseForm = (store, schema, callbacks) => {

    if (callbacks.hasOwnProperty('prepareUseForm') == true) {

        if (typeof (callbacks.prepareUseForm) == 'object') {

            if (schema.hasOwnProperty('values') == true) {

                if (typeof (schema.values) == 'object') {

                    for (let index in schema.values) {

                        if (callbacks['prepareUseForm'].hasOwnProperty(index) == true) {

                            schema.values[index] = callbacks['prepareUseForm'][index](store, schema, schema.values[index])

                        }

                    }

                }

            }

        }

    }

    return { ...schema }

}

export const schemaUseForm = (schema) => {

    return useForm({
        initialValues: { ...schema.values },
        validate: { ...schema.validate }
    })

}

export const schemaToRender = (store, form, schema, prefix = '', callbacks = {}, item = {}, formParams: {}) => {

    let params = {
        ...{
            prefix: 'pages' + (prefix.length > 0 ? '-' + prefix : '')
        },
        ...formParams,
    }

    return (
        <Form
            prefix={prefix}
            store={store}
            form={form}
            schema={schema}
            item={item}
            callbacks={callbacks}
            formParams={params}
        />
    )

}

export const schemaGetToPath = (values, path, arrayReturn = false) => {

    if (typeof (path) == 'string') {

        values = { ...values }

        let loop = true,
            pathParts = parseIndex(path)

        if (typeof (pathParts) != 'undefined' && typeof (pathParts) != 'string') {

            let search = pathParts.parts.concat([pathParts.current])

            if (search.includes('%index%') == true) {

                if (loop == true) {

                    search.forEach((key) => {

                        if (loop == true) {

                            let finish = true

                            if (key != '%index%') {

                                if (values.hasOwnProperty(key) == true) {
                                    values = values[key]
                                    finish = false
                                }

                            } else {


                                if (typeof (values) != 'undefined') {

                                    if (Array.isArray(values) == true) {

                                        if (arrayReturn == false) {
                                            if (values.length > 0) {
                                                values = values.shift()
                                                finish = false
                                            }
                                        } else {
                                            finish = false
                                            loop = false
                                        }

                                    } else {
                                        values = ""
                                        finish = false
                                    }

                                }

                            }

                            if (finish == true) {
                                values = undefined;
                                loop = false
                            }

                        }

                    })

                }

            } else {

                search.forEach((key) => {

                    if (loop == true) {

                        let finish = true

                        if (values.hasOwnProperty(key) == true) {
                            values = values[key]
                            finish = false
                        }

                        if (finish == true) {
                            values = undefined;
                            loop = false
                        }

                    }

                })

            }

            return values

        } else if (values.hasOwnProperty(path) == true) {
            return values[path]
        }

    }

}

export const schemaSetValues = (form, schema, schemaForCode = false, values = {}) => {

    values = { ...values }

    if (schemaForCode == true && Object.keys(values).length > 0) {

        if (schema.hasOwnProperty('values') == true) {

            for (let key in schema.values) {

                if (values.hasOwnProperty(key) == true) {

                    if (type(schema.values[key]) != type(values[key])) {
                        values[key] = schema.values[key];
                    }

                }

            }

        }

    }


    form.setValues(values)
}

export const schemaDateTimePrepareValueSet = (index, value) => {

    if (index.indexOf('_datetime') + 1 != 0 || index.indexOf('datetime_') + 1 != 0) {

    } else if (index.indexOf('_date') + 1 != 0 || index.indexOf('date_') + 1 != 0) {

        if (typeof (value) == "string") {

            return new Date(value)

        }

    }

    return value

}

export const schemaPrepareValuesSet = (schema, values, callbacks = {}) => {

    values = { ...values }

    if (Object.keys(values).length > 0) {

        for (let index in values) {

            var set = false;

            if (callbacks.hasOwnProperty('prepareValue') == true) {

                if (callbacks['prepareValue'].hasOwnProperty(index) == true) {
                    set = true

                    if (Array.isArray(values[index]) == true) {

                        if (typeof (callbacks['prepareValue'][index]) == 'function') {

                            values[index] = callbacks['prepareValue'][index](values, values[index]);

                        } else if (typeof (callbacks['prepareValue'][index]) == 'object') {

                            values[index].forEach((subValue) => {

                                if (typeof (subValue) == 'object') {

                                    for (let subIndex in subValue) {

                                        if (callbacks['prepareValue'][index].hasOwnProperty(subIndex) == true) {

                                            subValue[subIndex] = callbacks['prepareValue'][index](values, subValue[subIndex]);

                                        }

                                    }

                                }

                            })

                        }

                    } else if (typeof (callbacks['prepareValue'][index]) == 'function') {
                        values[index] = callbacks['prepareValue'][index](values, values[index]);
                    }

                }

            }

            if (set == false) {
                if (Array.isArray(values[index]) == true) {
                    values[index].forEach((subValue) => {
                        if (typeof (subValue) == 'object') {
                            for (let subIndex in subValue) {
                                subValue[subIndex] = schemaDateTimePrepareValueSet(subIndex, subValue[subIndex])
                            }
                        }
                    })
                } else {
                    values[index] = schemaDateTimePrepareValueSet(index, values[index])
                }
            }
        }

        if (schema.hasOwnProperty('values') == true) {

            for (let index in schema.values) {

                if (values.hasOwnProperty(index) == true) {

                    var set = false;

                    if (callbacks.hasOwnProperty('prepareValue') == true) {

                        if (Array.isArray(values[index]) == true) {

                            if (typeof (callbacks['prepareValue'][index]) == 'function') {

                                values[index] = callbacks['prepareValue'][index](values, values[index]);

                            } else if (typeof (callbacks['prepareValue'][index]) == 'object') {

                                values[index].forEach((subValue) => {

                                    if (typeof (subValue) == 'object') {

                                        for (let subIndex in subValue) {

                                            if (callbacks['prepareValue'][index].hasOwnProperty(subIndex) == true) {

                                                subValue[subIndex] = callbacks['prepareValue'][index](values, subValue[subIndex]);

                                            }

                                        }

                                    }

                                })

                            }

                        } else if (typeof (callbacks['prepareValue'][index]) == 'function') {
                            values[index] = callbacks['prepareValue'][index](values, values[index]);
                        }

                    }

                    if (set == false) {

                        if (Array.isArray(values[index]) == true) {

                            values[index].forEach((subValue) => {
                                if (typeof (subValue) == 'object') {
                                    for (let subIndex in subValue) {
                                        subValue[subIndex] = schemaDateTimeSchemaPrepareValues(subIndex, subValue[subIndex])
                                    }
                                }
                            })

                        } else {

                            values[index] = schemaDateTimePrepareValueSet(index, values[index])

                        }

                    }

                }

            }

        }

    }

    return values

}

export const schemaDateTimeSchemaPrepareValues = (index, value) => {

    if (index.indexOf('_datetime') + 1 != 0 || index.indexOf('datetime_') + 1 != 0) {

    } else if (index.indexOf('_date') + 1 != 0 || index.indexOf('date_') + 1 != 0) {

        if (value instanceof Date) {

            value = value.toString()
            return dateTimeRequest(value)

        }

    }

    return value

}

export const schemaPrepareValues = (schema, values, callbacks = {}) => {

    values = { ...values }

    if (Object.keys(values).length > 0) {

        for (let index in values) {

            var prepare = false;

            if (callbacks.hasOwnProperty('prepareValues') == true) {

                if (callbacks['prepareValues'].hasOwnProperty(index) == true) {

                    prepare = true;

                    if (Array.isArray(values[index]) == true) {

                        if (typeof (callbacks['prepareValues'][index]) == 'function') {

                            values[index] = callbacks['prepareValues'][index](values, values[index]);

                        } else if (typeof (callbacks['prepareValues'][index]) == 'object') {

                            values[index].forEach((subValue) => {

                                if (typeof (subValue) == 'object') {

                                    for (let subIndex in subValue) {

                                        if (callbacks['prepareValues'][index].hasOwnProperty(subIndex) == true) {

                                            subValue[subIndex] = callbacks['prepareValues'][index](values, subValue[subIndex]);

                                        }

                                    }

                                }

                            })

                        }

                    } else if (typeof (callbacks['prepareValues'][index]) == 'function') {
                        values[index] = callbacks['prepareValues'][index](values, values[index]);
                    }

                }

            }

            if (prepare == false) {

                if (Array.isArray(values[index]) == true) {
                    values[index].forEach((subValue) => {
                        if (typeof (subValue) == 'object') {
                            for (let subIndex in subValue) {
                                subValue[subIndex] = schemaDateTimeSchemaPrepareValues(subIndex, subValue[subIndex])
                            }
                        }
                    })
                } else {
                    values[index] = schemaDateTimeSchemaPrepareValues(index, values[index])
                }

            }


        }

    }

    if (schema.hasOwnProperty('values') == true) {

        if (Object.keys(schema.values).length > 0) {

            let ref = [],
                refs = []

            if (schema.hasOwnProperty('refs') == true) {
                for (let index in schema.refs) {
                    ref.push(index)
                    refs = refs.concat(schema.refs[index])
                }
            }

            for (let index in values) {

                if (schema.values.hasOwnProperty(index) == false && refs.includes(index) == false) {
                    delete values[index];
                } else if (ref.includes(index) == true) {
                    delete values[index];
                }

            }


        }

    }

    values = schemaPrepareValuesDate(values)

    if (schema.hasOwnProperty('values') == true && callbacks.hasOwnProperty('schemaPrepareValuesEnd') == true) {

        values = callbacks['schemaPrepareValuesEnd'](schema, values)

    }

    return values

}

export const schemaPrepareValuesDate = (values) => {

    if (values instanceof Date) {

        values = dateTimeOnDateRequest(values)

    } else if (isObject(values) == true) {

        if (Object.keys(values).length > 0) {
            for (let index in values) {
                values[index] = schemaPrepareValuesDate(values[index])
            }
        }

    } else if (isArray(values) == true) {

        if (values.length > 0) {
            values = values.map((value) => {
                return schemaPrepareValuesDate(value)
            })
        }

    }

    return values

}

export const parseIndex = (index) => {

    if (typeof (index) == 'string') {

        let path = index.valueOf()

        if (index.length > 0) {

            let parts = index.split('.')
            let current = parts.pop();

            if (parts.length > 0) {

                return {
                    'parts': parts,
                    'current': current
                }

            }

        }

    }

}