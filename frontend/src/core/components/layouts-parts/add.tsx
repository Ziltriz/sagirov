import { useI18n } from 'next-localization';
import { Box, Button, Anchor } from '@mantine/core'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'

import { schemaUseForm, schemaToRender } from '@/core/modules/Form'

import Breadcrumps from '@/core/components/layouts-parts/breadcrumps'
import Classes from '@/core/styles/pages/list.module.scss'

export default observer(({
    prefix = '',
    store,
    section,
    breadcrumps,
    name,
    href,
    schema,
    error,
    formSubmit,
    callbacks = {}
}) => {

    const i18n = useI18n();
    const [title, setTitle] = useState((i18n.t('headlings.' + name + '_add').length > 0 ? i18n.t('headlings.' + name + '_add') : i18n.t('headlings.' + name)));
    const onSubmit = (callbacks.hasOwnProperty('onSubmit') == true ? callbacks['onSubmit'] : undefined)
    const form = schemaUseForm(schema)

    const submit = (values) => {
        
        if (typeof onSubmit == 'function') {
            values = onSubmit('add', store, values)
        }

        if (typeof formSubmit == 'function') {
            formSubmit(values)
        }

    }

    if (Object.keys(schema.values).length > 0) {

        let send_button_text = i18n.t(`${schema.name}.send_button`)

        if (send_button_text.length == 0) {
            send_button_text = i18n.t(`common.send_button`)
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
                    {schemaToRender(store, form, schema, prefix, callbacks)}
                    {typeof (formSubmit) == "function" ?
                        <Box className={Classes.blockbutton}>
                            <Button className={Classes.button} type="submit">{send_button_text}</Button>
                            <Anchor className={Classes.linkreset} href={href}>{reset_button_text}</Anchor>
                        </Box> : ""}
                </form>
            </>
        )

    }

})