import Cookies from 'js-cookie'
import { httpRequest, httpRequestAuth } from '@/core/modules/Http'

import SchemaAuth from '@/request/Auth'
import { SchemaVerifyTwoFactor } from '@/request/Auth'
import SchemaIsAuth from '@/request/IsAuth'
import { Schema } from '@/request/User'

import Config from "@/config"

export const setAccessId = (id) => {

    if (typeof id === 'string') {
        Cookies.set(
            'accessId',
            id,
            {
                path: '/'
            }
        );
    }

}

export const setAccessToken = (token) => {

    if (typeof token === 'string') {
        Cookies.set(
            'accessToken',
            token,
            {
                path: '/'
            }
        );
    }

}

export const setAccessTokenAt = (token) => {

    if (typeof token === 'number' || typeof token === 'string') {
        Cookies.set(
            'accessTokenAt',
            token,
            {
                path: '/'
            }
        );
    }

}

export const removeAccessToken = () => {

    if (Cookies.get('accessToken')) {
        Cookies.remove('accessToken');
    }

}

export const removeAccessTokenAt = () => {

    if (Cookies.get('accessTokenAt')) {
        Cookies.remove('accessTokenAt');
    }

}

export const removeAccessId = () => {

    if (Cookies.get('accessId')) {
        Cookies.remove('accessId');
    }

}


export const getAccessTokenAt = () => {

    return parseFloat(Cookies.get('accessTokenAt'));

}

export const getAccessToken = () => {

    return Cookies.get('accessToken');

}

export const getAccessId = () => {

    return Cookies.get('accessId');

}

export const isAuth = () => {

    let token = getAccessToken()

    if (typeof token === "string") {

        let result = httpRequestAuth(SchemaIsAuth, getAccessToken())

        return result.then((data) => {

            let auth = true

            if (data.hasOwnProperty('data') == true) {

                if (data.data.hasOwnProperty('success') == true) {

                    auth = data.data.success

                }

            }

            return auth


        }, (error) => {

            console.error(error)

        })

    }

}

export const authUser = (values) => {

    let result = httpRequest(SchemaAuth, values)

    return result.then((data) => {

        return data

    }, (error) => {

        console.error(error);

        return error

    });

}

export const getUser = () => {

    let token = getAccessToken(),
        id = getAccessId()

    if (typeof token === "string" && typeof token === "string") {

        return httpRequestAuth(Schema, token, {
            ...Schema.values,
            ...{
                id: id
            }
        }).then((data) => {

            if (typeof (data.data) == 'object') {

                if (data.data.hasOwnProperty('user') == true) {

                    return data.data.user

                }
            }
        }).catch((error) => {
            if (error.response?.status === 401) {
                removeData()
            }
        })
 
    }

}

export const removeData = () => {

    removeAccessToken()
    removeAccessTokenAt()
    removeAccessId()

}

export const pollingToken = (store, router, refferer = '') => {

    isAuth().then((result) => {

        if (result == true) {

            setInterval(() => {

                isAuth().then((result) => {

                    if(result == false) {

                       removeData()
                       router.push('/' + ( refferer.length ? '?refferer=' + refferer : '' ))

                    }

                })

            }, Config.intervalAuth * 1000)

        } else {

            removeData()
            router.push('/' + ( refferer.length ? '?refferer=' + refferer : '' ))

        }

    })

}



export const verifyTwoFactor = async (data: {
  user_id: string;
  code: string;
}) => {
  try {
 
    const response = await httpRequest(
      SchemaVerifyTwoFactor,
      {
        user_id: data.user_id,
        code: data.code
      },
    );

    return {

      data: {
        success: response.data.success,
        session: response.data.session,
        session_at: response.data.session_at,
        id: response.data.id
      }
    };
  } catch (error) {
    console.error('Two-factor verification failed:', error);
    return {
      success: false,
      error: error.response?.data?.detail || 'Ошибка верификации'
    };
  }
};