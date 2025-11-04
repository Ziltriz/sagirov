import { IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useI18n } from 'next-localization';
import { useRouter } from 'next/router'
import { Flex, Box, Button, Anchor, Popover } from '@mantine/core'
import { useState } from 'react'

import { Title } from '@mantine/core'

import Ordered from '@/core/modules/Ordered'
import { schemaGetToPath } from '@/core/modules/Form'
import { set as setObj } from '@/core/modules/Object'

import Text from '@/core/components/modules/form/text'
import Number from '@/core/components/modules/form/number'
import Textarea from '@/core/components/modules/form/textarea'
import Password from '@/core/components/modules/form/password'
import Switch from '@/core/components/modules/form/switch'
import Dropzone from '@/core/components/modules/form/dropzone'
import Hidden from '@/core/components/modules/form/hidden'
import Period from '@/core/components/modules/form/period'
import Date from '@/core/components/modules/form/date'
import Select from '@/core/components/modules/form/select'
import DaysWeekTime from '@/core/components/modules/form/days_week_time'


import IconPlus from '@/core/components/icons/plus'
import IconMore from '@/core/components/icons/more'
import { typeBlockIcons } from '@/core/components/icons/typeBlock'

import Classes from '@/core/styles/modules/form.module.scss'

import Config from '@/config'

export default ({
    prefix = '',
    store,
    form,
    schema,
    item,
    formParams,
    callbacks = {},
    page = 0
}) => {

    const router = useRouter();

    const i18n = useI18n();

    const [init, setInit] = useState(false);

    const [itemsValues, setItemsValues] = useState({});

    const [itemType, setItemType] = useState(false);

    const [itemTypeValue, setItemTypeValue] = useState("");

    const [tabValue, setTabValue] = useState("");

    const tabClick = (tabKey, schema) => {

        if (schema.values.hasOwnProperty(tabKey) == true) {

            if (typeof (schema.values[tabKey]) == 'object') {

                setTabValue(tabKey);

            } else {

                switch (schema.types[tabKey]) {
                    case "link":
                        if (typeof (schema.values[tabKey]) == "string") {
                            if (schema.values[tabKey].length > 0) {
                                router.push(schema.values[tabKey] + '?refferer=' + btoa(router.asPath))
                            }
                        }
                    break;
                }

            }

        }

    }

    const blockItemsAdd = (schema, index, formIndex, type = '', itemValues = {}) => {

        let formElement = schemaGetToPath(form.values, formIndex)

        if (typeof (formElement) != 'undefined') {

            if (schema.blocks.hasOwnProperty(index) == true) {

                let blockValues,
                    typeAdd = false,
                    block = schema.blocks[index];

                if (block.hasOwnProperty('values') == true) {

                    if (block.hasOwnProperty('type') == true && block.hasOwnProperty('type_view') == true) {

                        if (block.type.length > 0 && block.type_view.length > 0 && Object.keys(block.values).length > 0) {

                            if (itemType == false) {

                                typeAdd = true;

                            } else {

                                if (block.values.hasOwnProperty(type) == true) {

                                    blockValues = block.values[type]

                                    setItemType(false);
                                    setItemTypeValue("");

                                }

                            }

                        }

                    } else {
                        blockValues = block.values
                    }

                }

                if (!typeAdd) {

                    if (blockValues) {

                        let values = [...formElement],
                            new_item = { ...blockValues }

                        for (let index in new_item) {
                            if (index.indexOf('priority') + 1 != 0) {
                                new_item[index] = parseInt(values.length);
                            }
                        }

                        if (Object.keys(itemValues).length > 0) {
                            for (let index in itemValues) {
                                if (new_item.hasOwnProperty(index) == true) {
                                    new_item[index] = itemValues[index]
                                }
                            }

                        }

                        form.setFieldValue(formIndex, values.concat([new_item]));

                    }

                } else {

                    setItemType(true);

                }

            }

        }

    }

    const blockItemsPrev = (schema, index, formIndex, position) => {
        if (schema.blocks.hasOwnProperty(index) == true) {
            let formElement = schemaGetToPath(form.values, formIndex)
            if (typeof (formElement) != 'undefined') {
                form.setFieldValue(formIndex, Ordered('dec', position, [...formElement], 1));
            }
        }
    }

    const blockItemsNext = (schema, index, formIndex, position) => {
        if (schema.blocks.hasOwnProperty(index) == true) {
            let formElement = schemaGetToPath(form.values, formIndex)
            if (typeof (formElement) != 'undefined') {
                form.setFieldValue(formIndex, Ordered('inc', position, [...formElement], 1));
            }
        }
    }

    const blockItemsDelete = (schema, index, formIndex, position) => {

        if (schema.blocks.hasOwnProperty(index) == true) {

            let formElement = schemaGetToPath(form.values, formIndex)

            if (typeof (formElement) != 'undefined') {
                if (typeof (formElement[position]) != undefined) {
                    let items = formElement.filter((filterValue, filterIndex) => filterIndex != position);
                    form.setFieldValue(formIndex, Ordered('sort', 0, items, 0));
                }
            }

        }
    }

    const renderField = (params, counter) => {

        if (params.hasOwnProperty('schema') == true && params.hasOwnProperty('index') == true) {

            let formIndex = (params.parentIndex != undefined ? params.parentIndex + '.' + (params.position != undefined ? params.position + "." : "") + params.index : params.index)

            let input,
                label,
                before_text,
                placeholder,
                description,
                refs,
                blocks,
                tabs,
                type,
                values,
                values_access_roles = {},
                mask,
                disabled = false,
                required = false,
                disableds = [],
                requireds = [],
                options = {},
                schema_name = params.schema.name,
                key = params.schema.name + page + counter + formIndex,
                variant,
                pages = (router.asPath.split('?').shift() != '/' ? true : false);

            if (params.hasOwnProperty('value') == false && form.values.hasOwnProperty(params.index) == true) {
                setObj(params, 'value', form.values[params.index]);
            }

            if (typeof (params.type_block) != 'undefined') {

                variant = (formParams.prefix ? `${formParams.prefix}-${params.schema.name}-${params.type_block}-${params.index}` : 'default')

                if (params.schema.hasOwnProperty('masks') == true) {

                    mask = (
                        params.schema.masks.hasOwnProperty(params.type_block) == true ?
                            (params.schema.masks[params.type_block].hasOwnProperty(params.index) ?
                                params.schema.masks[params.type_block][params.index] : undefined) : undefined
                    );
                }

                if (params.schema.hasOwnProperty('types') == true) {

                    type = (
                        params.schema.types.hasOwnProperty(params.type_block) == true ?
                            (params.schema.types[params.type_block].hasOwnProperty(params.index) ?
                                params.schema.types[params.type_block][params.index] : undefined) : undefined
                    );
                }

                if (params.schema.hasOwnProperty('types_values') == true) {
                    values = (
                        params.schema.types_values.hasOwnProperty(params.type_block) == true ?
                            (params.schema.types_values[params.type_block].hasOwnProperty(params.index) ?
                                params.schema.types_values[params.type_block][params.index] : []) : []
                    );
                }

                if (params.schema.hasOwnProperty('disabled') == true) {
                    disableds = (
                        schema.disabled.hasOwnProperty(params.type_block) == true ?
                            (params.schema.disabled[params.type_block].hasOwnProperty(params.index) ?
                                params.schema.disabled[params.type_block][params.index] : []) : []
                    );
                }

                if (params.schema.hasOwnProperty('required') == true) {
                    requireds = (
                        params.schema.required.hasOwnProperty(params.type_block) == true ?
                            (params.schema.required[params.type_block].hasOwnProperty(params.index) ?
                                params.schema.required[params.type_block][params.index] : []) : []
                    );
                }

                if (params.schema.hasOwnProperty('options') == true) {
                    options = (
                        params.schema.options.hasOwnProperty(params.type_block) == true ?
                            (params.schema.options[params.type_block].hasOwnProperty(params.index) ?
                                params.schema.options[params.type_block][params.index] : {}) : {}
                    );
                }

                if (params.schema.hasOwnProperty('refs') == true) {
                    if (params.schema.refs.hasOwnProperty(params.type_block) == true) {
                        refs = params.schema.refs[params.type_block];
                    }
                }

                if (params.schema.hasOwnProperty('blocks') == true) {
                    if (params.schema.blocks.hasOwnProperty(params.type_block) == true) {
                        blocks = params.schema.blocks[params.type_block];
                    }
                }

                if (params.schema.hasOwnProperty('values_access_roles') == true) {
                    if (params.schema.values_access_roles.hasOwnProperty(params.type_block) == true) {
                        values_access_roles = (
                            typeof params.schema.values_access_roles[params.type_block] != 'undefined' ?
                                params.schema.values_access_roles[params.type_block] : {}
                        );

                    }
                }


                if (i18n.t(`${schema_name}.${params.type_block}.before_text.${params.index}`)) {
                    before_text = i18n.t(`${schema_name}.${params.type_block}.before_text.${params.index}`);
                }

                if (i18n.t(`${schema_name}.${params.type_block}.fields.${params.index}`)) {
                    label = i18n.t(`${schema_name}.${params.type_block}.fields.${params.index}`);
                } else if (i18n.t(`${schema_name}.${params.type_block}.${params.index}`)) {
                    label = i18n.t(`${schema_name}.${params.type_block}.${params.index}`);
                } else if (i18n.t(`fields.${params.type_block}.${params.index}`)) {
                    label = i18n.t(`fields.${params.type_block}.${params.index}`);
                }

                if (i18n.t(`${schema_name}.${params.type_block}.placeholders.${params.index}`)) {
                    placeholder = i18n.t(`${schema_name}.${params.type_block}.placeholders.${params.index}`);
                } else if (i18n.t(`${schema_name}.${params.type_block}.${params.index}`)) {
                    placeholder = i18n.t(`${schema_name}.${params.type_block}.${params.index}`);
                } else if (i18n.t(`placeholders.${params.type_block}.${params.index}`)) {
                    placeholder = i18n.t(`placeholders.${params.type_block}.${params.index}`);
                }


                if (i18n.t(`${schema_name}.${params.type_block}.descriptions.${params.index}`)) {
                    description = i18n.t(`${schema_name}.${params.type_block}.descriptions.${params.index}`);
                } else if (i18n.t(`descriptions.${params.type_block}.${params.index}`)) {
                    description = i18n.t(`descriptions.${params.type_block}.${params.index}`);
                }

            } else if (tabValue.length > 0 && params.schema.values.hasOwnProperty(tabValue) == true) {

                variant = (formParams.prefix ? `${formParams.prefix}-${params.schema.name}-${tabValue}-${params.index}` : 'default')

                if (params.schema.hasOwnProperty('masks') == true) {
                    if (params.schema.masks.hasOwnProperty(tabValue) == true) {
                        type = (
                            params.schema.masks[tabValue].hasOwnProperty(params.index) == true ?
                                params.schema.masks[tabValue][params.index] : undefined
                        );
                    }
                }

                if (params.schema.hasOwnProperty('types') == true) {
                    if (params.schema.types.hasOwnProperty(tabValue) == true) {
                        type = (
                            params.schema.types[tabValue].hasOwnProperty(params.index) == true ?
                                params.schema.types[tabValue][params.index] : undefined
                        );
                    }
                }

                if (params.schema.hasOwnProperty('types_values') == true) {
                    values = (
                        params.schema.types_values.hasOwnProperty(tabValue) == true ?
                            (params.schema.types_values.tabValue.hasOwnProperty(params.index) == true ?
                                params.schema.types_values[tabValue][params.index] : []) : []
                    );
                }


                if (params.schema.hasOwnProperty('disabled') == true) {
                    disableds = (
                        typeof params.schema.disabled[tabValue] != 'undefined' ?
                            params.schema.disabled[tabValue] : []
                    );
                }

                if (params.schema.hasOwnProperty('required') == true) {
                    requireds = (
                        typeof params.schema.required[tabValue] != 'undefined' ?
                            params.schema.required[tabValue] : []
                    );
                }

                if (params.schema.hasOwnProperty('options') == true) {
                    options = (
                        typeof params.schema.options[tabValue] != 'undefined' ?
                            params.schema.options[tabValue] : {}
                    );
                }

                if (params.schema.hasOwnProperty('refs') == true) {
                    refs = params.schema.refs;
                }

                if (params.schema.hasOwnProperty('blocks') == true) {
                    blocks = params.schema.blocks
                }

                if (params.schema.hasOwnProperty('values_access_roles') == true) {
                    values_access_roles = (
                        typeof params.schema.values_access_roles != 'undefined' ?
                            params.schema.values_access_roles : {}
                    );
                }

                if (i18n.t(`${schema_name}.before_text.${tabValue}.${params.index}`)) {
                    before_text = i18n.t(`${schema_name}.before_text.${tabValue}.${params.index}`);
                }

                if (i18n.t(`${schema_name}.fields.${tabValue}.${params.index}`)) {
                    label = i18n.t(`${schema_name}.fields.${tabValue}.${params.index}`);
                } else if (i18n.t(`${schema_name}.${tabValue}.${params.index}`)) {
                    label = i18n.t(`${schema_name}.${tabValue}.${params.index}`);
                } else if (i18n.t(`fields.${tabValue}.${params.index}`)) {
                    label = i18n.t(`fields.${tabValue}.${params.index}`);
                }

                if (i18n.t(`${schema_name}.placeholders.${tabValue}.${params.index}`)) {
                    placeholder = i18n.t(`${schema_name}.placeholders.${tabValue}.${params.index}`);
                } else if (i18n.t(`${schema_name}.${tabValue}.${params.index}`)) {
                    placeholder = i18n.t(`${schema_name}.${tabValue}.${params.index}`);
                } else if (i18n.t(`placeholders.${tabValue}.${params.index}`)) {
                    placeholder = i18n.t(`placeholders.${tabValue}.${params.index}`);
                }


                if (i18n.t(`${schema_name}.descriptions.${tabValue}.${params.index}`)) {
                    description = i18n.t(`${schema_name}.descriptions.${tabValue}.${params.index}`);
                } else if (i18n.t(`descriptions.${tabValue}.${params.index}`)) {
                    description = i18n.t(`descriptions.${tabValue}.${params.index}`);
                }

                if (callbacks.hasOwnProperty('getValues') == true) {
                    if (callbacks['getValues'].hasOwnProperty(tabValue) == true) {

                        if (itemsValues.hasOwnProperty(params.index) == false) {

                            values = callbacks['getValues'][params.index](params.index, itemsValues[params.index], store);

                            setObj(itemsValues, params.index, values)

                            setItemsValues(itemsValues);

                        } else {
                            values = itemsValues[params.index]
                        }


                    }
                }


            } else {

                variant = (formParams.prefix ? `${formParams.prefix}-${params.schema.name}-${params.index}` : 'default')

                if (params.schema.hasOwnProperty('masks') == true) {
                    mask = (
                        params.schema.masks.hasOwnProperty(params.index) == true ?
                            params.schema.masks[params.index] : undefined
                    );
                }

                if (params.schema.hasOwnProperty('types') == true) {
                    type = (
                        params.schema.types.hasOwnProperty(params.index) == true ?
                            params.schema.types[params.index] : undefined
                    );
                }

                if (params.schema.hasOwnProperty('types_values') == true) {
                    values = (
                        params.schema.hasOwnProperty('types_values') == true ?
                            (params.schema.types_values.hasOwnProperty(params.index) == true ?
                                params.schema.types_values[params.index] : []) : []
                    );
                }

                if (params.schema.hasOwnProperty('disabled') == true) {
                    disableds = (
                        typeof params.schema.disabled != 'undefined' ?
                            params.schema.disabled : []
                    );
                }

                if (params.schema.hasOwnProperty('required') == true) {
                    requireds = (
                        typeof params.schema.required != 'undefined' ?
                            params.schema.required : []
                    );
                }

                if (params.schema.hasOwnProperty('options') == true) {
                    options = (
                        typeof params.schema.options != 'undefined' ?
                            params.schema.options : {}
                    );
                }

                if (params.schema.hasOwnProperty('values_access_roles') == true) {
                    values_access_roles = (
                        typeof params.schema.values_access_roles != 'undefined' ?
                            params.schema.values_access_roles : {}
                    );
                }

                if (params.schema.hasOwnProperty('refs') == true) {
                    refs = params.schema.refs;
                }

                if (params.schema.hasOwnProperty('blocks') == true) {
                    blocks = params.schema.blocks
                }

                if (params.schema.hasOwnProperty('tabs') == true) {
                    tabs = params.schema.tabs
                }

                if (i18n.t(`${schema_name}.before_text.${params.index}`)) {
                    before_text = i18n.t(`${schema_name}.before_text.${params.index}`);
                }

                if (i18n.t(`${schema_name}.fields.${params.index}`)) {
                    label = i18n.t(`${schema_name}.fields.${params.index}`);
                } else if (i18n.t(`${schema_name}.${params.index}`)) {
                    label = i18n.t(`${schema_name}.${params.index}`);
                } else if (i18n.t(`fields.${params.index}`)) {
                    label = i18n.t(`fields.${params.index}`);
                }

                if (i18n.t(`${schema_name}.placeholders.${params.index}`)) {
                    placeholder = i18n.t(`${schema_name}.placeholders.${params.index}`);
                } else if (i18n.t(`${schema_name}.${params.index}`)) {
                    placeholder = i18n.t(`${schema_name}.${params.index}`);
                } else if (i18n.t(`placeholders.${params.index}`)) {
                    placeholder = i18n.t(`placeholders.${params.index}`);
                }


                if (i18n.t(`${schema_name}.descriptions.${params.index}`)) {
                    description = i18n.t(`${schema_name}.descriptions.${params.index}`);
                } else if (i18n.t(`descriptions.${params.index}`)) {
                    description = i18n.t(`descriptions.${params.index}`);
                }

                if (callbacks.hasOwnProperty('getValues') == true) {
                    if (callbacks['getValues'].hasOwnProperty(params.index) == true) {

                        if (itemsValues.hasOwnProperty(params.index) == false) {

                            values = callbacks['getValues'][params.index](params.index, itemsValues[params.index], store);

                            setObj(itemsValues, params.index, values)

                            setItemsValues(itemsValues);

                        } else {
                            values = itemsValues[params.index]
                        }


                    }
                }

            }

            if (Array.isArray(requireds) == true) {
                required = requireds.includes(params.index)
            }

            if (Array.isArray(disableds) == true) {
                disabled = disableds.includes(params.index)
            }

            if (typeof (before_text) != 'undefined') {
                before_text = (
                    <Box className={Classes.itemsbeforetext}>
                        {before_text}
                    </Box>
                )
            }

            if(typeof(values_access_roles) == 'object') {
                if(values_access_roles.hasOwnProperty(params.index) == true) {
                    if(Array.isArray(values_access_roles[params.index]) == true) {
                        if(values_access_roles[params.index].includes(store.user.user.role) == false) {
                            type = 'hidden';
                        }
                    }
                }
            }

            switch (type) {

                default:

                    input = (
                        <>
                            {before_text}
                            <Text parentIndex={params.parentIndex} positionIndex={params.position} item={item} value={params.value} callbacks={callbacks}
                                schema_name={schema_name} form={form} variant={variant} label={pages ? label : false} disabled={disabled}
                                required={required} placeholder={placeholder} description={pages ? description : false} key={key} index={params.index}
                                mask={mask}
                            />
                        </>
                    );

                    if (type == 'hidden') {
                        input = (<Hidden key={key} item={item} value={params.value} callbacks={callbacks} input={input} />);
                    }


                break;

                case 'number':

                    input = (
                        <>
                            {before_text}
                            <Number parentIndex={params.parentIndex} positionIndex={params.position} item={item} value={params.value} callbacks={callbacks}
                                schema_name={schema_name} form={form} variant={variant} label={pages ? label : false} disabled={disabled}
                                required={required} placeholder={placeholder} description={pages ? description : false} key={key} index={params.index}
                                mask={mask}
                            />
                        </>
                    );

                    break;

                case 'select':
                case 'select_multi':

                    let select_first = true

                    if(options.hasOwnProperty(params.index) == true) {

                        if(options[params.index].hasOwnProperty('select_first') == true) {
                            select_first = options[params.index].select_first
                        }

                    }

                    input = (
                        <>
                            {before_text}
                            <Select multi={type == "select_multi"} parentIndex={params.parentIndex} positionIndex={params.position} item={item} value={params.value} values={values}
                                callbacks={callbacks} name={schema_name}
                                form={form} variant={variant} label={pages ? label : false}
                                description={pages ? description : false} disabled={disabled} required={required} placeholder={placeholder} key={key} index={params.index}
                                select_first={select_first}
                            />
                        </>
                    )

                    break;

                case 'textarea':

                    input = (
                        <>
                            {before_text}
                            <Textarea parentIndex={params.parentIndex} positionIndex={params.position} item={item} value={params.value} callbacks={callbacks}
                                schema_name={schema_name} form={form}
                                variant={variant} description={pages ? description : false} label={pages ? label : false}
                                disabled={disabled} required={required} placeholder={placeholder} key={key} index={params.index}
                            />
                        </>
                    )

                    break;

                case 'password':

                    input = (
                        <>
                            {before_text}
                            <Password parentIndex={params.parentIndex} positionIndex={params.position} item={item} value={params.value} callbacks={callbacks}
                                schema_name={schema_name} form={form}
                                variant={variant} label={pages ? label : false}
                                disabled={disabled} required={required} placeholder={placeholder} description={pages ? description : false} key={key} index={params.index}
                            />
                        </>
                    );

                    break;

                case 'switch':
                
                    input = (
                        <Switch parentIndex={params.parentIndex} positionIndex={params.position}
                            item={item} callbacks={callbacks} schema_name={schema_name} form={form} variant={variant} size="md" labelGroup={pages ? label : false}
                            label={pages ? placeholder : false} placeholder={placeholder} description={pages ? description : false} labelPosition="left"
                            disabled={disabled} required={required} key={key} index={params.index} value={params.value}
                        />
                    )

                    break;

                case 'dropzone':

                    input = (
                        <>
                            {before_text}
                            <Dropzone parentIndex={params.parentIndex} positionIndex={params.position} item={item} value={params.value} callbacks={callbacks}
                                schema_name={schema_name} form={form}
                                variant={variant} label={pages ? label : false}
                                maxSize={1024 ** 2} accept={IMAGE_MIME_TYPE} placeholder={placeholder} description={description} disabled={disabled}
                                required={required} key={key} index={params.index}
                            />
                        </>
                    )

                    // onDrop={(files) => console.log('accepted files', files)}
                    // onReject={(files) => console.log('rejected files', files)}

                    break;

                case 'period':

                    if (refs) {

                        if (refs.hasOwnProperty(params.index)) {

                            if (refs[params.index].length > 0) {

                                input = (
                                    <>
                                        {before_text}
                                        <Period parentIndex={params.parentIndex} positionIndex={params.position} item={item} value={params.value}
                                            callbacks={callbacks} form={form} variant={variant}
                                            label={pages ? label : false} disabled={disabled} required={required}
                                            disableds={disableds} requireds={requireds} placeholder={placeholder} description={pages ? description : false}
                                            refs={refs} key={key} index={params.index} valueFormat={Config.date_format} name={schema_name}
                                        />
                                    </>
                                )

                            }

                        }

                    }

                    break;

                case 'date':

                    input = (
                        <>
                            {before_text}
                            <Date parentIndex={params.parentIndex} positionIndex={params.position} item={item} value={params.value} callbacks={callbacks}
                                schema_name={schema_name} form={form} variant={variant}
                                label={pages ? label : false} disabled={disabled}
                                required={required} disableds={disableds} requireds={requireds} placeholder={placeholder} description={pages ? description : false}
                                key={key} index={params.index} valueFormat={Config.date_format}
                            />
                        </>
                    )

                    break;

                case 'days_week_time':

                    input = (
                        <>
                            {before_text}
                            <DaysWeekTime parentIndex={params.parentIndex} positionIndex={params.position} item={item} value={params.value} callbacks={callbacks}
                                schema_name={schema_name} form={form} variant={variant}
                                label={pages ? label : false} disabled={disabled}
                                required={required} disableds={disableds} requireds={requireds} placeholder={placeholder} description={pages ? description : false}
                                key={key} index={params.index} valueFormat={Config.date_format}
                            />
                        </>
                    )

                    break;


                case 'tabs':

                    if (tabs) {

                        if (tabs.hasOwnProperty(params.index) == true && form.values.hasOwnProperty(params.index) == true) {

                            if (tabs[params.index].hasOwnProperty('values') == true) {

                                let tabs_items,
                                    tabs_items_value;

                                tabs_items = (
                                    <Flex className={Classes.itemstabs} key={"items_tabs" + formIndex + counter}>
                                        {Object.keys(tabs[params.index].values).map((tabKey, index) => {

                                            if (tabs[params.index].values.hasOwnProperty(tabKey) == true) {

                                                let active = "";

                                                if (tabValue.length == 0 && index == 0) {
                                                    setTabValue(tabKey);
                                                    active = tabKey;
                                                }

                                                let tabName = (i18n.t(`${schema_name}.${params.index}.tabs.${tabKey}`) ? i18n.t(`${schema_name}.${params.index}.tabs.${tabKey}`) : tabKey)

                                                return (
                                                    <Flex
                                                        variant={(tabKey == tabValue || active.length > 0) ? 'active' : ''}
                                                        className={Classes.itemstabsitem} key={"items_tabsitems" + formIndex + tabKey + counter}
                                                        onClick={() => { tabClick(tabKey, tabs[params.index]) }}
                                                    >
                                                        {tabName}
                                                    </Flex>
                                                )

                                            }


                                        })}
                                    </Flex>
                                )

                                if (tabs[params.index].values.hasOwnProperty(tabValue) == true) {

                                    if (typeof (tabs[params.index].values[tabValue]) == 'object') {

                                        tabs_items_value = (
                                            Object.keys(tabs[params.index].values[tabValue]).map((subIndex, subValue) => {

                                                counter += 1

                                                return renderField({
                                                    schema: tabs[params.index],
                                                    index: subIndex,
                                                    parentIndex: params.index,
                                                    position: tabValue,
                                                    value: schemaGetToPath(form.values, formIndex + "." + tabValue + "." + subIndex)
                                                }, counter)

                                            })
                                        )

                                    }

                                }

                                input = (
                                    <>
                                        <Flex className={Classes.itemstabswrapper} key={"items_tabs__wrapper" + formIndex + counter}>
                                            {tabs_items}
                                        </Flex>
                                        {tabs_items_value}
                                    </>
                                )

                            }

                        }

                    }
                    break;
                case 'items_block':
                case 'type_block':


                    if (blocks) {

                        if (blocks[params.index].hasOwnProperty('values') == true) {

                            let items,
                                addBlockText = (i18n.t(`${schema_name}.${params.index}.add_block`) ? i18n.t(`${schema_name}.${params.index}.add_block`) : i18n.t(`${type}.add_block`)),
                                addTypeButtonBlockText = (i18n.t(`${schema_name}.${params.index}.buttons_block.add`) ? i18n.t(`${schema_name}.${params.index}.buttons_block.add`) : i18n.t(`${type}.buttons_block.add`)),
                                resetTypeButtonBlockText = (i18n.t(`${schema_name}.${params.index}.buttons_block.reset`) ? i18n.t(`${schema_name}.${params.index}.buttons_block.reset`) : i18n.t(`${type}.buttons_block.reset`)),
                                newTypeBlockText = (i18n.t(`${schema_name}.${params.index}.new_block`) ? i18n.t(`${schema_name}.${params.index}.new_block`) : i18n.t(`${type}.new_block`)),
                                formIndexBlock = (params.parentIndex != undefined ? params.parentIndex + '.' + (params.position != undefined ? params.position + "." : "") + params.index : params.index);

                            let add_button = (
                                <Flex
                                    variant={variant} key={"items_block__button" + formIndex + counter} className={Classes.itemsblockbutton} onClick={() => { blockItemsAdd(params.schema, params.index, formIndexBlock) }}> <IconPlus variant={variant} className={Classes.itemsblockbuttonicon} /> {addBlockText}
                                </Flex>
                            )

                            let add_type_button = (
                                itemType == true ? (<Box class={Classes.itemsblockitemstype}>
                                    <Title variant="" key={"items_block__item_title" + formIndex + counter} className={Classes.itemsblockitemstypetitle} order={5} variant={variant}>{newTypeBlockText}</Title>
                                    {blocks[params.index].type.map((typeItem, typeIndex) => {

                                        if (blocks[params.index].type_view == 'image') {

                                            if (typeBlockIcons.hasOwnProperty(typeItem) == true) {

                                                let blockTypeTitle = (i18n.t(`${schema_name}.${params.index}.${typeItem}.title_block`) ? i18n.t(`${schema_name}.${params.index}.${typeItem}.title_block`) : "")

                                                return (<Box
                                                    class={Classes.itemsblockitemstypeitem}
                                                    variant={(typeItem == itemTypeValue ? 'active' : '')}
                                                    onClick={() => { setItemTypeValue(typeItem) }}>
                                                    <Box class={Classes.itemsblockitemstypeitemicon} variant={(typeItem == itemTypeValue ? 'active' : '')}>{typeBlockIcons[typeItem]}</Box>
                                                    <Box class={Classes.itemsblockitemstypeitemtitle} variant={(typeItem == itemTypeValue ? 'active' : '')}>{blockTypeTitle}</Box>
                                                </Box>)

                                            }

                                        }

                                    })}
                                    <Box class={Classes.itemsblockitemstypebuttons}>
                                        <Anchor variant={(itemTypeValue.length > 0 ? 'reset__active' : 'reset')} onClick={() => { setItemType(false); setItemTypeValue("") }} className={Classes.itemsblockitemstypebutton}>{resetTypeButtonBlockText}</Anchor>
                                        <Button variant={(itemTypeValue.length > 0 ? 'add__active' : 'add')} onClick={() => { blockItemsAdd(params.schema, params.index, formIndexBlock, itemTypeValue) }} className={Classes.itemsblockitemstypebutton} type="submit">{addTypeButtonBlockText}</Button>
                                    </Box>
                                </Box>)
                                    : ''
                            )

                            let formElement = schemaGetToPath(form.values, formIndexBlock);

                            if (typeof (formElement) != 'undefined') {

                                if (formElement.length > 0) {

                                    items = (
                                        <Flex className={Classes.itemsblockitems} key={"items_block__items" + formIndex + counter}>

                                            {formElement.map((formValue, formValuePosition) => {

                                                let titleBlockText,
                                                    deleteBlockText,
                                                    prevBlockText,
                                                    nextBlockText;

                                                if (formValue.hasOwnProperty('type') == true) {

                                                    titleBlockText = (i18n.t(`${schema_name}.${params.index}.${formValue.type}.title_block`) ? i18n.t(`${schema_name}.${params.index}.${formValue.type}.title_block`) : i18n.t(`${type}.title_block`)),
                                                        deleteBlockText = (i18n.t(`${schema_name}.${params.index}.${formValue.type}.delete_block`) ? i18n.t(`${schema_name}.${params.index}.${formValue.type}.delete_block`) : i18n.t(`${type}.delete_block`)),
                                                        prevBlockText = (i18n.t(`${schema_name}.${params.index}.${formValue.type}.prev_block`) ? i18n.t(`${schema_name}.${params.index}.${formValue.type}.prev_block`) : i18n.t(`${type}.prev_block`)),
                                                        nextBlockText = (i18n.t(`${schema_name}.${params.index}.${formValue.type}.next_block`) ? i18n.t(`${schema_name}.${params.index}.${formValue.type}.next_block`) : i18n.t(`${type}.next_block`));

                                                } else {

                                                    titleBlockText = (i18n.t(`${schema_name}.${params.index}.title_block`) ? i18n.t(`${schema_name}.${params.index}.title_block`) : i18n.t(`${type}.title_block`)),
                                                        deleteBlockText = (i18n.t(`${schema_name}.${params.index}.delete_block`) ? i18n.t(`${schema_name}.${params.index}.delete_block`) : i18n.t(`${type}.delete_block`)),
                                                        prevBlockText = (i18n.t(`${schema_name}.${params.index}.prev_block`) ? i18n.t(`${schema_name}.${params.index}.prev_block`) : i18n.t(`${type}.prev_block`)),
                                                        nextBlockText = (i18n.t(`${schema_name}.${params.index}..next_block`) ? i18n.t(`${schema_name}.${params.index}.next_block`) : i18n.t(`${type}.next_block`));

                                                }

                                                return (<Box className={Classes.itemsblockitem} key={"items_block__item" + formIndex + counter}>
                                                    <Title variant="" key={"items_block__item_title" + formIndex + counter} className={Classes.itemsblockitemtitle} order={3} variant={variant}>{titleBlockText}</Title>
                                                    <Popover key={params.index} width={200} position="bottom-end" id={key} variant={key} shadow="xl">
                                                        <Popover.Target>
                                                            <Flex className={Classes.itemsblockitempanel} key={"items_block__item-panel" + formIndex + counter}>
                                                                <IconMore className={Classes.itemsblockitempanelicon} />
                                                            </Flex>
                                                        </Popover.Target>
                                                        <Popover.Dropdown>
                                                            <Flex className={Classes.itemsblockitemdropdown} key={"items_block__item-panel-dropdown" + formIndex + counter}>
                                                                <Flex
                                                                    key={"items_block__item-panel-dropdown-item-delete" + formIndex + counter}
                                                                    className={Classes.itemsblockitemdropdownitem}
                                                                    onClick={() => { blockItemsDelete(params.schema, params.index, formIndexBlock, formValuePosition) }}
                                                                > {deleteBlockText} </Flex>
                                                                {
                                                                    formValuePosition > 0 ? <Flex
                                                                        key={"items_block__item-panel-dropdown-item-prev" + formIndex + counter}
                                                                        className={Classes.itemsblockitemdropdownitem}
                                                                        onClick={() => { blockItemsPrev(params.schema, params.index, formIndexBlock, formValuePosition) }}
                                                                    > {prevBlockText} </Flex> : ''
                                                                }

                                                                {
                                                                    formValuePosition + 1 != formElement.length ? <Flex
                                                                        key={"items_block__item-panel-dropdown-item-next" + formIndex + counter}
                                                                        className={Classes.itemsblockitemdropdownitem}
                                                                        onClick={() => { blockItemsNext(params.schema, params.index, formIndexBlock, formValuePosition) }}
                                                                    > {nextBlockText} </Flex> : ''
                                                                }


                                                            </Flex>
                                                        </Popover.Dropdown>
                                                    </Popover>
                                                    <Flex className={Classes.itemsblockitemfields} key={"items_block__fields" + formIndex + counter}>
                                                        {Object.keys((type == 'type_block' && formValue.hasOwnProperty('type') == true ? blocks[params.index].values[formValue.type] : blocks[params.index].values)).map((subItemValue) => { //  ( type == 'type_block' && formValue.hasOwnProperty('type') == true ? blocks[params.index].values[formValue.type] : blocks[params.index].values)
                                                            counter += 1
                                                            if (type == 'type_block' && formValue.hasOwnProperty('type') == true) {
                                                                return (
                                                                    renderField({
                                                                        schema: blocks[params.index],
                                                                        index: subItemValue,
                                                                        parentIndex: formIndexBlock.replace('.' + subItemValue),
                                                                        position: formValuePosition,
                                                                        type_block: formValue.type,
                                                                        value: formValue[subItemValue]
                                                                    }, counter)
                                                                )
                                                            } else {

                                                                return (
                                                                    renderField({
                                                                        schema: blocks[params.index],
                                                                        index: subItemValue,
                                                                        parentIndex: formIndexBlock.replace('.' + subItemValue),
                                                                        position: formValuePosition,
                                                                        value: formValue[subItemValue]
                                                                    }, counter)
                                                                )
                                                            }

                                                        })}
                                                    </Flex>
                                                </Box>)
                                            })}
                                        </Flex>
                                    );

                                }

                            }

                            input = (
                                <Box className={Classes.itemsblockwrapper} key={"items_block__wrapper" + formIndex + counter}>
                                    {items}
                                    {add_type_button}
                                    {add_button}
                                </Box>
                            )

                        }

                    }

                    break;
            }

            return input;

        }

    }

    var counter = 0;

    return (<Box key="fieldswrapper" variant={(router.asPath.split('?').shift() != '/' ? 'pages' + (prefix.length > 0 ? '-' + prefix: '') : '') } className={Classes.fieldswrapper}>
        {Object.keys((typeof (schema.values) != 'undefined' ? schema.values : {})).map((index) => {

            counter += 1

            return renderField({
                schema: schema,
                index: index
            }, counter)

        })}
    </Box>)

}