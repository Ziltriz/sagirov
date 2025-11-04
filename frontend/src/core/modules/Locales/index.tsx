import { set as setObj } from '@/core/modules/Object'
import { isObject } from '@/core/modules/Types'

export const initLocales = (locales, arrayLocales = []) => {

    let result = {}

    if (locales.length > 0 && arrayLocales.length > 0) {

        locales = searchLocales(locales)

        if (locales.length > 0) {

            locales.forEach((locale) => {

                if (result.hasOwnProperty(locale) == false) {
                    setObj(result, locale, {})
                }

                arrayLocales.forEach((objLocale) => {

                    if (isObject(objLocale) == true) {

                        if (objLocale.hasOwnProperty(locale) == true) {

                            mergeLocales(result[locale], objLocale[locale])

                        }
                    }

                });

            })

        }

    }

    return result;

}

export const searchLocales = (locales) => {

    return String(locales).split(',')

}

export const mergeLocales = (mainLocales, addLocales) => {

    for (let indexLocale in addLocales) {

        if(typeof(addLocales[indexLocale]) == 'string') {
            
            setObj(mainLocales, indexLocale, addLocales[indexLocale])

        } else if(typeof(addLocales[indexLocale]) == 'object'){

            if (mainLocales.hasOwnProperty(indexLocale) == false) {
                setObj(mainLocales, indexLocale, addLocales[indexLocale])
            } else {
                mergeLocales(mainLocales[indexLocale], addLocales[indexLocale])
            }
        }
    }

    return mainLocales

}