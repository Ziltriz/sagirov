export const onShare = (router, store, value) => {

    if (typeof (window) != 'undefined' && typeof (document) != 'undefined') {

        let input = document.createElement('input');
        input.setAttribute('value', window.location.origin + router.asPath);
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        store.states.error = 'Ссылка скопирована'

    }


}