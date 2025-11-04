import Classes from '@/core/styles/layouts-parts/sidebar.module.scss'

import { IconUserSearch,  IconLogout, IconSettings, IconExchange } from '@tabler/icons-react';

import Translate from '@/core/components/translate'

import Config from '@/config'


export default [
    {
        code: "info",
        title: <Translate code="headlings.info" />,
        href: Config.rootPath + 'info',
        icon : ( <IconUserSearch className={Classes.ico} /> )
    }
    ,{
        access_roles: ['root', 'user'],
        code: "settings",
        codes: ['profile'],
        title: <Translate code="headlings.settings" />,
        href: Config.rootPath + 'profile',
        icon : ( <IconSettings className={Classes.ico} /> ),
        children: [
            {
                access_roles: ['root', 'user'],
                code: "profile",
                title: <Translate code="headlings.profile" />,
                href: Config.rootPath + 'profile'
            },
        ],
    },
    {
        access_roles: ['all'],
        code: "exchange",
        title: <Translate code="headlings.monitor_exchange" />,
        href: Config.rootPath + 'exchange/' + 'binance',
        icon: (<IconExchange data-variant="exchange" className={Classes.ico} />),

    }
    ,{
        access_roles: ['all'],
        code: "logout",
        title: <Translate code="auth.logout" />,
        href: '/logout',
        icon : ( <IconLogout data-variant="logout" className={Classes.ico} /> )
    }
    //{
        // code: 'example',
        // title: 'Пример',
        // href: Config.rootPath + 'example',
        // icon: ( <SettingsIcon className={Classes.ico} /> ),
        // children: [
        //     {
        //         code: 'example',
        //         title: 'example child',
        //         href: Config.rootPath + 'example-child',
        //     }
        // ],
        // children_schema: {
        //     schema: SchemaSidebarPage,
        //     href: Config.rootPath + 'edit/%id%'
        // }
    //}
]