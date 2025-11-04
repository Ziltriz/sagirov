import { observer } from 'mobx-react-lite'
import { Flex, Box } from '@mantine/core'
import { useRouter as useRouterRouter } from 'next/router'
import { useRouter } from 'next/navigation'

import AuthProvider from "@/core/context/authProvider";
import { requestImage, requestIntoImage, request } from '@/core/modules/Request'
import { getParam } from '@/core/modules/Url'
import { isFunction } from '@/core/modules/Types'
import { cloneDelLinks } from '@/core/modules/Object'
import Edit from '@/core/components/layouts-parts/edit'
import Sidebar from '@/core/components/layouts-parts/sidebar'
import Classes from '@/core/styles/pages/list.module.scss'


export default observer(({
    schemaForCode = false,
    titleItem,
    codeItem,
    section = "",
    store,
    name,
    href,
    callbacks,
    breadcrumps,
    onSuccess,
    onError,
    getItem
}) => {

    const schema = (callbacks.hasOwnProperty('getSchemaEdit') == true ? callbacks['getSchemaEdit'](store) : undefined)

    if (schema != undefined) {

        const schema_image = (callbacks.hasOwnProperty('getSchemaImage') == true ? callbacks['getSchemaImage'](store) : undefined)
        const router = useRouter();
        const routerRouter = useRouterRouter();
        const slug = routerRouter.query.slug

        const formSuccess = (data) => {

            if (typeof onSuccess == 'function') {

                onSuccess(data, store.states.error)

            } else if (data.data.hasOwnProperty('success') == true) {

                if (data.data.success == true) {

                    let refferer = getParam(routerRouter.asPath, 'refferer')

                    router.push(refferer == false ? href : atob(refferer))

                } else if (data.data.hasOwnProperty('message') == true) {
                    store.states.error = data.data.message;
                }

            }

        }

        const formError = (error) => {

            if (typeof onError == 'function') {
                onError(error, store.states.error)
            } else {

                console.error(error)

                if (error.response.data.hasOwnProperty('message') == true) {
                    store.states.error = error.response.data['message']
                }

            }

        }

        const formSubmit = (values) => {

            if (typeof (values) == 'object') {

                values = cloneDelLinks(values)

                if (schema_image != undefined) {
                    requestImage(schema_image, values, callbacks).then((data) => {
                        return requestIntoImage(schema, { ...values, ...{ id: slug } }, data, callbacks)
                    }).then(formSuccess, formError)
                } else {
                    request(schema, values, {}, callbacks).then(formSuccess, formError)
                }

            }

        }

        if (slug && isFunction(getItem) == true) {

            return (
                <AuthProvider store={store}>
                    <Flex>
                        <Sidebar store={store} />
                        <Box className={Classes.block} variant={store.states.sidebar ? 'sidebar-open' : 'sidebar-close'}>
                            <Edit
                                store={store}
                                schemaForCode={schemaForCode}
                                titleItem={titleItem}
                                codeItem={codeItem}
                                name={name}
                                section={section}
                                breadcrumps={breadcrumps}
                                values={getItem(slug)}
                                href={href}
                                formSubmit={formSubmit}
                                schema={schema}
                                callbacks={callbacks}
                            />
                        </Box>
                    </Flex>
                </AuthProvider>

            );

        }

    }

    return (<AuthProvider store={store}> {"notFoundSchema"} </AuthProvider>);

})