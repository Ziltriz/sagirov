import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import { useI18n } from 'next-localization';
import { useRouter as useRouterRouter } from 'next/router'
import { Flex, Box, Anchor, Code } from '@mantine/core'
import StickyBox from "react-sticky-box";

import PageView from '@/core/components/layouts/page-view'
import Classes from '@/styles/tasks/view.module.scss'
import { set as setObj } from '@/core/modules/Object'
import { isObject } from '@/core/modules/Types'
import IconDown from '@/core/components/icons/orderDown'

import { onShare } from '@/core/modules/Share'
import { scrollBlock } from '@/core/modules/ScrollBlock'

import { dataCustomizationRequest, dataCustomizationTask } from '@/util/task'

import { printItem } from '@/models/Tasks'

import Config from '@/config'


export default observer(({
    name,
    href,
    breadcrumps,
    store,
    onData,
    viewDataRequest,
    viewDataTask,
    viewDataTaskSecond,
    viewDataTaskThird,
    viewDataTaskFour,
    callbacks
}) => {

    const schema = (callbacks.hasOwnProperty('getSchemaPrint') ? callbacks['getSchemaPrint'](store) : undefined)

    if (schema != undefined) {

        const i18n = useI18n();

        const router = useRouterRouter();

        const [intervaTask, setIntervalTask] = useState(undefined)

        const [providerTask, setProviderTask] = useState("")

        const [stateTask, setStateTask] = useState(undefined)

        const [id, setId] = useState(undefined)

        const [dataTask, setDataTask] = useState(undefined)

        const [dataTaskDebugInfo, setDataTaskDebugInfo] = useState({})

        const [dataTaskDebugInfoOpen, setDataTaskDebugInfoOpen] = useState({})

        const [dataTaskDebug, setDataTaskDebug] = useState({})

        const [currentDataTask, setCurrentDataTask] = useState(undefined)

        const [dataTaskDebugInfoFilter, setDataTaskDebugInfoFilter] = useState('');

        const [dataSidebar, setDataSidebar] = useState({});

        var viewData = [];

        useEffect(() => {
            if (typeof (id) != 'undefined' && typeof (store.user.user) != 'undefined') {
                store.states.sidebar = false;
                loadTask()
            }
        }, [id])

        useEffect(() => {
            if (typeof (id) != 'undefined') {

                if (stateTask != 2) {

                    if (Config.autoReload == true) {

                        if (intervaTask == undefined) {
                            setIntervalTask(
                                setInterval(() => {
                                    loadTask()
                                }, Config.autoReloadInterval)
                            )
                        }

                    }

                } else {

                    if (intervaTask != undefined) {
                        clearInterval(intervaTask)
                        setInterval(undefined)
                    }

                }

            }
        }, [stateTask])

        useEffect(() => {

            if (typeof (providerTask) == 'string') {

                if (providerTask.length > 0) {

                    let tmpData = undefined,
                        tmpDataTaskDebug = dataTaskDebug,
                        tmpDataSidebar = {}

                    if (dataTask.data.hasOwnProperty('provider') == true) {

                        let providers = providerTask.split(',').reverse(),
                            search = false

                        providers.forEach((item) => {

                            if (!search) {

                                if (dataTask.data.provider.hasOwnProperty(item) == true) {

                                    if (typeof (dataTask.data.provider[item]) == 'object') {

                                        let provider = { ...dataTask.data.provider[item] }

                                        if (provider.hasOwnProperty('data') == true) {

                                            search = true

                                            tmpData = provider['data']

                                            if (provider.hasOwnProperty('uniq_sources') == true) {

                                                setDataTaskDebugInfo(provider['uniq_sources'])

                                                Object.keys(provider['uniq_sources']).forEach((subItem) => {
                                                    provider['uniq_sources'][subItem].forEach((sub2Item, index) => {

                                                        let label = taskInfoDebugSourceGetLabel(sub2Item, subItem)

                                                        if (label) {
                                                            setObj(tmpDataSidebar, label + subItem + index, label)
                                                        }
                                                    })
                                                })

                                                setDataSidebar(tmpDataSidebar)
                                            }

                                            if (provider.hasOwnProperty('uniq_used_keys') == true) {
                                                if (Array.isArray(provider.uniq_used_keys) == true) {
                                                    setObj(tmpDataTaskDebug, 'used_keys', provider.uniq_used_keys)

                                                }
                                            }

                                            if (provider.hasOwnProperty('uniq_unused_keys') == true) {
                                                if (Array.isArray(provider.uniq_unused_keys) == true) {
                                                    setObj(tmpDataTaskDebug, 'unused_keys', provider.uniq_unused_keys)

                                                }
                                            }

                                            setDataTaskDebug(tmpDataTaskDebug)

                                        }

                                    }

                                }

                            }


                        })

                    }

                    viewData = []

                    setCurrentDataTask(tmpData)
                    setDataTask({ ...dataTask })

                }

            }

        }, [providerTask])

        const onPrint = () => {

            printItem(schema, {
                ...schema.values,
                ...{
                    id: id,
                    type: "pdf"
                }
            })

        }

        const content = (slug) => {

            setId(slug)

            if (typeof (currentDataTask) == "undefined") {

                return (
                    <>
                        {task()}
                    </>
                );

            } else {

                return (
                    <>
                        {task()}

                        <Flex className={Classes.container}>

                            <StickyBox className={Classes.sidebar}>
                                <Box className={Classes.sidebaritem} data-scroll-active={true} data-scroll-name={"task-info"} onClick={scrollBlock}>{i18n.t('tasks.get_info')}</Box>
                                <Box className={Classes.sidebaritem} data-scroll-name={"task-info-scorring"} onClick={scrollBlock}>{i18n.t('tasks.scorring_score')}</Box>
                                {
                                    store.user.user.role == Config.roleMain && Object.keys(dataTaskDebug).length > 0 ?
                                        <Box className={Classes.sidebaritem} data-scroll-name={"task-info-keywords"} onClick={scrollBlock}>{i18n.t('tasks.keys')}</Box> : ""
                                }
                                {Object.keys(dataSidebar).map((item) => {
                                    return (
                                        <Box className={Classes.sidebaritem} data-scroll-name={item} onClick={scrollBlock}>{dataSidebar[item]}</Box>
                                    )
                                })}
                            </StickyBox>

                            <Box className={Classes.wrapper}>

                                {currentDataTask.length > 0 ?

                                    currentDataTask.map((item) => {
                                        return (
                                            <>
                                                {taskInfo(item)}
                                            </>
                                        )
                                    }) : taskInfo({})

                                }

                                {taskInfoDebugSource()}
                                {taskInfoDebugKeywords()}

                            </Box>
                        </Flex >
                    </>
                )
            }

        }

        const loadTask = () => {
            onData(id).then((data) => {
                if (data.hasOwnProperty('id') == false ||
                    data.hasOwnProperty('data') == false ||
                    data.hasOwnProperty('state') == false ||
                    data.hasOwnProperty('provider') == false) {
                    router.push(href)
                } else {
                    if (data.hasOwnProperty('state') == true) {
                        setStateTask(parseInt(data.state))
                    }
                    if (data.hasOwnProperty('provider') == true) {
                        setProviderTask(data.provider)
                    }
                    setDataTask(data)
                }
            })
        }

        const task = () => {

            if (typeof (dataTask) != "undefined") {

                return (
                    <Box className={Classes.block} variant="full">
                        <Flex className={Classes.blockrow}>
                            <Box className={Classes.blockstatus} variant={stateTask}>
                                {i18n.t(`tasks.values.state.${stateTask}`)}
                            </Box>
                            <Flex className={Classes.blockbuttons}>
                                <Anchor href="javascript:;" onClick={() => { onShare(router, store, window.location.origin + router.asPath) }} className={Classes.blockbutton}>{i18n.t('common.share')}</Anchor>
                                {stateTask == 2 ? <Anchor href="javascript:;" onClick={onPrint} className={Classes.blockbutton}>{i18n.t('common.print')}</Anchor> : ''}
                            </Flex>
                        </Flex>
                        <Box className={Classes.blockdetail}>

                            {viewDataRequest.map((item) => {

                                let label = "",
                                    value

                                label = i18n.t(`tasks.${item}`)

                                if (!label) {
                                    label = item
                                }

                                if (dataTask.hasOwnProperty(item) == true) {
                                    value = dataCustomizationRequest(item, dataTask[item])
                                }

                                return (
                                    <Flex className={Classes.blockdetailrow}>
                                        <Box className={Classes.blockdetailhead}>{label}</Box>
                                        <Box className={Classes.blockdetailvalue}>{value}</Box>
                                    </Flex>
                                )

                            })}
                        </Box>
                    </Box>
                )
            }
        }

        const taskInfo = (data) => {

            let variant = 'task-info'

            let count = 0

            let result = (
                <Flex className={Classes.blockdetail} data-scroll={variant} variant={variant}>

                    {viewDataTask.map((subItem) => {

                        let label = "",
                            value

                        label = i18n.t(`tasks.${subItem}`)

                        if (!label) {
                            label = subItem
                        }

                        if (data.hasOwnProperty(subItem) == true) {

                            value = dataCustomizationTask(subItem, data[subItem], viewData, i18n)

                            if (typeof (value) == 'object') {
                                if (value.hasOwnProperty('value') == true) {
                                    count++
                                    return (
                                        <Box className={Classes.blockdetailrow} variant={variant}>
                                            <Box className={Classes.blockdetailrowhead} variant={variant}>{label}</Box>
                                            <Box className={Classes.blockdetailrowvalue} variant={variant}> {value.value} </Box>
                                        </Box>
                                    )
                                }
                            }

                        }

                    })}

                </Flex>
            )

            return (
                <Box className={Classes.block}>
                    <Flex className={Classes.blockrow}> <Box className={Classes.blocktitle}> {i18n.t(`tasks.get_info`)} </Box> </Flex>
                    {count > 0 ? result : ""}
                    {taskInfoSecond(data)}
                    {taskInfoThird(data)}
                    {taskInfoFour(data)}
                </Box>
            )

        }

        const taskInfoSecond = (data) => {

            let variant = 'task-info-second'

            let count = 0

            let result = (
                // <Box className={Classes.block}>
                <Flex className={Classes.blockdetail} variant={variant}>

                    {viewDataTaskSecond.map((subItem) => {

                        let label = "",
                            value

                        label = i18n.t(`tasks.${subItem}`)

                        if (!label) {
                            label = subItem
                        }

                        if (data.hasOwnProperty(subItem) == true) {

                            value = dataCustomizationTask(subItem, data[subItem], viewData, i18n)

                            if (typeof (value) == 'object') {
                                if (value.hasOwnProperty('value') == true) {
                                    count++
                                    return (
                                        <Box className={Classes.blockdetailrow} variant={variant}>
                                            <Box className={Classes.blockdetailrowhead} variant={variant}>{label}</Box>
                                            <Box className={Classes.blockdetailrowvalue} variant={variant}> {value.value} </Box>
                                        </Box>
                                    )
                                }
                            }

                        }

                    })}

                </Flex>
                // </Box >
            )

            if (count > 0) {
                return result
            }

        }

        const taskInfoThird = (data) => {

            let variant = 'task-info-third'

            let scorringLength = 0,
                scorringScore = 0,
                userScorring = store.user.user.scorring

            return (<>
                <Flex className={Classes.blockdetail} data-scroll="task-info-scorring" variant={variant}>

                    {viewDataTaskThird.map((subItem) => {

                        if (store.user.user.role == Config.roleMain || userScorring.includes(subItem) == true) {

                            let label = "",
                                value

                            label = i18n.t(`tasks.${subItem}`)

                            if (!label) {
                                label = subItem
                            }

                            //if (data.hasOwnProperty(subItem) == true) {

                            scorringLength++

                            value = dataCustomizationTask(subItem, (data.hasOwnProperty(subItem) == true ? data[subItem] : ""), viewData, i18n, true)

                            if (typeof (value) == 'object') {
                                if (value.hasOwnProperty('scorring') == true) {

                                    if (value.scorring == 1) {
                                        scorringScore = scorringScore + Config.scorringBalce

                                    }

                                }
                                if (value.hasOwnProperty('value') == true) {
                                    return (
                                        <Box className={Classes.blockdetailrow} variant={variant}>
                                            <Box className={Classes.blockdetailrowhead} variant={variant}>{label}</Box>
                                            <Box className={Classes.blockdetailrowvalue} variant={variant}> {value.value} </Box>
                                        </Box>
                                    )
                                }
                            }

                            //}

                        }

                    })}

                </Flex>
                <Box className={Classes.blockscorring} variant={(
                    scorringScore == scorringLength ? '2' : (
                        (scorringLength - scorringScore) < parseInt(Config.scorringDiff) ? '1' : '0'
                    )
                )}>
                    {i18n.t(`tasks.scorring_score`)} {scorringScore}/{scorringLength}
                </Box>
            </>
            )

        }

        const taskInfoFour = (data) => {

            let variant = 'task-info-four'

            let userScorring = store.user.user.scorring

            return (<>
                <Flex className={Classes.blockdetail} variant={variant}>

                    {viewDataTaskFour.map((subItem) => {

                        if (store.user.user.role == Config.roleMain || userScorring.includes(subItem) == true) {

                            let label = "",
                                value

                            label = i18n.t(`tasks.${subItem}`)

                            if (!label) {
                                label = subItem
                            }

                            if (data.hasOwnProperty(subItem) == true) {

                                value = dataCustomizationTask(subItem, data[subItem], viewData, i18n)

                                if (typeof (value) == 'object') {
                                    if (value.hasOwnProperty('value') == true) {
                                        return (
                                            <Box className={Classes.blockdetailrow} variant={variant}>
                                                <Box className={Classes.blockdetailrowhead} variant={variant}>{label}</Box>
                                                <Box className={Classes.blockdetailrowvalue} variant={variant}> {value.value} </Box>
                                            </Box>
                                        )
                                    }
                                }

                            }

                        }

                    })}

                </Flex>
            </>
            )

        }

        const taskInfoDebugSourceGetLabel = (item, provider = '') => {

            if (Object.keys(item).length > 0) {

                let label = (item.hasOwnProperty('source') == true ? item.source : i18n.t(`tasks.${String(Object.keys(item).shift())}`) + " " + String(Object.values(item).shift()))

                if (store.user.user.role == Config.roleMain) {
                    label += " - " + String(provider)
                }

                return label

            }


        }

        const taskInfoDebugSource = () => {

            let variant = "task-info-source"

            if (Object.keys(dataTaskDebugInfo).length > 0) {

                let count = 0;

                let result = (
                    <Box className={Classes.block} variant={variant}>
                        {store.user.user.role == Config.roleMain ?
                            <Box className={Classes.blockfilter}>
                                <Anchor className={Classes.blockfilteritem} href="javascript:;" variant={dataTaskDebugInfoFilter == '' ? 'active' : ''} onClick={() => {
                                    setDataTaskDebugInfoFilter('')
                                }}>{i18n.t('common.all_keys')}</Anchor>
                                <Anchor className={Classes.blockfilteritem} href="javascript:;" variant={dataTaskDebugInfoFilter == 'isset' ? 'active' : ''} onClick={() => {
                                    setDataTaskDebugInfoFilter('isset')
                                }}>{i18n.t('common.used_keys')}</Anchor>
                                <Anchor className={Classes.blockfilteritem} href="javascript:;" variant={dataTaskDebugInfoFilter == 'nisset' ? 'active' : ''} onClick={() => {
                                    setDataTaskDebugInfoFilter('nisset')
                                }}>{i18n.t('common.noused_keys')}</Anchor>
                            </Box> : ''
                        }
                        {Object.keys(dataTaskDebugInfo).map((item) => {

                            let result = (dataTaskDebugInfo[item].map((subItem, index) => {

                                if (isObject(subItem) == true) {

                                    if (Object.keys(subItem).length > 0) {

                                        count++;

                                        let label = taskInfoDebugSourceGetLabel(subItem, item);

                                        if (label) {

                                            return (
                                                <Box
                                                    className={Classes.blockdetail} data-scroll={label + item + index} variant={variant}>
                                                    <Box
                                                        className={Classes.blockdetailtitle}
                                                        variant={variant}
                                                        onClick={(event) => {
                                                            if (event.target.getAttribute('data-open') == null) {
                                                                event.target.setAttribute('data-open', true)
                                                            } else {
                                                                event.target.removeAttribute('data-open')
                                                            }
                                                        }}
                                                    >
                                                        {label}

                                                        <IconDown className={Classes.blockdetailtitleicon} variant={variant} />
                                                    </Box>
                                                    <Box className={Classes.blockdetailrow} variant={variant} onClick={(event) => {
                                                        if (event.target.getAttribute('data-open') == null) {
                                                            event.target.setAttribute('data-open', true)
                                                        } else {
                                                            event.target.removeAttribute('data-open')
                                                        }
                                                    }}>
                                                        {dataTaskDebugInfoOpen.hasOwnProperty(index) == false ?
                                                            Object.keys(subItem).map((sub2Item, sub2Index) => {

                                                                let variant_label = 'nisset',
                                                                    variant_value = 'nisset',
                                                                    label = '',
                                                                    value = String(subItem[sub2Item]).replace(/\r\n/g, '').replace(/\n/g, '');

                                                                label = i18n.t(`task.${sub2Item}`)

                                                                if (!label) {
                                                                    label = sub2Item
                                                                }

                                                                if (
                                                                    value.length == 0 ||
                                                                    sub2Item == 'source'
                                                                ) {
                                                                    return false
                                                                }

                                                                if (store.user.user.role == Config.roleMain) {

                                                                    if (dataTaskDebug.hasOwnProperty('used_keys') == true) {
                                                                        if (Array.isArray(dataTaskDebug.used_keys) == true) {
                                                                            if (dataTaskDebug.used_keys.includes(String(sub2Item).toLowerCase()) == true) {
                                                                                variant_label = 'isset'
                                                                            }
                                                                        }
                                                                    }

                                                                    if (typeof (viewData) != 'undefined') {
                                                                        if (Array.isArray(viewData) == true) {
                                                                            if (viewData.includes(String(value).toLowerCase()) == true) {
                                                                                variant_value = 'isset'
                                                                            }
                                                                        }
                                                                    }

                                                                }

                                                                let view = false

                                                                if (dataTaskDebugInfoFilter != '') {

                                                                    view = (
                                                                        dataTaskDebugInfoFilter == 'isset' && variant_label == 'isset' ?
                                                                            true : (
                                                                                dataTaskDebugInfoFilter == 'nisset' && variant_label == 'nisset' ? true : false
                                                                            )
                                                                    )

                                                                } else {
                                                                    view = true
                                                                }

                                                                if (view == true) {

                                                                    return (
                                                                        <Flex className={Classes.blockdetailitem} variant={variant}>
                                                                            <Box className={Classes.blockdetailitemhead} variant={variant}>
                                                                                <Box className={Classes.blockdetailitemheadtext} variant={variant_label} data-index={sub2Item}>{label}</Box>
                                                                            </Box>
                                                                            <Box className={Classes.blockdetailitemvalue} variant={variant} data-variant-value={variant_value}> {value} </Box>
                                                                        </Flex>
                                                                    )
                                                                }

                                                            }) : ""
                                                        }
                                                    </Box>
                                                </Box >
                                            )
                                        }
                                    }

                                }
                            }))

                            return result
                        })}
                    </Box >
                )

                if (count > 0) {
                    return result
                }
            }

        }

        const taskInfoDebugKeywords = () => {

            let variant = "task-info-keywords"

            if (store.user.user.role == Config.roleMain && Object.keys(dataTaskDebug).length > 0) {

                return (
                    <Box className={Classes.block} data-scroll={variant} variant={variant}>
                        {Object.keys(dataTaskDebug).map((item) => {

                            if (Array.isArray(dataTaskDebug[item]) == true) {

                                if (dataTaskDebug[item].length > 0) {

                                    let label = ''

                                    label = i18n.t(`tasks.${item}`)

                                    if (!label) {
                                        label = item
                                    }

                                    return (
                                        <Box className={Classes.blockdetailitemrow} variant={variant}>
                                            <Box className={Classes.blockdetailitemrowhead} variant={variant}>{label}</Box>
                                            <Box className={Classes.blockdetailitemrowvalue} variant={variant}>
                                                <Code className={Classes.blockdetailitemrowvaluecode}>{dataTaskDebug[item].join(', ')} </Code>
                                            </Box>
                                        </Box>
                                    )

                                }

                            }


                        })}

                    </Box>

                )

            }

        }

        return (

            <PageView
                store={store}
                name={name}
                href={href}
                breadcrumps={breadcrumps}
                content={content}
            />

        );

    }

})