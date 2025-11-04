const month = {
    "ru": {
        "s": {
            1: "января",
            2: "февраля",
            3: "марта",
            4: "апреля",
            5: "мая",
            6: "июня",
            7: "июля",
            8: "августа",
            9: "сентября",
            10: "октября",
            11: "ноября",
            12: "декабря"
        }
    }

};
export const lastTime = (value) => {

    if (typeof value === "string") {

        let postfix = ''
        let diff = parseInt((new Date().getTime() - new Date(value).getTime()) / 1000)

        if (diff < 60) {

            postfix = 'секунд'

        } else if (diff < 60 * 60) {

            diff = parseInt(diff / 60)

            postfix = (diff == 1 ? 'минуту' : (diff < 5 ? 'минуты' : 'минут'))

        } else if (diff < 60 * 60 * 24) {

            diff = parseInt(diff / 60 / 60)

            postfix = (diff == 1 ? 'час' : (diff < 5 ? 'часа' : 'часов'))

        } else {

            diff = parseInt(diff / 60 / 60 / 24)

            postfix = (diff == 1 ? 'день' : (diff < 5 ? 'дня' : 'дней'))
        }

        return diff + ' ' + postfix

    }

}

export const dateCustom = (value) => {

    if (typeof value === "string") {

        if (value.length > 0) {

            let date = new Date(value)

            return date.getDate() + ' ' + month['ru'].s[date.getMonth() + 1] + ', ' + date.getFullYear()

        }

    }

}

export const dateLocale = (value) => {

    if (typeof value === "string") {

        if (value.length > 0) {

            let date = new Date(value)

            return date.toLocaleDateString()

        }

    }

}

export const dateTimeLocale = (value) => {

    if (typeof value === "string") {

        if (value.length > 0) {

            let date = new Date(value)

            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()

        }

    }

}

export const dateLocaleToTimestamp = (value) => {

    if (typeof value === "number") {

        let date = new Date(value * 1000)

        return date.toLocaleDateString()

    }

}

export const dateTimeLocaleToTimestamp = (value) => {

    if (typeof value === "number") {

        let date = new Date(value * 1000)

        return date.toLocaleDateString() + " " + date.toLocaleTimeString()

    }

}

export const dateTimeOnDateRequest = (value) => {

    if (value instanceof Date) {

        let date = value

        let day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear(),
            minute = date.getMinutes(),
            hour = date.getHours(),
            second = date.getSeconds()

        return (
            (String(year).length == 1 ? '0' : '') + year + '-' +
            (String(month).length == 1 ? '0' : '') + month + '-' +
            (String(day).length == 1 ? '0' : '') + day + ' ' +
            (String(hour).length == 1 ? '0' : '') + hour + ':' +
            (String(minute).length == 1 ? '0' : '') + minute + ':' +
            (String(second).length == 1 ? '0' : '') + second
        )

    }

}

export const dateTimeRequest = (value) => {

    if (typeof value === "string") {

        if (value.length > 0) {

            let date = new Date(value)

            let day = date.getDate(),
                month = date.getMonth() + 1,
                year = date.getFullYear(),
                minute = date.getMinutes(),
                hour = date.getHours(),
                second = date.getSeconds()

            return (
                (String(year).length == 1 ? '0' : '') + year + '-' +
                (String(month).length == 1 ? '0' : '') + month + '-' +
                (String(day).length == 1 ? '0' : '') + day + ' ' +
                (String(hour).length == 1 ? '0' : '') + hour + ':' +
                (String(minute).length == 1 ? '0' : '') + minute + ':' +
                (String(second).length == 1 ? '0' : '') + second
            )

        }

    }

}

export const dateTime = (value) => {

    if (typeof value === "string") {

        if (value.length > 0) {

            let date = new Date(value)

            let day = date.getDate(),
                month = date.getMonth() + 1,
                year = date.getFullYear(),
                minute = date.getMinutes(),
                hour = date.getHours(),
                second = date.getSeconds()

            return (
                (String(day).length == 1 ? '0' : '') + day + '.' +
                (String(month).length == 1 ? '0' : '') + month + '.' +
                (String(year).length == 1 ? '0' : '') + year + ' ' +
                (String(minute).length == 1 ? '0' : '') + minute + ':' +
                (String(hour).length == 1 ? '0' : '') + hour + ':' +
                (String(second).length == 1 ? '0' : '') + second
            )

        }

    }

}

export const compareDate = (value1, value2) => {

    if (typeof (value1) != 'undefined' && typeof (value2) != 'undefined') {

        try {

            value1 = new Date(value1);
            value1.setHours(Math.abs(value1) / 60);
            value1.setMinutes(0);
            value1.setSeconds(0);
            value1 = value1.getTime() / 1000;

            value2 = new Date(value2);
            value2.setHours(Math.abs(value1) / 60);
            value2.setMinutes(0);
            value2.setSeconds(0);
            value2 = value2.getTime() / 1000;

            return value1 != value2

        } catch (e) {

            console.error(e);

        }

    }

}

export const compareDateTime = (value1, value2) => {


    if (typeof value1 != 'undefined' && typeof value2 != 'undefined') {

        try {

            value1 = new Date(value1).getTime() / 1000;
            value2 = new Date(value2).getTime() / 1000;

            return value1 != value2

        } catch (e) {

            console.error(e);

        }

    }

}

export const getTimestamp = () => {

    return new Date().getTime() / 1000

}