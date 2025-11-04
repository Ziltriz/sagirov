import { useI18n } from 'next-localization';
import { observer } from 'mobx-react-lite'
import { Box, Button, Modal } from '@mantine/core'
import { schemaUseForm, schemaToRender } from '@/core/modules/Form'
import { requestImage, requestIntoImage, request } from '@/core/modules/Request'
import { cloneDelLinks } from '@/core/modules/Object'
import Classes from '@/core/styles/pages/list.module.scss'

export default observer(({
    opened = false,
    prefix = 'inline',
    store,
    onEnd,
    onSuccess,
    onClose = () => { },
    onError,
    callbacks
}) => {

    const schema = (callbacks.hasOwnProperty('getSchemaAddInline') == true ? callbacks['getSchemaAddInline'](store) : undefined)

    if (schema != undefined) {

        const schema_image = (callbacks.hasOwnProperty('getSchemaImage') == true ? callbacks['getSchemaImage'](store) : undefined)
        const onSubmit = (callbacks.hasOwnProperty('onSubmit') == true ? callbacks['onSubmit'] : undefined)
        const form = schemaUseForm(schema)
        const i18n = useI18n();

        const formSuccess = (data) => {
            if (typeof onSuccess == 'function') {
                onSuccess(data, store.states.error)
            } else if (data.data.hasOwnProperty('success') == true) {
                if (data.data.success != true) {
                    if (data.data.hasOwnProperty('message') == true) {
                        store.states.error = data.data.message
                    }
                } else if (typeof onEnd == 'function') {
                    onEnd(data)
                }
            }
        }

        const formError = (error) => {
            if (typeof onError == 'function') {
                onError(error, store.states.error)
            } else {
                console.error(error)

                if (error.response.data.hasOwnProperty('message') == true) {
                    store.states.error = error.response.data['message']
                }
            }
        }

        const formSubmit = (values) => {

            if (typeof onSubmit == 'function') {
                values = onSubmit('add', store, values)
            }

            if (typeof (values) == 'object') {
                values = cloneDelLinks(values)

                if (schema_image != undefined) {
                    requestImage(schema_image, values, callbacks).then((data) => {
                        return requestIntoImage(schema, values, data, callbacks)
                    }).then(formSuccess, formError)
                } else {
                    request(schema, values, {}, callbacks).then(formSuccess, formError)
                }
            }

        }

        if (Object.keys(schema.values).length > 0) {

            let title = i18n.t(`${schema.name}.headlings.add_inline`)

            if (title.length == 0) {
                title = i18n.t(`headlings.add_inline`)
            }

            let send_button_text = i18n.t(`${schema.name}.send_inline_button`)

            if (send_button_text.length == 0) {
                send_button_text = i18n.t(`common.send_inline_button`)
            }

            return (

                <Modal opened={opened} onClose={onClose} title={title} variant={prefix} size={"40%"}>
                    <form className={Classes.form} onSubmit={form.onSubmit(formSubmit)} variant={prefix}>
                        {schemaToRender(store, form, schema, prefix, callbacks)}
                        {typeof (formSubmit) == "function" ?
                            <Box className={Classes.blockbutton} variant={prefix}>
                                <Button className={Classes.button} type="submit" variant={prefix}>{send_button_text}</Button>
                            </Box> : ""}
                    </form>
                </Modal>
            )

        }

    }

})