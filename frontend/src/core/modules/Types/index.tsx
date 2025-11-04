export const isInt = (value) => {
    return typeof value == "number" && value.toString.indexOf('.')+1 == 0
}

export const isFloat = (value) => {
    return typeof value == "number" && value.toString.indexOf('.')+1 != 0
}

export const isString = (value) => {
    return typeof value == "string"
}

export const isUndefined = (value) => {
    return typeof value == "undefined"
}

export const isNan = (value) => {
    return isNan(value)
}

export const isArray = (value) => {
    return Array.isArray(value)
}

export const isObject = (value) => {
    return typeof value == "object" && typeof value.length == 'undefined'
}

export const isFunction = (value) => {
    return typeof value == "function"
}
export const isNumeric = (value) => {
    return /^\d+$/.test(value);
}

export const type = (value) =>{

    let type = typeof(value)

    return (isArray(value) == true ? 'array': type )

}