import { set as setObj, clone as cloneObj } from '@/core/modules/Object'
import { getAccessToken } from '@/core/models/User'
import { schemaPrepareValues, parseIndex, schemaGetToPath } from '@/core/modules/Form'
import { httpRequestAuth } from '@/core/modules/Http'

export const requestImage = (Schema, values, callbacks = {}) => {

    values = { ...values }

    let promises = []

    if (Schema.files.length > 0) {

        Schema.files.forEach((fileName) => {

            let fileInputs = [];

            let formElement = schemaGetToPath(values, fileName, true)

            if (typeof (formElement) != 'undefined') {

                if (fileName.indexOf('%index%') + 1 != 0) {

                    if (Array.isArray(formElement) == true) {

                        let fileParts = parseIndex(fileName)

                        if (formElement.length > 0) {

                            formElement.forEach((value, index) => {

                                if(value.hasOwnProperty(fileParts.current) == true) {
                                    fileInputs.push({
                                        index: fileName.replace('%index%', index),
                                        file: value[fileParts.current][0]
                                    });
                                }
                                
                            })

                        }

                    }

                } else {
                    fileInputs.push({
                        index: fileName,
                        file: formElement[0]
                    });
                }

            }

            if (fileInputs.length > 0) {
                fileInputs.forEach((fileInput) => {
                    promises.push(
                        requestSendImage(Schema, fileInput, callbacks)
                    );
                })

            }

        })

    }

    return Promise.all(promises)

}

const requestSendImage = (Schema, fileInput, callbacks = {}) => {

    return new Promise((resolve) => {

        if (fileInput.file instanceof File) {

            resolve(httpRequestAuth(Schema, getAccessToken(), {
                file: fileInput.file
            }, {}, callbacks).then((data) => {
                if (data.data.hasOwnProperty('id') == true) {
                    return setObj({}, fileInput.index, (callbacks.hasOwnProperty('requestSendImageFile') == true ? callbacks.requestSendImageFile(data.data) : data.data.id))
                }
            }, (error) => {
                console.log(error)
            }));

        } else if (typeof fileInput.file == 'object') {

            resolve(setObj({}, fileInput.index, (callbacks.hasOwnProperty('requestSendImageFileObject') == true ? callbacks.requestSendImageFileObject(fileInput.file) : fileInput.file.id)));

        } else {

            resolve(setObj({}, fileInput.index, ""))

        }

    })

}

export const requestIntoImage = (Schema, values, data = {}, callbacks = {}) => {

    return request(Schema, values, data, callbacks)

}

const prepareValuesRequestSend = (Schema, values) => {

    if (Schema.hasOwnProperty('send') == true) {

        for (let index in values) {

            if (Schema.send.includes(index) == false) {
                delete values[index];
            }

        }

    }

    if (Schema.hasOwnProperty('blocks') == true) {

        for (let index in Schema.blocks) {

            let block = Schema.blocks[index];

            if (block.hasOwnProperty('send') == true && values.hasOwnProperty(index) == true) {

                for (let subIndex in values[index]) {

                    let element = values[index][subIndex]

                    if (typeof (element) == 'object' && typeof (element.length) == 'undefined') {

                        for (let sub2Index in element) {

                            if (block.send.includes(sub2Index) == false) {
                                delete element[sub2Index];
                            }

                        }

                    } else {

                        if (block.send.includes(subIndex) == false) {
                            delete values[index][subIndex];
                        }

                    }

                }

            }

        }

    }

    return values

}

export const prepareValuesRequest = (Schema, values, data = {}, callbacks = {}) => {

    if (Object.keys(values).length > 0) {

        values = prepareValuesRequestSend(Schema, values);

    }

    return values

}

export const prepareValuesData = (Schema, values, data = {}, callbacks = {}) => {

    if (Object.keys(data).length > 0) {

        for (let index in data) {

            if (typeof data[index] == 'object') {

                for (let subIndex in data[index]) {

                    let parts = parseIndex(subIndex)

                    if (typeof (parts) != 'undefined') {

                        let objectSearch

                        parts = parts.parts.concat(parts.current);

                        parts.forEach((part, partIndex) => {
                            if (typeof (objectSearch) == 'undefined') {
                                if (values.hasOwnProperty(part) == true) {
                                    if (partIndex + 1 != parts.length) {
                                        objectSearch = values[part]
                                    } else {
                                        values[part] = data[index][subIndex]
                                    }
                                }
                            } else if (typeof (objectSearch[part]) != 'undefined') {
                                if (partIndex + 1 != parts.length) {
                                    objectSearch = objectSearch[part]
                                } else {
                                    objectSearch[part] = data[index][subIndex]
                                }
                            }
                        })


                    } else if (values.hasOwnProperty(subIndex) == true) {
                        values[subIndex] = data[index][subIndex]
                    }

                }
            } else if (values.hasOwnProperty(index) == true) {
                values[index] = data[index]
            }

        }

    }

    return values

}

export const request = (Schema, values, data = {}, callbacks = {}) => {

    values = { ...values }
    data = { ...data }

    values = prepareValuesData(Schema, {...values}, {...data}, callbacks)

    values = prepareValuesRequest(Schema, {...values}, {...data}, callbacks)

    if (callbacks.hasOwnProperty('prepareValuesRequest') == true) {
        values = callbacks['prepareValuesRequest'](Schema, {...values}, {...data})
    }
    
    return httpRequestAuth(Schema, getAccessToken(), schemaPrepareValues(Schema, {...values}, callbacks), {}, callbacks).then((data) => {
        return data
    }, (error) => {
        return error
    })

}