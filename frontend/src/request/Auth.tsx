
import { lenghtNotNullValidate } from '@/core/modules/Validate'

import Common from '@/core/request/Common'
import { json } from 'stream/consumers';

export default {
    ...Common,
    ...{
        name: 'auth',
        uri: '/webauth',
        method: 'post',
        values: {
            username: '',
            password: ''
        },
        types: {
            username: 'text',
            password: 'password'
        },
        labels: {
            username: 'login',
            password: 'password'
        },
        required: ['username', 'password'],
        validate: {
            username: lenghtNotNullValidate,
            password: lenghtNotNullValidate
        }
    }
}

export const SchemaVerifyTwoFactor = {
    name: 'verify_two_factor',
    uri: '/webauth/verify-two-factor',
    method: 'POST',
    values: {
      user_id: '',
      code: ''
    },
    labels: {
      user_id: 'User ID',
      code: 'Verification Code'
    },
    response: {
      success: 'boolean',
      session: 'string',
      session_at: 'string',
      id: 'string'
    },
    errorMessages: {
      400: 'Неверный код подтверждения',
      401: 'Код устарел',
      404: 'Пользователь не найден',
      500: 'Ошибка сервера при верификации'
    }
  };