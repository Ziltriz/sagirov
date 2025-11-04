import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

import AuthProvider from "@/core/context/authProvider";
import { removeData } from "@/core/models/User"

export default observer(({ store }) => {

    const router = useRouter();
    const name = "logout" 

    const logout = () => {
        if(typeof(window) != 'undefined' && store.states.is_auth == true) {
            
            removeData()
            router.reload()
        }

    }

    return ( <AuthProvider store={store}> {logout()} </AuthProvider> );

})

