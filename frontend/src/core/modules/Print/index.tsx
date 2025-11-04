export const onPrint = () => {
    if (typeof (window) != 'undefined') {
        window.print()
    }
}