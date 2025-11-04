import { TimeInput } from '@mantine/dates';
import { TextInput, Checkbox, Box, Popover } from '@mantine/core';
import { useState, useEffect } from 'react'
import { useI18n } from 'next-localization';
import { IconChevronDown,IconChevronUp  } from '@tabler/icons-react';

import { set as setObj } from '@/core/modules/Object'
import { schemaGetToPath } from '@/core/modules/Form'

import Classes from '@/core/styles/modules/days_week_time.module.scss'

import IconTime from '@/core/components/icons/time'

import Config from '@/config'

export default ({
    key,
    index,
    positionIndex = undefined,
    parentIndex = undefined,
    form,
    variant,
    label,
    disabled,
    required,
    placeholder,
    valueFormat,
    value = {},
    description
}) => {

    const i18n = useI18n();

    const [init, setInit] = useState(false);

    const [statePopover, setStatePopover] = useState(false);

    const [stateWeekList, setStateWeekList] = useState(false);

    const [stateWeekListEveryDay, setStateWeekListEveryDay] = useState(false);

    const [stateWeekTime, setStateWeekTime] = useState(false);

    const [stateTimeout, setStateTimeout] = useState(false);

    const [data, setData] = useState(value);

    const [weekList, setWeekList] = useState((Config.hasOwnProperty('week_list') == true ? Config.week_list.split(',') : []));

    const [weekListEveryday, setWeekListEveryday] = useState((Config.hasOwnProperty('week_list_evereday') == true ? Config.week_list_evereday : false));

    const formIndex = (parentIndex != undefined ? parentIndex + '.' + (positionIndex != undefined ? positionIndex + "." : "") + index : index)

    useEffect(() => {

        if (init == false) {

            let list = {},
                time = {
                    start: '',
                    finish: ''
                },
                timeout = '';

            if (weekList.length > 0) {

                weekList.forEach(key => setObj(list, key.trim(), false));

                if (data.hasOwnProperty('week_list') == true) {

                    if (Object.keys(data.week_list).length > 0) {
                        for (let key in data.week_list) {
                            list[key] = data.week_list[key]
                        }
                    }

                }

            }

            if (data.hasOwnProperty('week_time') == true) {

                if (data.week_time.hasOwnProperty('start') == true) {
                    time.start = data.week_time.start
                }

                if (data.week_time.hasOwnProperty('finish') == true) {
                    time.finish = data.week_time.finish
                }

            }

            if (data.hasOwnProperty('timeout') == true) {
                timeout = data.timeout
                setStateTimeout(data.timeout)
            }

            setData({ ...{ week_list: list }, ...{ week_time: time }, ...{timeout: timeout} });
            setStateWeekListEveryDay(Object.values(list).filter(value => value === true).length == weekList.length);
            setInit(true)

        }

    })

    useEffect(() => {

        if (Object.keys(data).length > 0) {

            let formElement = schemaGetToPath(form.values, formIndex);

            if (typeof (formElement) != 'undefined') {

                let weekListText = weekListValue(),
                    weekTimeText = weekTimeValue()
                
                form.setFieldValue(formIndex, {
                    ...data,
                    ...{
                        value: weekListText + (weekListText.length > 0 && weekTimeText.length > 0 ? ', ' : '') + weekTimeText
                    }
                });

            }

        }

    }, [data])

    const weekListValue = () => {

        let result = [];

        if (data.hasOwnProperty('week_list') == true) {

            if (Object.keys(data.week_list).length > 0) {



                let first = undefined,
                    last = undefined,
                    week_list_array = Object.keys(data.week_list)


                week_list_array.forEach((key, index) => {

                    if (data.week_list[key] == true) {

                        if (first == undefined || index < first) {
                            first = index
                        }

                        if (last == undefined && first != index || last < index && first != index) {
                            last = index
                        }
                    }

                })

                if (first != undefined) {
                    result.push(weekListLabel(week_list_array[first], true))
                }

                if (last != undefined) {
                    result.push(weekListLabel(week_list_array[last], true))
                }



            }

            return result.filter(value => value).join('-')

        }

        return ""

    }

    const weekListEveryDayClick = () => {

        if (data.hasOwnProperty('week_list') == true) {

            let tmpData = { ...data }

            for (let key in data.week_list) {
                if (data.week_list[key] == (stateWeekListEveryDay == false ? false : true)) {
                    tmpData.week_list[key] = (stateWeekListEveryDay == true ? false : true)
                }
            }

            setStateWeekListEveryDay((stateWeekListEveryDay == false ? true : false))
            setData(tmpData)

        }

    }

    const weekListLabel = (key, short = false) => {

        if (key.length > 0) {

            let text = i18n.t(`week_list${(short == true ? '.short' : "")}.${key.trim()}`)

            return (!text ? key : text)

        }

    }

    const weekListClick = (event, key) => {

        if (data.hasOwnProperty('week_list') == true) {

            if (data.week_list.hasOwnProperty(key) == true) {

                let tmpData = { ...data }

                tmpData.week_list[key] = !data.week_list[key]

                if (stateWeekListEveryDay == true) {
                    setStateWeekListEveryDay(false)
                }

                setData(tmpData)

            }

        }

    }

    const weekTimeValueStart = () => {

        let start = ""

        if (data.hasOwnProperty('week_time') == true) {

            if (data.week_time.hasOwnProperty('start') == true) {
                start = data.week_time.start
            }

        }

        return start

    }

    const weekTimeValueFinish = () => {

        let finish = ""

        if (data.hasOwnProperty('week_time') == true) {

            if (data.week_time.hasOwnProperty('finish') == true) {
                finish = data.week_time.finish
            }

        }

        return finish

    }

    const weekTimeValue = () => {

        let start = weekTimeValueStart(),
            finish = weekTimeValueFinish()

        if (start.length > 0 && finish.length > 0) {
            return [start, finish].join(' - ')
        }

        return ""

    }

    const weekTimeChange = (event, position) => {

        if (data.hasOwnProperty('week_time') == true) {

            let tmpData = { ...data }

            switch (position) {

                case 'start':
                    if (data.week_time.hasOwnProperty('start') == true) {
                        tmpData.week_time.start = event.target.value
                    }
                    break;
                case 'finish':
                    if (data.week_time.hasOwnProperty('finish') == true) {
                        tmpData.week_time.finish = event.target.value
                    }
                    break;

            }

            setData(tmpData)

            

        }

    }

    const weekListTimeoutValue =  () => {

        if(data.hasOwnProperty('timeout') == true) {
            return data.timeout
        }

    }

    const weekListTimeoutChange = (event) => {

        if(data.hasOwnProperty('timeout') == true) {
            let tmpData = {...data}
            tmpData.timeout = event.target.value
            setData(tmpData)
        }

    }

    let placeholder_week_list = i18n.t(`week_list.placeholder`)

    if(placeholder_week_list.length == 0) {
        placeholder_week_list = 'placeholder_week_list'
    }

    let weekListInputIcon = (stateWeekList ? <IconChevronUp className={Classes.week_list_inputicon} /> : <IconChevronDown className={Classes.week_list_inputicon} />)

    let week_list = (
        <Box key={"week_list_wrapper"} className={Classes.week_list_wrapper}>
            <Popover opened={stateWeekList} width="target" id={index} position="bottom" withArrow={false} onClose={() => {setStateWeekList(false)}}>
                <Popover.Target>
                    <TextInput
                        className={Classes.week_list_input}
                        key={"week_list_input"}
                        value={weekListValue()}
                        onClick={(event) => { setStateWeekList(true) }}
                        onFocus={(event) => ( event.target.blur() )}
                        placeholder={placeholder_week_list}
                        rightSection={weekListInputIcon}
                        readonly={true}
                    />
                </Popover.Target>
                <Popover.Dropdown>
                    <Box key={"week_list_dropdown"} className={Classes.week_list_dropdown}>
                        {weekListEveryday == true ? (
                            <Box key={"week_list_dropdown_item_everyday"} className={Classes.week_list_dropdown_item}>
                                <Checkbox
                                    key={"week_list_checkbox_everyday"}
                                    className={Classes.week_list_checkbox}
                                    label={i18n.t(`week_list.everyday`)}
                                    checked={stateWeekListEveryDay}
                                    onChange={weekListEveryDayClick}
                                />
                            </Box>
                        ) : ''}
                        {Object.keys((data.hasOwnProperty('week_list') == true ? data.week_list : {})).map((key) => {
                            return (
                                <Box key={"week_list_dropdown_item" + key} className={Classes.week_list_dropdown_item}>
                                    <Checkbox
                                        key={"week_list_checkbox_everyday_" + key}
                                        className={Classes.week_list_checkbox}
                                        label={weekListLabel(key)}
                                        checked={data.week_list[key]}
                                        onChange={event => weekListClick(event, key)}
                                    />
                                </Box>
                            )
                        })}
                    </Box>

                </Popover.Dropdown>
            </Popover>
        </Box>
    )

    let times = (
        <Box key={"week_time_wrapper"} className={Classes.week_time_wrapper}>
            <Popover opened={stateWeekTime} width="target" id={index} position="bottom" withArrow={false} onClose={() => {setStateWeekTime(false)}}>
                <Popover.Target>
                    <TextInput
                        className={Classes.week_time_input}
                        key={"week_time_input"}
                        value={weekTimeValue()}
                        onClick={(event) => { setStateWeekTime(true)} }
                        onFocus={(event) => ( event.target.blur() )}
                        placeholder={"00:00 - 00:00"}
                        readonly={true}
                    />
                </Popover.Target>
                <Popover.Dropdown>
                    <Box key={"week_time_items"} className={Classes.week_time_items}>
                        <Box key={"week_time_item"} className={Classes.week_time_item}>
                            <TimeInput
                                className={Classes.week_time_item_input}
                                key={"week_time_item_input"}
                                onChange={event => weekTimeChange(event, 'start')}
                                placeholder={"--:--"}
                                rightSection={<IconTime className={Classes.week_time_item_inputicon} />}
                            />
                        </Box>
                        <Box key={"week_time_item"} className={Classes.week_time_item}>
                            <TimeInput
                                className={Classes.week_time_item_input}
                                key={"week_time_item_input"}
                                onChange={event => weekTimeChange(event, 'finish')}
                                placeholder={"--:--"}
                                rightSection={<IconTime className={Classes.week_time_item_inputicon} />}
                            />
                        </Box>
                    </Box>
                </Popover.Dropdown>
            </Popover>
        </Box>
    )

    let timeout = (
        <Box key={"week_list_timeout"} className={Classes.week_list_timeout}>
            <Checkbox
                key={"week_list_checkbox_timeout"}
                className={Classes.week_list_checkbox_timeout}
                label={i18n.t(`timeout`)}
                checked={stateTimeout}
                onChange={event => setStateTimeout(!stateTimeout)}
            />
            {stateTimeout ? 
                <TextInput
                    key={"week_list_input_timeout"}
                    className={Classes.week_list_input_timeout}
                    value={weekListTimeoutValue()}
                    onChange={event => weekListTimeoutChange(event)}
                />
            : ""}
        </Box>
    )

    let weekListText = weekListValue(),
        weekTimeText = weekTimeValue()

    return (

        <Popover opened={statePopover} width="target" id={index} position="bottom-start" withArrow={false}>
            <Popover.Target>
                <TextInput
                    variant={variant}
                    label={label}
                    disabled={disabled}
                    required={required}
                    withAsterisk={false}
                    withErrorStyles
                    placeholder={placeholder}
                    description={description}
                    key={index}
                    onClick={(event) => { setStatePopover(!statePopover) }}
                    onFocus={(event) => ( event.target.blur() )}
                    value={weekListText + (weekListText.length > 0 && weekTimeText.length > 0 ? ', ' : '') + weekTimeText}
                    rightSection={<IconTime className={Classes.week_common_inputicon} />}
                />
            </Popover.Target>
            <Popover.Dropdown>

                <Box key={"week_wrapper"} className={Classes.week_wrapper}>
                    {week_list}
                    {times}
                    {timeout}
                </Box>

            </Popover.Dropdown>
        </Popover>


    )

}