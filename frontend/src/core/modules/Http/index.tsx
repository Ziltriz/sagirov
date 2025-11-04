import Config from '@/config'

import { set as setObj } from '@/core/modules/Object'

const axios = require('axios');

const methods = [
    'get', 'post', 'put', 'delete' ,'head', 'connect', 'options', 'trace', 'paths'
]

const cached = [
    'default', 'no-store', 'reload', 'no-cache' ,'force-cache', 'only-if-cached'
]


export const httpRequestAuth = (schema, token, values = {}, headers = {}, callbacks = {}) => {

    if(token) {

        Object.defineProperty(headers, 'Authorization' , {
            writable: true,
            enumerable: true,
            configurable: true,
            value: 'Basic ' + token
        });

    }
    try {
        let result = httpRequest(schema, values, headers, callbacks)
        return result;
    } catch (error) {
        
        throw error;
    }
    

    

}

export const httpRequest = (schema, values = {}, headers = {}, callbacks = {}) => {

    var baseUrl = Config.apiUrl,
        url = '',
        method = 'get',
        params = {},
        data = {},
        typeRequest = '',
        mode = 'no-cors',
        cache = 'no-store',
        crossdomain = false,
        withCredentials = false

    if(schema.hasOwnProperty('baseUrl') == true) {
        baseUrl = schema.baseUrl;
    }

    if(schema.hasOwnProperty('uri') == true) {
        url = schema.uri;
        for (const [key, value] of Object.entries(values)) {
            if (url.includes(`{${key}}`)) {
              url = url.replace(`{${key}}`, encodeURIComponent(value));
              
              delete values[key];
            }
        }
    }
    
    if(schema.hasOwnProperty('method') == true) {
        if(typeof(schema.method) == 'string') {
            if(methods.includes(schema.method.toLowerCase()) == true) {
                method = schema.method.toLowerCase();
            }
        }
    }

    if(Object.keys(values).length > 0) {

        if(schema.hasOwnProperty('json') == true) {
            if(schema.json == true) {
                typeRequest = "json"
                data = JSON.stringify(values)
            }
        }
        

        if(!typeRequest) {

            if(schema.hasOwnProperty('form_data') == true) {
                if(schema.form_data == true) {

                    typeRequest = "formData"
        
                    let fd = new FormData()
        
                    for(let index in values) {
                        fd.append(index, values[index])
                    }
        
                    data = fd
                }
            }
        }

        if(!typeRequest) {

            if(method == 'get') {
                params = values
            } else {
                data = Object.keys(values).map((value) => {
                    return value + "=" + values[value]
                }).join("&")
            }

        }
    }

    if(schema.hasOwnProperty('headers') == true) {
        headers = {
            ...schema.headers,
            ...headers
        }
    }

    if(schema.hasOwnProperty('mode') == true) {
        mode = schema.mode
    }

    if(schema.hasOwnProperty('cache') == true) {
        if(cached.includes(schema.cache) == true) {
            cache = schema.cache
        }
    }

    if(schema.hasOwnProperty('crossdomain') == true) {
        crossdomain = schema.crossdomain
    }

    if(typeRequest == 'json') {

        if(headers.hasOwnProperty('Content-type') == false) {
            setObj(headers, 'Content-type','application/json')
        }

        if(typeof(data) != 'string'){

            try {

                data = JSON.stringify(data)

            } catch(e) {

                data = ""

            }
            
        }


    }

    if(crossdomain == true ) {

        let requestParams = {
            method: method,
            url: url,
            body: data,
            headers: headers,
            params: params,
            mode: mode,
            cache: cache,
            crossdomain: crossdomain,
            withCredentials: withCredentials
        }

        let result = fetch(baseUrl + url, requestParams)
            .catch(error => {
                if (error.code === "ERR_NETWORK") {

                    throw new Error(error);
                }
                if (error.status === 401) {
                    throw error
                }
                throw error; 
            });
        return result

    } else {

        if(headers.hasOwnProperty('Cache-control') == false) {
            setObj(headers, 'Cache-control', cache)
        }

        let requestParams = {
            method: method,
            baseURL: baseUrl,
            url: url,
            data: data,
            headers: headers,
            params: params,
            mode: mode,
            crossdomain: crossdomain,
            withCredentials: withCredentials
        }

        let result = axios(requestParams)
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    throw error;
                }
                if (error.code === "ERR_NETWORK") {

                    throw new Error(error);
                }
            });;

        return result

    }

}