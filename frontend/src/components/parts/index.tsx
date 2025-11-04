import {
    Title as MTitle,
    Button as MButton,
    NavLink as MNavLink,
    Anchor as MAnchor
} from '@mantine/core'

export const Anchor = ({ props, text, href, target, onClick, className, variant, iconLeft }) => {

    return (
        <MAnchor className={className} href={href} target={target} onClick={onClick} variant={variant}>{iconLeft} {text}</MAnchor>
    )

}

export const Title = ({ props, text, order, className, variant }) => {


    return (
        <MTitle className={className} order={order} variant={variant}>{text}</MTitle>
    )

}

export const Button = ({ text, type, className, variant, onClick }) => {

    return (
        <MButton onClick={onClick} className={className} type={type} variant={variant}>{text}</MButton>
    )

}

export const NavLink = ({ label, onClick, iconLeft, className, variant }) => {

    return (
        <MNavLink className={className} label={label} onClick={onClick} leftSelection={iconLeft} variant={variant} />
    )

}