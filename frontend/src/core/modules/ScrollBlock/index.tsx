export const scrollBlock = (event) => {

    let from = event.target

    let href = from.getAttribute('data-scroll-name')

    if (href) {

        let to = document.querySelector(`[data-scroll="${href}"]`);

        if (to) {

            var hrefs = document.querySelectorAll('[data-scroll-active]');

            if(hrefs.length > 0) {
                hrefs.forEach((item) => {
                    item.removeAttribute('data-scroll-active');
                })
            }

            from.setAttribute('data-scroll-active', 'true')

            to.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        }

    }

}
