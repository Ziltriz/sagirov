import { Flex, Box, Anchor, Popover } from '@mantine/core'
import { IconChevronLeft, IconChevronRight, IconDotsVertical } from '@tabler/icons-react';
import { useI18n } from 'next-localization';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { set as setObj, update as updateObj } from '@/core/modules/Object'
import { setStyleElement } from '@/core/modules/Styles'
import IconSorted from '@/core/components/icons/sorted'
import IconOrderUp from '@/core/components/icons/orderUp'
import IconOrderDown from '@/core/components/icons/orderDown'
import Classes from '@/core/styles/pages/list.module.scss'
import { isFunction } from '@/core/modules/Types'
import { getParam } from '@/core/modules/Url'
import Filter from '@/core/components/layouts-parts/filter'
import EditInline from '@/core/components/layouts-parts/edit-inline'
import DeleteConfirm from '@/core/components/layouts-parts/delete-confirm'

export default ({
    store,
    name = '',
    href = '',
    page = 1,
    limit = 0,
    count = 0,
    data = [],
    fields = {},
    fields_access_roles = {},
    fields_custom_view = {},
    actions = [],
    actions_access_roles = [],
    sort = [],
    sorted = (key, type) => { },
    ordered = (index, type, step) => { },
    pagination = (value) => { },
    filter = [],
    filter_access_roles = {},
    filtered = (values) => { },
    onDelete,
    onReload,
    callbacks = {}
}) => {

    const router = useRouter();
    const refferer = '?refferer=' + btoa(router.asPath);
    const [orderedElement, setOrderedElement] = useState(undefined);
    const [sortable, setSortable] = useState({});
    const [init, setInit] = useState(false);
    const [opened, setOpened] = useState({});
    const i18n = useI18n();

    const onFilter = (values) => {
        filtered(values)
    }

    const onClickPagination = (value) => {
        value = parseInt(value);
        if (value != page) {
            if (isFunction(pagination) == true) {
                router.push(router.pathname + (value > 1 ? '?page=' + value : ''))
                pagination(value)
            }
        }
    }

    const onClickSortable = (value) => {

        if (isFunction(sorted) == true) {

            if (sortable.hasOwnProperty(value) == true) {

                let current;

                for (let index in sortable) {
                    if (sortable[index].current == true) {
                        current = sortable[index];
                        break;
                    }
                }

                if (current) {
                    current.current = false;
                }

                updateObj(sortable, value, {
                    current: true,
                    value: (sortable[value].value == undefined ? "ASC" : (sortable[value].value == "ASC" ? "DESC" : "ASC"))
                })

                sorted(value, sortable[value].value)

            }
        }
    }

    const onOrderedUp = (event) => {
        if (fields.hasOwnProperty('ordered') == true && isFunction(ordered) == true) {
            let element = event.target.closest('[data-draggable="true"]');
            if (element) {
                let index = element.getAttribute('data-index');
                if (index != null) {
                    ordered(index, 'dec', 1)
                }
            }
        }
    }

    const onOrderedDown = (event) => {
        if (fields.hasOwnProperty('ordered') == true && isFunction(ordered) == true) {
            let element = event.target.closest('[data-draggable="true"]');
            if (element) {
                let index = element.getAttribute('data-index');
                if (index != null) {
                    ordered(index, 'inc', 1)
                }
            }
        }
    }

    const onOrderedStart = (event) => {

        if (fields.hasOwnProperty('ordered') == true && isFunction(ordered) == true) {

            let element = event.target.closest('[data-draggable="true"]')

            if (event.nativeEvent.which != 1 || !element) return;

            let index = element.getAttribute('data-index');

            if (index != null) {
                setOrderedElement({
                    tmp: parseInt(index),
                    target: element,
                    x: event.nativeEvent.pageX,
                    y: event.nativeEvent.pageY
                });
            }
        }
    }

    const onOrderedProcess = (event) => {

        if (fields.hasOwnProperty('ordered') == true && isFunction(ordered) == true && orderedElement != undefined) {

            if (orderedElement == undefined) return;

            let moveX = event.nativeEvent.pageX - orderedElement.x,
                moveY = event.nativeEvent.pageY - orderedElement.y;

            if (orderedElement.hasOwnProperty('index') == false) {

                setOrderedElement({
                    index: parseInt(orderedElement.tmp),
                    target: orderedElement.target,
                    x: orderedElement.x,
                    y: orderedElement.y
                });

            } else {
                setStyleElement('transform', 'translateY(' + moveY + 'px)', orderedElement.target)
            }

        }

    }

    const onOrderedFinish = (event) => {

        if (fields.hasOwnProperty('ordered') == true && isFunction(ordered) == true && orderedElement != undefined) {

            let elements = document.elementsFromPoint(event.nativeEvent.clientX, event.nativeEvent.clientY);

            if (elements.length > 0) {

                elements.forEach((element) => {

                    element = element.closest('[data-draggable="true"]')

                    if (element != null) {

                        let index = element.getAttribute('data-index');

                        if (index != null) {

                            index = parseInt(index)

                            if (index != orderedElement.index) {
                                if (orderedElement.index < index) {
                                    ordered(orderedElement.index, 'inc', index - orderedElement.index)
                                } else {
                                    ordered(orderedElement.index, 'dec', orderedElement.index - index)
                                }
                                return false;
                            }

                        }

                    }

                })

            }

            setStyleElement('transform', 'translateY(0px)', orderedElement.target)
            setOrderedElement(undefined);

        }


    }

    const onSetOpened = (update, href) => {
        let tmpOpened = { ...opened }
        if (tmpOpened.hasOwnProperty(href) == true) {
            tmpOpened[href] = {
                ...tmpOpened[href],
                ...update
            }
        }
        setOpened(tmpOpened)
    }

    useEffect(() => {

        if (init == false) {

            let tmpPage = getParam(router.asPath, 'page')

            if (tmpPage != false) page = tmpPage

            setInit(true)

        }

        if (Object.keys(fields).length > 0 && data.length > 0 && Object.keys(sort).length > 0 && Object.keys(sortable).length == 0) {

            let tmpSortable = sortable

            for (let index in fields) {
                if (sort.includes(index) == true) {
                    setObj(tmpSortable, index, { current: false, value: undefined })
                }
            }

            setSortable(tmpSortable)

        }

    })

    let filter_view = '',
        fields_view = '',
        data_view = '',
        pagination_view = ''

    if (Object.keys(fields).length > 0 && Object.keys(filter).length > 0) {
        filter_view = (
            <Filter
                access_roles={filter_access_roles}
                store={store}
                name={name}
                data={filter}
                onFilter={onFilter}
                callbacks={callbacks}
            />
        )
    }

    if (Object.keys(fields).length > 0 && data.length > 0) {

        fields_view = (
            <Box className={Classes.head} data-name={name}>
                {Object.keys(fields).map((value, index) => {

                    if (fields_access_roles.hasOwnProperty(value) == true) {
                        if (fields_access_roles[value].includes(store.user.user.role) == false) {
                            return;
                        }
                    }

                    let value_text = i18n.t('common.' + value)

                    if (value_text.length == 0) {
                        value_text = i18n.t(name + '.' + value)
                    }

                    return (
                        <Box data-variant={"fields" + value} key={"fields" + index + value} className={Classes.headitem}>
                            {value_text}
                            {sort.includes(value) == true ? (
                                <Anchor onClick={() => { onClickSortable(value) }} className={Classes.headitemsort}> <IconSorted className={Classes.headitemsorticon} /> </Anchor>
                            ) : ''}
                        </Box>
                    )

                })}
            </Box>
        )

        if (data.length > 0) {

            let tmpOpened = { ...opened }

            data_view = (<> {

                data.slice(0, limit).map((value, index) => {

                    var key = (value.hasOwnProperty('href') == true ? value.href : index);

                    return (<Box
                        data-index={index}
                        data-draggable={fields.hasOwnProperty('ordered') == true}
                        data-opacity={typeof orderedElement != 'undefined' ? (orderedElement.index == index) : 'false'}
                        key={"items" + key}
                        onMouseDown={onOrderedStart}
                        onMouseMove={onOrderedProcess}
                        onMouseUp={onOrderedFinish}
                        className={Classes.bodyitem}
                        data-actions-active={actions.length}
                        data-name={name}
                    > {
                            Object.keys(fields).map((subValue) => {

                                if (fields_access_roles.hasOwnProperty(subValue) == true) {
                                    if (fields_access_roles[subValue].includes(store.user.user.role) == false) {
                                        return;
                                    }
                                }

                                if (subValue != 'actions' && subValue != 'ordered') {

                                    if (fields_custom_view.hasOwnProperty(subValue) == true && typeof fields_custom_view[subValue] == 'function') {

                                        let result = fields_custom_view[subValue]("item" + key + subValue, value, value[subValue], name, subValue, store)

                                        if (result) {
                                            return result
                                        } else {
                                            return <Box data-name={name} variant={subValue} key={"item" + key + subValue} className={Classes.bodyitemvalue}> {'\u00A0'}</Box>
                                        }

                                    } else {

                                        return (
                                            <Box data-name={name} variant={subValue} key={"item" + key + subValue} className={Classes.bodyitemvalue}>{value[subValue] ? value[subValue] : '\u00A0'}</Box>
                                        )

                                    }

                                } else if (subValue == 'actions' && actions.length > 0) {

                                    if (value.hasOwnProperty('href') == true) {

                                        if (tmpOpened.hasOwnProperty(value['href']) == false) {
                                            setObj(tmpOpened, value['href'], {
                                                edit_inline: false,
                                                delete_confirm: false,
                                                popover: false
                                            })
                                        }

                                        return (
                                            <Box data-variant={"fields" + subValue} key={"item" + key + subValue} className={Classes.bodyitemvalue} data-name={name}>
                                                <Popover opened={tmpOpened[value['href']]['popover']} variant="pages-list" trapFocus arrowPosition="side" position="bottom-end" withArrow zIndex={1}>
                                                    <Popover.Target>
                                                        <Box className={Classes.bodyitemaction} onClick={() => {
                                                            onSetOpened({
                                                                popover: !tmpOpened[value['href']]['popover']
                                                            }, value['href'])
                                                        }}> <IconDotsVertical className={Classes.bodyitemactionicon} size={20} /> </Box>
                                                    </Popover.Target>
                                                    <Popover.Dropdown>

                                                        {['view', 'edit', 'edit_inline', 'delete', 'delete_confirm'].map((sub2Value) => {

                                                            if (actions.includes(sub2Value) == true) {
                                                                
                                                                let result,
                                                                    view = false;

                                                                if (actions_access_roles.hasOwnProperty(sub2Value) == true) {
                                                                    view = actions_access_roles[sub2Value].includes(store.user.user.role)
                                                                } else {
                                                                    view = true
                                                                }

                                                                if (view == true) {

                                                                    let label = i18n.t(`${name}.${sub2Value}_button`)

                                                                    if(label.length == 0){
                                                                        label = i18n.t(`common.${sub2Value}_button`)
                                                                    }

                                                                    switch (sub2Value) {

                                                                        case 'view':

                                                                            result = (
                                                                                <Anchor
                                                                                    key={`${sub2Value}_${value['href']}`}
                                                                                    href={href + '/view/' + value['href'] + refferer}
                                                                                    className={Classes.bodyitemactionlink}
                                                                                    target="_blank"
                                                                                    onClick={() => {
                                                                                        onSetOpened({
                                                                                            popover: false
                                                                                        }, value['href'])
                                                                                    }}
                                                                                >{label}</Anchor>
                                                                            )

                                                                            break;

                                                                        case 'edit':
                                                                        case 'edit_inline':

                                                                            result = (
                                                                                <>
                                                                                    <Anchor
                                                                                        key={`${sub2Value}_${value['href']}_link`}
                                                                                        href={sub2Value == 'edit' ? href + '/edit/' + value['href'] + refferer : 'javascript:;'}
                                                                                        className={Classes.bodyitemactionlink}
                                                                                        onClick={() => {
                                                                                            onSetOpened({
                                                                                                edit_inline: true,
                                                                                                popover: false
                                                                                            }, value['href'])
                                                                                        }}
                                                                                    > {label} </Anchor>
                                                                                </>
                                                                            )

                                                                            break;

                                                                        case 'delete':
                                                                        case 'delete_confirm':

                                                                            result = (
                                                                                <Anchor
                                                                                    key={`${sub2Value}_${value['href']}_link`}
                                                                                    onClick={() => {
                                                                                        if (sub2Value == 'delete_confirm') {
                                                                                            onSetOpened({
                                                                                                delete_confirm: true,
                                                                                                popover: false
                                                                                            }, value['href'])
                                                                                        } else {
                                                                                            if (typeof (onDelete) == 'function') {
                                                                                                onDelete(value['href'])
                                                                                            }
                                                                                        }

                                                                                    }}
                                                                                    href={
                                                                                        (sub2Value != 'delete_confirm' ? (typeof (onDelete) != 'function' ? `${href}/delete/${value['href']}${refferer}` : 'javascript:;') : 'javascript:;')
                                                                                    }
                                                                                    className={Classes.bodyitemactionlink}
                                                                                >{label}</Anchor>
                                                                            )

                                                                            break;

                                                                    }

                                                                }
                                                                return result

                                                            }
                                                        })}
                                                    </Popover.Dropdown>
                                                </Popover>
                                                {
                                                    tmpOpened[value['href']]['edit_inline'] == true ? (
                                                        <EditInline
                                                            key={`edit_inline_${value['href']}`}
                                                            values={callbacks.hasOwnProperty('getItem') ? callbacks['getItem'](value['href']) : new Promise((resolve) => { resolve({}) })}
                                                            slug={value['href']}
                                                            opened={tmpOpened[value['href']]['edit_inline']}
                                                            store={store}
                                                            callbacks={callbacks}
                                                            onClose={() => {
                                                                onSetOpened({
                                                                    edit_inline: false
                                                                }, value['href'])
                                                            }}
                                                            onEnd={() => {
                                                                onReload()
                                                                onSetOpened({
                                                                    edit_inline: false
                                                                }, value['href'])
                                                            }}
                                                        />
                                                    ) : ''
                                                }

                                                {
                                                    tmpOpened[value['href']]['delete_confirm'] == true ? (
                                                        <DeleteConfirm
                                                            key={`delete_confirm_${value['href']}`}
                                                            opened={tmpOpened[value['href']]['delete_confirm']}
                                                            callbacks={callbacks}
                                                            store={store}
                                                            onClose={() => {
                                                                onSetOpened({
                                                                    delete_confirm: false
                                                                }, value['href'])
                                                            }}
                                                            onEnd={() => {
                                                                if (typeof (onDelete) == 'function') {
                                                                    onSetOpened({
                                                                        delete_confirm: false
                                                                    }, value['href'])
                                                                    onDelete(value['href'])
                                                                }
                                                            }}
                                                        />
                                                    ) : ''
                                                }
                                            </Box>
                                        )

                                    }

                                }

                                else if (subValue == 'ordered') {

                                    return (
                                        <Box
                                            data-variant={"fields" + subValue}
                                            key={"item" + key + subValue}
                                            className={Classes.bodyitemvalue}
                                            data-name={name}
                                        >
                                            <Box
                                                key={"itemordered" + key + subValue}
                                                className={Classes.boxordered}
                                            >
                                                <IconOrderUp className={Classes.boxordereditem} onClick={onOrderedUp} />
                                                <IconOrderDown className={Classes.boxordereditem} onClick={onOrderedDown} />
                                            </Box>
                                        </Box>
                                    )

                                }

                            })
                        } </Box>)

                })

            } </>)

            if (Object.keys(opened).length != Object.keys(tmpOpened).length) {
                setOpened(tmpOpened)
            }


        }

    }

    if (page && limit && count && Object.keys(fields).length > 0 && data.length > 0) {

        let pages = Math.ceil(count / limit)

        if (pages > 1) {

            pagination_view = (
                <Flex key="pagination" className={Classes.pagintaion}>

                    {page > 1 ?
                        <Flex key="pagination_prev" onClick={() => { onClickPagination(page - 1) }} className={Classes.pagintaionitemprev}>
                            <IconChevronLeft className={Classes.pagintaionitemprevicon} size={14} /> {i18n.t('list.prev')}
                        </Flex> : ''
                    }
                    {
                        Array.from({ length: pages }, (v, i) => i + 1).map((value) => {
                            return (
                                <Flex onClick={() => { onClickPagination(value) }} key={"pagination_item_" + value} variant={page == value ? 'active' : ''} className={Classes.pagintaionitem}>
                                    {value}
                                </Flex>
                            )
                        })

                    }
                    {pages != page ?
                        <Flex key="pagination_next" onClick={() => { onClickPagination(page + 1) }} className={Classes.pagintaionitemnext}>
                            {i18n.t('list.next')} <IconChevronRight className={Classes.pagintaionitemnexticon} size={14} />
                        </Flex> : ''
                    }
                </Flex>
            )

        }

    }

    return (
        <>
            {filter_view}
            <Box className={Classes.list}>
                <Box className={Classes.items}>
                    {fields_view}
                    {data_view}
                </Box>
                {pagination_view}
            </Box>
        </>
    )

}