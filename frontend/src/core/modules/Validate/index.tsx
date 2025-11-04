import ErrorText from '@/core/components/error_text'

export const avtoValidate = (value) => {
    return ( /^(а|в|е|к|м|н|о|р|с|т|у|х|А|В|Е|К|М|Н|О|Р|С|Т|У|Х){1}[0-9]{3}(а|в|е|к|м|н|о|р|с|т|у|х|А|В|Е|К|М|Н|О|Р|С|Т|У|Х){2}[0-9]{2,3}$/.test(value) ? null : <ErrorText code="avto" />)
}

export const emailValidate  = (value) => {

    return ( /^\S+@\S+$/.test(value) ? null : <ErrorText code="email" />)

}

export const passwordValidate  = (value) => {

    return ( String(value).length >= 8 ? null : <ErrorText code="password" /> )
    
}

export const passwordConfirmValidate  = (value, value2) => {

    return (value == value2 ? null : <ErrorText code="password_confirm" />)
    
}

export const phoneValidate  = (value) => {

    return (/^\d{11}$/.test(value) ? null : <ErrorText code="phone" />)
    
}

export const lenghtNotNullValidate = (value) => {

    return ( String(value).length >=1 ? null : <ErrorText code="not_null" />)

}

export const driverLicenseValidate = (value) => {

    return ( String(value).length == 10 ? null : <ErrorText code="driver_license" />)

}

export const dateLenghtNotNullValidate = (value) => {

    try {

        return new Date(value).toLocaleString().length < 0

    } catch(e) {

        return true

    }
    
}
