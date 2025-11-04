import { observer } from 'mobx-react-lite'
import { createContext, useEffect, useState } from "react";
import { useRouter as useRouterRouter } from 'next/router'
import { useRouter } from 'next/navigation';
import { getUri } from '@/core/modules/Url'
import { pollingToken, getUser } from '@/core/models/User'

const AuthContext = createContext();

const AuthProvider = observer(({ store, children }) => {

  const router = useRouter();
  const path = useRouterRouter().asPath;
  const pathClean = getUri(path);
  const [init, setInit] = useState(false);
  const [auth, setAuth] = useState(undefined);
  const [polling, setPolling] = useState(false);

  useEffect(() => {
    if (typeof (store) == 'object' && init == false) {
      setAuth((store.user.accessToken ? true : false))
      setInit(true)
    }
  })

  useEffect(() => {

    if (init == true) {

      if (auth == true) {

        getUser().then((data) => {

          if (typeof (data) == 'object') {

            store.user.user = {
              ...data
            }

            store.states = {
              ...store.states,
              ...{ loader: false, is_auth: true, init: true }
            }

            if (polling == false) {
              pollingToken(store, router, btoa(path))
              setPolling(true)
            }
          }

        }, (error) => {

          console.error(error)

        })

      } else if (pathClean != '/' && pathClean != '/password') {

        if (pathClean == '/logout') {
          router.push('/')
        } else {
          router.push('/?refferer=' + btoa(path))
        }

      } else {

        store.states = {
          ...store.states,
          ...{
            loader: false,
            load: true,
            init: true
          }
        }

      }
    }

  }, [auth])

  if (store.states.is_auth == true || store.states.load == true) {
    return (
      <AuthContext.Provider> {children} </AuthContext.Provider>
    );
  } else {
    return (
      <AuthContext.Provider> </AuthContext.Provider>
    );
  }

});

export default AuthProvider;