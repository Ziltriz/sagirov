let role = 'root',
    roles = 'root,customer,user'


export default {
    roleMain: (process.env.hasOwnProperty('NEXT_PUBLIC_ROLE_MAIN') == true ? parseInt(process.env.NEXT_PUBLIC_ROLE_MAIN) : role),
    roles: (process.env.hasOwnProperty('NEXT_PUBLIC_ROLES') == true ? parseInt(process.env.NEXT_PUBLIC_ROLES) : roles),
    autoReload: (process.env.hasOwnProperty('NEXT_PUBLIC_AUTO_RELOAD') == true ? Bool(process.env.NEXT_PUBLIC_AUTO_RELOAD) : true),
    autoReloadInterval: (process.env.hasOwnProperty('NEXT_PUBLIC_AUTO_RELOAD_INTERVAL') == true ? process.env.NEXT_PUBLIC_AUTO_RELOAD_INTERVAL : 10000),
    limitItems: (process.env.hasOwnProperty('NEXT_PUBLIC_LIMIT_ITEMS') == true ? process.env.NEXT_PUBLIC_LIMIT_ITEMS : 10),
    intervalAuth: (process.env.hasOwnProperty('NEXT_PUBLIC_INTERVAL_AUTH') == true ? process.env.NEXT_PUBLIC_INTERVAL_AUTH : 60 * 1),
    localStorageCache: (process.env.hasOwnProperty('NEXT_PUBLIC_LOCAL_STORAGE_CACHE') == true ? process.env.NEXT_PUBLIC_LOCAL_STORAGE_CACHE : 60 * 60 * 24),
    // hostUrl: (process.env.hasOwnProperty('NEXT_PUBLIC_API_URL') == true ? process.env.NEXT_PUBLIC_HOST_URL : 'http://localhost:8001'),
    apiUrl: (process.env.hasOwnProperty('NEXT_PUBLIC_API_URL') == true ? process.env.NEXT_PUBLIC_API_URL : 'http://sagirov:8003/api/'),
    // apiUrl: (process.env.hasOwnProperty('NEXT_PUBLIC_API_URL') == true ? process.env.NEXT_PUBLIC_API_URL : 'http://5.129.200.135:8001/api/'),
    // imageUrl: (process.env.hasOwnProperty('NEXT_PUBLIC_API_URL') == true ? process.env.NEXT_PUBLIC_IMAGE_URL : 'http://localhost:8001/image'),
    rootPath: (process.env.hasOwnProperty('NEXT_PUBLIC_ROOT_PATH') == true ? process.env.NEXT_PUBLIC_ROOT_PATH : ''),
    locale: (process.env.hasOwnProperty('NEXT_PUBLIC_LOCALE') == true ? process.env.NEXT_PUBLIC_LOCALE : 'ru'),
    locales: (process.env.hasOwnProperty('NEXT_PUBLIC_LOCALES') == true ? process.env.NEXT_PUBLIC_LOCALES : 'ru'),
    encode: (process.env.hasOwnProperty('NEXT_PUBLIC_ENCODE') == true ? process.env.NEXT_PUBLIC_ENCODE : 'UTF-8'),
    timezone: (process.env.hasOwnProperty('NEXT_PUBLIC_TZ') == true ? process.env.NEXT_PUBLIC_TZ : 'Europe/Moscow'),
    viewport: (process.env.hasOwnProperty('NEXT_PUBLIC_VIEWPORT') == true ? process.env.NEXT_PUBLIC_VIEWPORT : "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"),
    date_format: ( process.env.hasOwnProperty('NEXT_PUBLIC_DATE_FORMAT') == true ? process.env.NEXT_PUBLIC_DATE_FORMAT : 'DD.MM.YYYY'),
    datetime_format: ( process.env.hasOwnProperty('NEXT_PUBLIC_DATETIME_FORMAT') == true ? process.env.NEXT_PUBLIC_DATETIME_FORMAT : 'DD.MM.YYYY hh:mm:ss'),
    week_list: ( process.env.hasOwnProperty('NEXT_PUBLIC_WEEK_LIST') == true ? process.env.NEXT_PUBLIC_WEEK_LIST : 'monday, tuesday, wednesday, thursday, friday, saturday, sunday'),
    week_list_evereday: ( process.env.hasOwnProperty('NEXT_PUBLIC_WEEK_LIST_EVEREDAY') == true ? process.env.NEXT_PUBLIC_WEEK_LIST_EVEREDAY : true),
}