
import { set as setObj } from '@/core/modules/Object'
import { isNumeric } from '@/core/modules/Types'
import { parseIndex } from '@/core/modules/Form'

var completeTimeout = {}

export default (autocompleteObject, form, index, value, timeoutTime = 500) => {

    if(typeof(autocompleteObject) == 'object' && index.length > 0) {

        if(completeTimeout.hasOwnProperty(index) == true){
            clearTimeout(completeTimeout[index]);
            delete completeTimeout[index]
        }

        setObj(completeTimeout, index, setTimeout(() => {

            var parts = parseIndex(index)

            if(typeof(parts) != 'undefined') {

                parts.parts.concat([parts.current]).forEach((part) => {

                    if(isNumeric(part) == false) {

                        if(autocompleteObject.hasOwnProperty(part) == true) {
                            autocompleteObject = autocompleteObject[part]
                        } else {
                            autocompleteObject = undefined
                        }

                    }

                })

            } else {

                if(autocompleteObject.hasOwnProperty(index) == true) {
                    autocompleteObject = autocompleteObject[index]
                } else {
                    autocompleteObject = undefined
                }

            }

            if(typeof(autocompleteObject) == "function") {
                autocompleteObject(form, index, value)
            }
            
            delete completeTimeout[index]

        }, timeoutTime))
        

    }
    
}