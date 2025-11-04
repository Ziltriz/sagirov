import { useState, useEffect } from 'react'
import { useI18n } from 'next-localization';
import { Box, Button, Anchor } from '@mantine/core'
import { observer } from 'mobx-react-lite'

import { schemaUseForm, schemaToRender, schemaSetValues, schemaPrepareValuesSet } from '@/core/modules/Form'

import Breadcrumps from '@/core/components/layouts-parts/breadcrumps'

import Classes from '@/core/styles/pages/list.module.scss'

export default observer(({
    prefix = '',
    store,
    schemaForCode = false,
    titleItem,
    codeItem = 'slug',
    section,
    breadcrumps,
    name,
    values,
    href,
    schema,
    error,
    formSubmit,
    callbacks = {}
}) => {

    const i18n = useI18n();
    const [init, setInit] = useState(false);
    const form = schemaUseForm(schema)
    const [data, setData] = useState({})
    const [title, setTitle] = useState((i18n.t('headlings.' + name + '_edit').length > 0 ? i18n.t('headlings.' + name + '_edit') : i18n.t('headlings.' + name)));
    const [code, setCode] = useState(undefined);
    const [schemaRender, setSchemaRender] = useState(false);
    const onSubmit = (callbacks.hasOwnProperty('onSubmit') == true ? callbacks['onSubmit'] : undefined)

    useEffect(() => {

        if (init == false) {

            if (values instanceof Promise) {

                values.then((item) => {

                    let renderSchema = schema

                    item = schemaPrepareValuesSet(schema, item, callbacks)

                    if (typeof (titleItem) != 'undefined' && item.hasOwnProperty(titleItem) == true) {
                        setTitle(item[titleItem])
                        breadcrumps[breadcrumps.length - 1] = item[titleItem];
                    }

                    if (typeof (codeItem) != 'undefined' && item.hasOwnProperty(codeItem) == true) {
                        setCode(item[codeItem])
                        if (schema.hasOwnProperty('schemaForCode') == true && schemaForCode == true) {
                            if (schema['schemaForCode'].hasOwnProperty(item[codeItem]) == true) {
                                renderSchema = schema['schemaForCode'][item[codeItem]]
                            }
                        }
                    }

                    setSchemaRender(renderSchema)
                    setData(item)
                    schemaSetValues(form, renderSchema, schemaForCode, item)
                    setInit(true)

                })

            }

        }

    });

    const submit = (values) => {
        
        if (typeof onSubmit == 'function') {
            values = onSubmit('edit', store, values)
        }

        if (typeof formSubmit == 'function') {
            formSubmit(values)
        }

    }

    if (init == true && Object.keys(schema.values).length > 0) {

        let send_button_text = i18n.t(`${schema.name}.edit_button`)

        if (send_button_text.length == 0) {
            send_button_text = i18n.t(`common.edit_button`)
        }

        let reset_button_text = i18n.t(`${schema.name}.reset_button`)

        if (reset_button_text.length == 0) {
            reset_button_text = i18n.t(`common.reset_button`)
        }

        return (
            <>
                <Breadcrumps
                    store={store}
                    section={section}
                    breadcrumps={breadcrumps}
                    text={title}
                    order={4}
                />
                <form className={Classes.form} onSubmit={form.onSubmit(submit)}>
                    {schemaToRender(store, form, schemaRender, prefix, callbacks, data, {
                        schemaForCode: schemaForCode,
                        code: code
                    })}
                    {typeof (formSubmit) == "function" ?
                        <Box className={Classes.blockbutton}>
                            <Button className={Classes.button} type="submit">{send_button_text}</Button>
                            {href ? <Anchor className={Classes.linkreset} href={href}>{reset_button_text}</Anchor> : ''}
                        </Box> : ""}
                </form>
            </>
        )

    }

})