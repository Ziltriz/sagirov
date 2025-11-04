
export const prepareImage = (item) => {

    item = [...item]

    return item.filter((file) => {

        if(!(file instanceof File)) {

            if(file.hasOwnProperty('variant') == true) {
                return file.variant == 'origin'
            }

        }
        
        return true;

    })

}