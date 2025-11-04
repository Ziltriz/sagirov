export const cloneDelLinks  = (obj) => {

    return Object.assign(obj)

}
export const set = (obj, index, value, options = {}) => {

    Object.defineProperty(obj, index,{
        writable: (has(options, 'writable') == true ? options.writable : true),
        configurable: (has(options, 'configurable') == true ? options.configurable : true),
        enumerable: (has(options, 'enumerable') == true ? options.enumerable : true),
        value: value
    })

    return obj

}

export const update = (obj, index, value) => {

    if(has(obj, index) == true) {
        obj[index] = value
    }

    return obj

}

export const remove = (obj, index) => {

    if(has(obj, index) == true) {
        delete obj[index]
    }

    return obj

}

export const has = (obj, index) => {

    return obj.hasOwnProperty(index)

}

export const sortByArrKeys = (obj, arr) => {

    if(typeof(obj) == 'object' && Array.isArray(arr) == true) {

        if(Object.keys(obj).length > 0 && arr.length > 0) {

            let newObject = {}

            arr.forEach((key) => {
                if(obj.hasOwnProperty(key) == true) {
                    set(newObject, key, obj[key])
                }
            })

            return newObject

        }
    
    }

    return obj

}