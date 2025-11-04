export const set = (index, value) => {
    if (typeof window !== "undefined") {
        window["cache_"+ index] = value
    }
}

export const get = (index) => {
    if (typeof window !== "undefined") {
        return window["cache_"+ index]
    }
}

export const remove = (index) => {
    if (typeof window !== "undefined") {
        delete window["cache_"+ index]
    }
}

export const exists = (index) => {
    if (typeof window !== "undefined") {
        return typeof (get(index)) != 'undefined'
    }
}
