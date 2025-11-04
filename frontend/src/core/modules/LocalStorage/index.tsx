export const set = (index, value) => {

    if (typeof window !== "undefined") {

        localStorage.setItem(index, value)

    }

}

export const get = (index) => {

    if (typeof window !== "undefined") {

        return localStorage.getItem(index)

    }

}

export const remove = (index) => {

    if (typeof window !== "undefined") {
        localStorage.removeItem(index)
    }

}

export const clear = () => {

    if (typeof window !== "undefined") {
        localStorage.clear()
    }

}

export const exists = (index) => {

    if (typeof window !== "undefined") {
        return typeof (localStorage.getItem(index)) != 'undefined'
    }

}
