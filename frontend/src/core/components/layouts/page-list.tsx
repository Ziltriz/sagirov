import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Flex, Box, Anchor } from '@mantine/core';

import { useI18n } from 'next-localization';
import { useRouter as useRouterRouter } from 'next/router'

import AuthProvider from "@/core/context/authProvider";
import Ordered from '@/core/modules/Ordered';
import { getParam } from '@/core/modules/Url';
import { set as setObj } from '@/core/modules/Object';
import Sidebar from '@/core/components/layouts-parts/sidebar';
import Tabs from '@/core/components/layouts-parts/tabs';
import Breadcrumps from '@/core/components/layouts-parts/breadcrumps';
import List from '@/core/components/layouts-parts/list';
import AddInline from '@/core/components/layouts-parts/add-inline'
import Classes from '@/core/styles/pages/list.module.scss';

import Config from '@/config'

export default observer(({
    section = "",
    store,
    name,
    href,
    data = {},
    data_custom_view = {},
    breadcrumps,
    tabs,
    count = 0,
    page = 1,
    limit = 10,
    sort = { key: "", type: "" },
    filters = {},
    values = [],
    tab_default = "",
    tabs_variant = "headlings",
    onLoadItems = ({ setItems, setCount }) => { },
    onSort = ({ key, type, setSort }) => { },
    onFilter = ({ obj, setSort }) => { },
    onPagination = ({ page, value, setPage }) => { },
    onOrdered = ({ index, type, step }) => { },
    onTabs = ({ variant, setType }) => { },
    onDelete = (id) => { new Promise((resolve => resolve(false))) },
    beforeContent = undefined,
    afterContent = undefined,
    callbacks = {}
}) => {

    const routerRouter = useRouterRouter();
    const refferer = '?refferer=' + btoa(routerRouter.asPath);
    const i18n = useI18n();
    const [opened, setOpened] = useState(false);
    const [init, setInit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [load, setLoad] = useState(true);
    const [reload, setReload] = useState(true);
    const [reloadInterval, setReloadInterval] = useState(undefined);
    const [pageItems, setPageItems] = useState(page);
    const [limitItems, setLimitItems] = useState(limit);
    const [countItems, setCountItems] = useState(count);
    const [items, setItems] = useState(values);
    const [sortItems, setSortItems] = useState(sort);
    const [filterItems, setFilterItems] = useState(filters);
    const [typeItems, setTypeItems] = useState(tab_default);

    const loadItems = () => {
        setLoading(true)
        onLoadItems({
            reload: reload,
            page: pageItems,
            limit: limitItems,
            sort: sortItems,
            type: typeItems,
            filter: filterItems,
            setItems: setItems,
            setCount: setCountItems,
            setReload: setReload,
            setLoading: setLoading
        })
    }

    const tabsed = (variant) => {
        onTabs({
            variant: variant,
            setType: setTypeItems,
            setLoad: setLoad,
            setLoading: setLoading
        })
    }

    const sorted = (key, type) => {
        onSort({
            key: key,
            type: type,
            setSort: setSortItems,
            setLoading: setLoading
        })
    }

    const filtered = (values) => {
        onFilter({
            values: values,
            setFilterItems: setFilterItems,
            setLoading: setLoading
        })
    }

    const pagination = (value) => {
        onPagination({
            page: pageItems,
            value: value,
            setPage: setPageItems,
            setLoading: setLoading
        })
    }

    const deletes = (id) => {
        onDelete(id).then((data) => {
            if (data ===true) {
                loadItems()
            }
        })
    }

    const ordered = (index, type, step) => {
        setItems(Ordered(type, index, items, step, pageItems, countItems))
        onOrdered({
            index: index,
            type: type,
            step: step,
            items: items,
            page: pageItems,
            count: countItems,
            setItems: setItems,
            reload: reload,
            setReload: setReload,
            setLoading: setLoading
        })

    }

    const reloades= (index, type, step) => {
        loadItems()
    }


    useEffect(() => {
        if (init == true) {
            if (reload == true) {
                if (reloadInterval == undefined) {
                    setReloadInterval(setInterval(() => { loadItems() }, Config.autoReloadInterval))
                }
            } else if (reloadInterval != undefined) {
                clearInterval(reloadInterval)
                setReloadInterval(undefined)
            }
        }
    }, [items])

    useEffect(() => {
        if (init == false) {
            if (load == true) {
                var pageParam = getParam(routerRouter.asPath, 'page')
                if (pageParam != false) {
                    setPageItems(parseInt(pageParam));
                }
                setInit(true);
            }

        } else if (load == true) {
            if (loading == true) {
                setReload(false)
                if (reloadInterval != undefined) {
                    clearInterval(reloadInterval)
                    setReloadInterval(undefined);
                }
            }
            loadItems()
        }
    }, [init, pageItems, sortItems, typeItems, filterItems])

    let button = '',
        add_type = '',
        view_add = false,
        fields_access_roles = {},
        filter_access_roles = {},
        actions_access_roles = {},
        actions = [],
        fields = {}

    if (data.hasOwnProperty('fields') == true) {
        if (typeof (data['actions']) == 'object') {
            fields = data['fields']
        }
    }

    if (data.hasOwnProperty('actions') == true) {
        if (Array.isArray(data['actions']) == true) {
            actions = data['actions']
        }
    }

    if (data.hasOwnProperty('fields_access_roles') == true) {
        Object.keys(data['fields_access_roles']).forEach((item) => {
            if (Array.isArray(data['fields_access_roles'][item]) == true) {
                setObj(fields_access_roles, item, data['fields_access_roles'][item])
            }

        })
    }

    if (data.hasOwnProperty('filter_access_roles') == true) {
        Object.keys(data['filter_access_roles']).forEach((item) => {
            if (Array.isArray(data['filter_access_roles'][item]) == true) {
                setObj(filter_access_roles, item, data['filter_access_roles'][item])
            }

        })
    }

    if (data.hasOwnProperty('actions_access_roles') == true) {
        Object.keys(data['actions_access_roles']).forEach((item) => {
            if (Array.isArray(data['actions_access_roles'][item]) == true) {
                setObj(actions_access_roles, item, data['actions_access_roles'][item])
            }

        })
    }

    if (actions.includes('add') == true || actions.includes('add_inline') == true) {

        add_type = (actions.includes('add') == true ? 'add' : (actions.includes('add_inline') == true ? 'add_inline' : ''))

        if (add_type.length > 0) {

            if (actions_access_roles.hasOwnProperty(add_type) == true) {
                view_add = actions_access_roles[add_type].includes(store.user.user.role);
            } else {
                view_add = actions.includes(add_type);
            }

        }

        if (view_add) {

            let add_text = i18n.t(`${name}.${add_type}_button`)

            if(add_text.length == 0) {
                add_text = i18n.t(`common.${add_type}_button`)
            }

            button = (
                <>
                    <Anchor
                        href={add_type == 'add' ? href + '/add' + refferer : 'javascript:;'}
                        className={Classes.buttonadd}
                        onClick={() => {
                            if (add_type == 'add_inline') {
                                setOpened(true)
                            }
                        }}
                    >{add_text}</Anchor>
                    {
                        add_type == 'add_inline' && opened == true ? (
                            <AddInline
                                opened={opened}
                                store={store}
                                name={name}
                                callbacks={callbacks}
                                onClose={() => {
                                    setOpened(false)
                                }}
                                onEnd={() => {
                                    loadItems()
                                    setOpened(false)
                                }}
                            />

                        ) : ''
                    }
                </>
            )
        }
    }

    return (

        <AuthProvider store={store}>
            <Flex>
                <Sidebar store={store} />
                <Box className={Classes.block} variant={store.states.sidebar ? 'sidebar-open' : 'sidebar-close'}>
                    <Breadcrumps
                        store={store}
                        section={section}
                        breadcrumps={breadcrumps}
                        text={i18n.t(`headlings.${name}`)}
                        order={4}
                        button={button}
                    />
                    <Tabs
                        variant={tabs_variant}
                        tabs={tabs}
                        active={typeItems}
                        onClick={tabsed}
                    />
                    {(typeof beforeContent != 'undefined' ? <Box className={Classes.beforecontent}>{beforeContent}</Box> : '')}
                    {(typeof items != 'undefined' ? <Box className={Classes.form}>
                        <List
                            store={store}
                            name={name}
                            href={href}
                            page={pageItems}
                            limit={limitItems}
                            count={countItems}
                            data={items}
                            fields={fields}
                            fields_access_roles={fields_access_roles}
                            actions={actions}
                            actions_access_roles={actions_access_roles}
                            fields_custom_view={data_custom_view}
                            sort={data.sort}
                            sorted={sorted}
                            sort_custom={data.sort_custom}
                            filter={data.filter}
                            filter_access_roles={filter_access_roles}
                            filtered={filtered}
                            ordered={ordered}
                            pagination={pagination}
                            callbacks={callbacks}
                            onDelete={(typeof (onDelete) == 'function' ? (deletes) : undefined)}
                            onReload={reloades}
                        />
                    </Box> : '')}
                    {(typeof afterContent != 'undefined' ? <Box className={Classes.aftercontent}>{afterContent}</Box> : '')}
                </Box>
            </Flex>
        </AuthProvider>
    )

})