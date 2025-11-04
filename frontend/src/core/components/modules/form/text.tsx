import { useState } from 'react'
import { TextInput, Autocomplete as MAutocomplete, ComboboxItem, OptionsFilter } from '@mantine/core';
import { useI18n } from 'next-localization';
import { IMaskInput } from 'react-imask';
import { useEventListener } from '@mantine/hooks';

import Autocomplete from '@/core/modules/Autocomplete'
import Suggestion from '@/core/modules/Suggestion'


export default ({
    name,
    mask,
    value,
    index,
    positionIndex = undefined,
    parentIndex = undefined,
    form,
    variant,
    label,
    required,
    disabled,
    placeholder,
    description,
    callbacks = {},
    onSet = (key, values) => {

    }
}) => {

    const i18n = useI18n();

    const formIndex = (parentIndex != undefined ? parentIndex + '.' + (positionIndex != undefined ? positionIndex + "." : "") + index : index)

    const [suggestion, setSuggetion] = useState([]);

    const [suggestionDetail, setSuggestionDetail] = useState({});

    const optionsFilter: OptionsFilter = ({ options, search }) => {
        const splittedSearch = search.toLowerCase().trim().split(' ');
        return (options as ComboboxItem[]).filter((option) => {
          const words = option.label.toLowerCase().trim().split(' ');
          return splittedSearch.every((searchWord) => words.some((word) => word.includes(searchWord)));
        });
      };
      
    const onKeyUp = (event) => {

        if (typeof (form) != 'undefined') {

            if (callbacks.hasOwnProperty('autocomplete') == true) {

                Autocomplete(
                    callbacks.autocomplete,
                    form,
                    formIndex,
                    event.currentTarget.value,
                    (callbacks.hasOwnProperty('autocomplete_timeout_time') == true ? callbacks.autocomplete_timeout_time(formIndex) : 500)
                )

            } else if (callbacks.hasOwnProperty('suggestion') == true) {

                Suggestion(
                    callbacks.suggestion,
                    form,
                    formIndex,
                    event.currentTarget.value,
                    setSuggetion,
                    setSuggestionDetail
                )

            }

        }

    }

    const onChange = (event) => {

        if (typeof (form) != 'undefined') {
            form.setFieldValue(formIndex, event.target.value)
        }

        if (typeof (onSet) == 'function') {
            onSet(formIndex, event.target.value)
        }

    }

    const onChangeSuggestion = (value) => {

        if(typeof(value) == 'string') {
            
            if (typeof (form) != 'undefined') {
                form.setFieldValue(formIndex, value)
            }
    
            if (typeof (onSet) == 'function') {
                onSet(formIndex, value)
            }

            if (callbacks.hasOwnProperty('suggestionSet') == true) {

                if(callbacks.suggestionSet.hasOwnProperty(formIndex) == true) {
                    callbacks.suggestionSet[formIndex](form, formIndex, value, suggestionDetail)
                }

            }

        }

    }

    if (callbacks.hasOwnProperty('autocomplete') == true || callbacks.hasOwnProperty('suggestion') == true) {

        if (callbacks.hasOwnProperty('suggestion') == true) {

            return (
                <MAutocomplete
                    ref={useEventListener('keyup', onKeyUp)}
                    variant={variant}
                    label={label}
                    disabled={disabled}
                    required={required}
                    withAsterisk={false}
                    withErrorStyles
                    placeholder={placeholder}
                    description={description}
                    key={formIndex}
                    {...(typeof (form) != "undefined" ? form.getInputProps(formIndex) : {
                        value: value
                    })}
                    onCut={onChangeSuggestion}
                    onPaste={onChangeSuggestion}
                    onChange={onChangeSuggestion}
                    data={suggestion}
                    filter={optionsFilter}
                />
            )

        } else {

            return (
                <TextInput
                    ref={useEventListener('keyup', onKeyUp)}
                    variant={variant}
                    label={label}
                    disabled={disabled}
                    required={required}
                    withAsterisk={false}
                    withErrorStyles
                    placeholder={placeholder}
                    description={description}
                    key={formIndex}
                    {...(typeof (form) != "undefined" ? form.getInputProps(formIndex) : {
                        value: value
                    })}
                    onCut={onChange}
                    onPaste={onChange}
                    onChange={onChange}
                />
            )

        }


    } else {

        return (
            <TextInput
                component={IMaskInput}
                mask={mask}
                variant={variant}
                label={label}
                disabled={disabled}
                required={required}
                withAsterisk={false}
                withErrorStyles
                placeholder={placeholder}
                description={description}
                key={formIndex}
                {...(typeof (form) != "undefined" ? form.getInputProps(formIndex) : {
                    value: value
                })}
                onCut={onChange}
                onPaste={onChange}
                onChange={onChange}
            />
        )

    }



}