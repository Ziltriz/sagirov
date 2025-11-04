import { dateLocale, dateCustom } from '@/core/modules/Date'

export const dateList = (item, value) => {

    return dateCustom(value)

}

export const periodList = (item, value, start_key, end_key) => {

    if (item.hasOwnProperty(start_key) == true && item.hasOwnProperty(end_key) == true) {

        if (typeof item[start_key] == 'string' && typeof item[end_key] == 'string') {

            return (typeof item[start_key] == 'string' ? dateLocale(item[start_key]) : '') + '-' + (typeof item[end_key] == 'string' ? dateLocale(item[end_key]) : '')

        }

    }
}

export const imageList = (item, value, key, variant = 'origin') => {

    if(typeof item[key] == 'object') {

        var result = Object.values(item[key]).filter((element) => {
            return element.variant == variant && element.url.length > 0;
        });

        if(result.length > 0) {
            return result.shift();
        }

    }

}