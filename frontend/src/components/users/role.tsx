import { Box } from '@mantine/core'
import { useI18n } from 'next-localization';
import Classes from '@/core/styles/pages/list.module.scss'

export default ({ schema, index, item, value, indexKey }) => {

    const i18n = useI18n();

    return (
        <Box key={index} className={Classes.bodyitemvalue}>
            {i18n.t(`${schema.name}.${indexKey}_list.${value}`)}
        </Box>

    )

}