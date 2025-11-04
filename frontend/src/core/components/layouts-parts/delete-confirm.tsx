import { useI18n } from 'next-localization';
import { Box, Button, Modal } from '@mantine/core'
import { observer } from 'mobx-react-lite'

import Classes from '@/core/styles/pages/list.module.scss'

export default observer(({
    store,
    opened = false,
    prefix = 'confirm',
    onEnd,
    onClose = () => { },
    callbacks={}
}) => {

    const schema = (callbacks.hasOwnProperty('getSchemaDeleteConfirm') == true ? callbacks['getSchemaDeleteConfirm'](store) : undefined)

    if (schema != undefined) {

        const i18n = useI18n();

        if (Object.keys(schema.values).length > 0) {

            let title = i18n.t(`${schema.name}.headlings.delete_confirm`)

            if (title.length == 0) {
                title = i18n.t(`headlings.delete_confirm`)
            }

            let send_button_text = i18n.t(`${schema.name}.delete_confirm_button`)

            if (send_button_text.length == 0) {
                send_button_text = i18n.t(`common.delete_confirm_button`)
            }

            return (

                <Modal opened={opened} onClose={onClose} title={title} size={"40%"} variant={prefix}>
                    <form className={Classes.form} onSubmit={onEnd}>
                        <Box className={Classes.blockbutton} variant={prefix}>
                            <Button className={Classes.button} type="submit" variant={prefix}>{send_button_text}</Button>
                        </Box>
                    </form>
                </Modal>
            )

        }

    }

})