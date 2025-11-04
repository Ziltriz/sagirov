const prefixes = ['Webkit', 'Moz', 'ms', 'O'];

export const setStyleElement = (name, value, element) => {

    if(element instanceof HTMLElement) {

        element.style[name] = value

        prefixes.forEach((prefix) => {
            element.style[prefix + name.substr(0,1).toUpperCase() + name.substr(1)] = value
        });

    }

    

}