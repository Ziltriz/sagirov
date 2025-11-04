import { observer } from 'mobx-react-lite'
import Header from '@/components/layouts-parts/header';
import PageView from "@/core/components/layouts/page-view";


export default observer(({ store } ) => {

    return (
        <>
        <Header> </Header>
        <PageView store = {store} />
        </>
    )

});