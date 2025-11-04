import { useState, useEffect } from 'react'
import { useI18n } from 'next-localization';

import { getAccessToken } from '@/core/models/User'
import { httpRequestAuth } from '@/core/modules/Http'

import Switch from '@/core/components/parts/setting/switch'
import Text from '@/core/components/parts/setting/text'
import Textarea from '@/core/components/parts/setting/textarea'

export default ({
    schemaAdd,
    schemaEdit,
    schemaDetail,
    index,
    view_label = false,
    view_labelGroup = false,
    type,
    variant = 'setting-item',
    onPrepare
}) => {

    if(typeof(schemaAdd) != 'undefined' && typeof(schemaEdit) != 'undefined' && typeof(schemaDetail) != 'undefined') {

        const i18n = useI18n();

        const [init, setInit] = useState(false);

        const [code, setCode] = useState(index);

        const [value, setValue] = useState('');

        const [checked, setChecked] = useState(false);

        const [action, setAction] = useState('add');

        useEffect(() => {

            if (init == false) {

                let result = httpRequestAuth(schemaDetail, getAccessToken(), {
                    code: index
                })

                result.then((data) => {

                    if (data.data.hasOwnProperty('item') == true) {

                        if(typeof(data.data.item) == 'object') {

                            if(data.data.item.hasOwnProperty('code') == true && data.data.item.hasOwnProperty('value') == true) {
                                setCode(data.data.item.code)
                                setValue(data.data.item.value)
                                setChecked(data.data.item.value)
                            }

                        }
                        
                        
                        
                    }

                    setAction('edit')
                    setInit(true)

                }, (error) => {

                    setAction('add');
                    setInit(true)

                })

            }

        });

        const prepareRequest = (value) => {

            if (typeof onPrepare == 'function') {

                return onPrepare(value)

            } else {

                if (action == 'add') {

                    return {
                        code: code,
                        type: type,
                        value: value.toString()
                    }


                } else {

                    return {
                        code: code,
                        type: type,
                        value: value.toString()
                    }

                }

            }

        }

        const request = (value) => {

            let result = httpRequestAuth((action == 'add' ? schemaAdd : schemaEdit), getAccessToken(), prepareRequest(value))

            return result.then((data) => {

                if(data.data.hasOwnProperty('success') == true) {

                    if(action == 'add') {

                        if(data.data.hasOwnProperty('success') == true) {
                            setAction('edit')
                        }

                    }

                }

                return data

            }, (error) => {

                //console.error(error);

            })

        }

        if (init == true) {

            let label = i18n.t(`setting.${index}`),
                placeholder = ''

            if (i18n.t(`setting.placeholders.${index}`)) {
                placeholder = i18n.t(`setting.placeholders.${index}`);
            } else {
                placeholder = i18n.t(`setting.${index}`);
            }

            if(!label) {
                label = index 
            }

            variant = `${variant}-${type}`;

            if (type == 'switch') {

                return (
                    <Switch
                        key={index}
                        value={checked}
                        view_labelGroup={view_labelGroup}
                        labelGroup={label}
                        label={placeholder}
                        index={index}
                        variant={variant}
                        schema={(action == 'add' ? schemaAdd : schemaEdit)}
                        prepareRequest={prepareRequest}
                        onRequest={request}
                    />
                )

            } else if (type == 'text') {
                return (
                    <Text
                        key={index}
                        itemValue={value}
                        label={label}
                        view_label={view_label}
                        placeholder={placeholder}
                        index={index}
                        variant={variant}
                        onRequest={request}
                    />
                )
            } else if (type == 'textarea') {
                return (
                    <Textarea
                        key={index}
                        itemValue={value}
                        label={label}
                        view_label={view_label}
                        placeholder={placeholder}
                        index={index}
                        variant={variant}
                        onRequest={request}
                    />
                )
            }

        }
    }

}