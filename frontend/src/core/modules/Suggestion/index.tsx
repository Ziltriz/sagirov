import { set as setObj } from '@/core/modules/Object'
import { isNumeric } from '@/core/modules/Types'
import { parseIndex } from '@/core/modules/Form'

var completeTimeout = {}

export default (suggestionObject, form, index, value, setSuggestion = () => {}, setSuggestionDetail = () => { }, timeoutTime = 500) => {

    if(typeof(suggestionObject) == 'object' && index.length > 0) {

        if(completeTimeout.hasOwnProperty(index) == true){
            clearTimeout(completeTimeout[index]);
            delete completeTimeout[index]
        }

        return setObj(completeTimeout, index, setTimeout(() => {

            var parts = parseIndex(index)

            if(typeof(parts) != 'undefined') {

                parts.parts.concat([parts.current]).forEach((part) => {

                    if(isNumeric(part) == false) {

                        if(suggestionObject.hasOwnProperty(part) == true) {
                            suggestionObject = suggestionObject[part]
                        } else {
                            suggestionObject = undefined
                        }

                    }

                })

            } else {

                if(suggestionObject.hasOwnProperty(index) == true) {
                    suggestionObject = suggestionObject[index]
                } else {
                    suggestionObject = undefined
                }

            }

            if(typeof(suggestionObject) == "function") {
                if(typeof(value) == 'string'){

                    if(value.length > 0) {
                        suggestionObject(form, index, value, setSuggestion, setSuggestionDetail)
                    } else {
                        setSuggestion([])
                        setSuggestionDetail({})
                    }

                }
                
            }
            
            delete completeTimeout[index]

        }, timeoutTime,))
        

    }
    
}