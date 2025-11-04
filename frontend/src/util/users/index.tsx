import { dateLocaleToTimestamp } from '@/core/modules/Date'

export const dataCustomization = (item, value, i18n) => {

    switch (item) {
        case 'active':
            value = (value === true || value == 'true' || value == '1' ? i18n.t(`users.is_active`) : i18n.t(`users.not_active`) )
            break;
        case 'created_at':
        case 'updated_at':
        case 'session_at':
            value = dateLocaleToTimestamp(value)
            break

    }

    return value

}
