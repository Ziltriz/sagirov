import { observer } from 'mobx-react-lite'
import Auth from '@/components/auth/auth'

export default observer(({ store }) => {
    if(store.hasOwnProperty('states') == true) {
        if(store.states.hasOwnProperty('auth') == true) {
            if(store.states.auth == 'auth') {
                return <Auth store={store} />
            }
        }
    }
});