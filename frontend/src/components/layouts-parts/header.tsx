import { Flex, Box, Anchor } from '@mantine/core';
import { useRouter as useRouterRouter  } from 'next/router'


import { getRootPath, getUri } from '@/core/modules/Url'

import Logo from '@/components/parts/logo'
import Classes from '@/styles/layouts-parts/header.module.scss'
import { useEffect, useState } from 'react';
import { httpRequest } from '@/core/modules/Http';
import { SchemaMenu } from '@/request/Menu';
import { notifications } from '@mantine/notifications';


type MenuItem = {
    key: string;
    label: string;
    href: string;
  };
  
  const defaultMenu: MenuItem[] = [
    { key: 'home', label: 'Главная', href: '/' },
    { key: 'tech', label: 'Технология', href: '/technology' },
    { key: 'schedule', label: 'График полетов', href: '/schedule' },
    { key: 'guarantees', label: 'Гарантии', href: '/guarantees' },
    { key: 'about', label: 'О компании', href: '/about' },
    { key: 'contacts', label: 'Контакты', href: '/contacts' },
  ];


export default ({ menu = defaultMenu }: { menu?: MenuItem[] }) => {
    const router = useRouterRouter();
    const [opened, setOpened] = useState(false);
    const [items, setItems] = useState<MenuItem[]>(menu); 


    const isActive = (href: string) => {
        try {
        const u = new URL(href, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
        return u.pathname === getUri(router.asPath);
        } catch (e) {
        // fallback: прямое сравнение
        return href === getUri(router.asPath);
        }
    };

    

    useEffect(() => {
        const loadMenu = async () => {
            let response
            let data 
            try {
              response = await httpRequest(SchemaMenu, {});
              
              // Проверяем что response существует
              if (!response) {
                  throw new Error('No response received');
              }
               
              data = response.data;
              // Дальнейшая обработка данных
              
            } catch (error) {
                notifications.show({
                    title: 'Ошибка',
                    message: `Ошибка загрузки меню: ${error}`,
                    color: 'red'
                });
            }
            
            const mapped = data.map((it: any) => {
                // safe defaults
                const id = it.id ?? Math.random().toString(36).slice(2, 9);
                const title = it.title ?? '';
                const url = it.url ?? '/';
                return {
                  key: String(id),
                  label: String(title),
                  href: String(url),
                } as MenuItem;
              });
          
              // Optionally sort by order if provided
              mapped.sort((a: any, b: any) => {
                const ai = data.find((d: any) => String(d.id) === a.key);
                const bi = data.find((d: any) => String(d.id) === b.key);
                const ao = ai?.order ?? 0;
                const bo = bi?.order ?? 0;
                return ao - bo;
              });
          
              setItems(mapped.length ? mapped : defaultMenu);

        }
        loadMenu();
    }, [])

    const handleNavClick = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        setOpened(false);
        router.push(href);
    };


    return (
        <Flex className={Classes.header}>
            <Box className={Classes.logo}>
                <Anchor href="/" > 
                    <Logo className={Classes.logofile} /> 
                </Anchor> 
            </Box>
            <Box className={Classes.center}>
            <nav className={Classes.nav}>
            {items.map(item => ( // Используем items вместо menu
                <Anchor
                    key={item.key}
                    href={item.href}
                    className={`${Classes.navItem} ${isActive(item.href) ? Classes.active : ''}`}
                    underline='never'
                    onClick={(e) => handleNavClick(e, item.href)}
                >
                    {item.label}
                </Anchor>
            ))}

            </nav>
        </Box>
        </Flex>
    )

}