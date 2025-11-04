import { lenghtNotNullValidate} from '@/core/modules/Validate'
import Common from '@/core/request/Common'
import { config } from 'process';

export const SchemaProfile = {
    ...Common,
    ...{
        name: 'profile',
        uri: 'users/get_profile',
        values: {
            user: {
                id: '',
                login: '',
                role: '',
                created_at: '',
                active: false,
                telegram_id: ''
            },
            api_keys: [],
            configs: [],
            tasks: [],
            orders: [],
            balance: [] 
        },
        types: {
            user: {
                id: 'text',
                login: 'text',
                role: 'text',
                created_at: 'text',
                active: 'boolean',
                telegram_id: 'text'
            },
            api_keys: 'array',
            configs: 'array',
            tasks: 'array',
            orders: 'array',
            balance: 'array'
        },
        labels: {
            user: {
                id: 'ID',
                login: 'Логин',
                role: 'Роль',
                created_at: 'Дата создания',
                active: 'Активен',
                telegram_id: 'Telegram ID'
            },
            api_keys: 'API Ключи',
            configs: 'Конфигурации',
            tasks: 'Задачи',
            orders: 'Ордера',
            balance: 'Баланс'
        },
        disabled: ['user.id', 'user.login', 'user.role', 'user.created_at'],
        required: [],
        validate: {
            user: {
                id: lenghtNotNullValidate,
                login: lenghtNotNullValidate
            }
        },
    
        display: {
            user: {
                created_at: {
                    type: 'date',
                    format: 'DD.MM.YYYY HH:mm'
                },
                active: {
                    type: 'boolean',
                    trueLabel: 'Активен',
                    falseLabel: 'Неактивен'
                }
            },
            api_keys: {
                type: 'table',
                columns: [
                    { field: 'exchange', label: 'Биржа' },
                    { field: 'key', label: 'Ключ', masked: true },
                    { field: 'secret', label: 'Секрет', masked: true }
                ]
            },
            configs: {
                type: 'table',
                columns: [
                    { field: 'name', label: 'Название' },
                    { field: 'exchange', label: 'Биржа' },
                    { field: 'symbol', label: 'Пара' }
                ]
            },
            tasks: {
                type: 'table',
                columns: [
                    { field: 'symbol', label: 'Пара' },
                    { field: 'exchange_id', label: 'Биржа' },
                    { field: 'status', label: 'Статус' }
                ]
            },
            orders: {
                type: 'table',
                columns: [
                    { field: 'symbol', label: 'Пара' },
                    { field: 'exchange', label: 'Биржа' },
                    { field: 'side', label: 'Тип' }
                ]
            },
            balance: {
                type: 'table',
                columns: [
                    { field: 'exchange', label: 'Биржа' },
                    { field: 'asset', label: 'Валюта' },
                    { field: 'free', label: 'Доступно' },
                    { field: 'locked', label: 'Зарезервировано' }
                ]
            }
        },
        balance: {
            type: 'array',
            uri: '/historical/balance',
            display: {
                type: 'table',
                columns: [
                    { field: 'exchange', label: 'Биржа' },
                    { field: 'asset', label: 'Валюта' },
                    { field: 'free', label: 'Доступно' },
                    { field: 'locked', label: 'Зарезервировано' }
                ]
            }
        }
    }
}


export const SchemaLinkTelegram = {
    name: 'link_telegram',
    uri: 'users/link_telegram',
    method: 'POST',
    response: {
        link_token: 'string',
        expires_at: 'string',
        telegram_bot_username: 'string',
        deep_link: 'string'
    },
    errorMessages: {
        400: 'Telegram уже привязан к аккаунту',
        404: 'Пользователь не найден',
        500: 'Ошибка при генерации ссылки для Telegram'
    }
};

export const SchemaUnLinkTelegram = {
    name: 'unlink_telegram',
    uri: 'users/unlink_telegram',
    method: 'POST',
    response: {
        success: 'boolean',
        message: 'string'
    },
    errorMessages: {
        400: 'Telegram не привязан к аккаунту',
        404: 'Пользователь не найден',
        500: 'Ошибка при отвязке Telegram'
    }
};


export const SchemaCreateConfig = {
    ...Common,
    ...{
        name: 'create_config',
        uri: 'users/create_config',
        method: 'POST',
        values: {
            name:'',
            exchange: '',
            timeframe: '1m',
            sequence_length: 15,
            timeoutSettings: {
                market: '5',
                limit: '30',
                stop: '60'
              },
            ttl: 2,
            dep: 100, 
            timeout: 60,
            stop_loss: 2,
            take_profit: 5,
            confidence_threshold_long: 0.7,
            confidence_threshold_short: 0.7,
        },

        required: ['exchange', 'timeout', 'stop_loss', 'take_profit', 
                  'confidence_threshold_long', 'confidence_threshold_short'],
    }
};


export const SchemaDeleteConfig = {
    ...Common,
    ...{
      name: 'delete_config',
      uri: 'users/delete_config/{config_id}',
      method: 'DELETE',
      values: {
        config_id: ''
      },
      required: ['config_id']
    }
  };


export const SchemaUpdateConfig = {
    ...Common,
    name: 'update_config',
    uri: 'users/update_config/{config_id}',
    method: 'PUT',
    values: {
        config_id: '',
        ...SchemaCreateConfig.values
    },
    required: ['config_id', ...SchemaCreateConfig.required]
    
}


export const SchemaDeleteKey = {
    ...Common,
    ...{
      name: 'delete_api_key',
      uri: 'users/delete_key/{id}',
      method: 'DELETE',
      values: {
        id: ''
      },
      required: ['id']
    }
  };

  export const SchemaAddApiKey = {
    ...Common,
    ...{
        name: 'add_api_key',
        uri: 'users/add_key',
        method: 'POST',
        values: {
            use_testnet: true,
            exchange: '',
            api_key: '',
            api_secret: '',
            name: '',
            market: ''
        },
        validate: {
            name: lenghtNotNullValidate,
        },
        required: ['exchange', 'api_key', 'api_secret', 'name', 'market']
    }
  };

export const SchemaAddTask = {
    ...Common,
    ...{
      name: 'add_task',
      uri: '/historical/task-add/',
      method: 'POST',
      values: {
        name: '',
        api_key: '',
        config: '',
        ticket: '',
        leverage: null,
        market_data: null,
      },
      required: ['name','api_key', 'config', 'ticket'],
     
    }
  };
  

  export const SchemaDeleteTask = {
    ...Common,
    ...{
      name: 'delete_task',
      uri: '/historical/task-delete/{id}',
      method: 'DELETE',
      values: {
        id: '',
      },
      required: ['id']
    }
  };

  export const SchemaUpdateTask = {
    ...Common,
    ...{
      name: 'update_task',
      uri: '/historical/update-delete/{id}',
      method: 'POST',
      values: {
        id: '',
        direction: '',
      },
      required: ['id', 'direction']
    }
  };


  export const SchemaEmergencyClose = {
    ...Common,
    ...{
      name: 'emergency_close',
      uri: '/historical/close/{order_id}',
      method: 'POST',
      values: {
        order_id: '',
      },
      required: ['order_id']
    }
  };
  
  export const SchemaEmergencyCloseAll = {
    ...Common,
    ...{
      name: 'emergency_close',
      uri: '/historical/close_all',
      method: 'POST',
    }
  };