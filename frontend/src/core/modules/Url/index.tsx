import Config from '@/config'

const defaultTemplateReplace = /\%\w*\%/g;

const defaultTemplateSymbol = '%'

export const getRootPath = () => {
    return Config.rootPath;
}

export const getUri = (uri) => {
    return uri.split('?').shift()
}

export const getParam = (uri, key) => {

    let result = false;

    let parts = uri.split('?');

    if (parts.length > 1) {

        parts = parts.pop().split('&')

        if (parts.length > 0) {

            parts.forEach((value) => {

                if (value.indexOf(key) + 1 != 0) {

                    value = value.split('=', 2)

                    if(value[0] == key) {
                        result = value[1]
                    }

                }

            })

        }

    }
    
    return result;

}

export const searchUri = (uri, uri_test, start = true) => {

    let result

    if(typeof(uri) == 'string') {

        var regExp = new RegExp((!start ? '' : '^') + uri, 's');
        result = regExp.test(uri_test)

    } else if(Array.isArray(uri) == true){

        uri.forEach((item) => {

            if(!result) {
                var regExp = new RegExp((!start ? '' : '^') + item, 's');
                if(regExp.test(uri_test)) {
                    result = true
                }
            }

        })

    }

    

    return result

}

export const templateReplace = (uri, data, regexp = defaultTemplateReplace, templateSymbol = defaultTemplateSymbol) => {

    let params = [],
        arItem = [],
        href = uri.valueOf();

    while ((arItem = regexp.exec(uri)) !== null) {
        if (typeof (arItem[0]) != 'undefined') {
            params.push(arItem[0])
        }
    }

    if (params.length > 0) {

        params.forEach((param) => {

            let key = param.replaceAll(templateSymbol, '')

            if (data.hasOwnProperty(key) == true) {

                href = href.replaceAll(param, data[key])

            }

        })

    }

    return href


}