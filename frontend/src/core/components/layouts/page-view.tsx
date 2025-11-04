import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Grid, Box } from '@mantine/core';
import { useRouter as useRouterRouter } from 'next/router';

import AuthProvider from '@/core/context/authProvider';
import GridText from '@/core/components/layouts-parts/gridcol'
import StatsCard from '@/core/components/layouts-parts/gridcard'
import { httpRequest } from '@/core/modules/Http';
import { notifications } from '@mantine/notifications';
import { SchemaAdvantage } from '@/request/Advantage';

type Advantage = {
  id: number;
  title: string;
  value: string;
  subtitle: string;
  order?: number;
};

type Props = {
  section?: string;
  store?: any;
  name?: string;
  description?: string;
  href?: string;
  breadcrumps?: any;
  content?: any;
};

export default observer(({
  section = "",
  store,
  name,
  description,
  href,
  breadcrumps,
  content
}: Props) => {

  const router = useRouterRouter();
  const slug = Array.isArray(router.query.slug) ? router.query.slug[0] : (router.query.slug as string | undefined) || null;
  const [advantages, setAdvantages] = useState<Advantage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAdvantages = async () => {
      let response 
       try {
          response = await httpRequest(
            SchemaAdvantage,  {}
          )


        const data = await response.data;
        
        // Сортируем по order если есть, иначе по id
        const sortedAdvantages = data.sort((a: Advantage, b: Advantage) => {
          return (a.order ?? a.id) - (b.order ?? b.id);
        });

        setAdvantages(sortedAdvantages);
      } catch (error) {
        console.error('Error loading advantages:', error);
        notifications.show({
          title: 'Ошибка',
          message: 'Не удалось загрузить преимущества',
          color: 'red',
        });
        
        // Fallback данные на случай ошибки
        setAdvantages([
          { id: 1, title: "мы", value: "1", subtitle: "на рынке" },
          { id: 2, title: "гарантируем", value: "50%", subtitle: "безопасность" },
          { id: 3, title: "календарик за", value: "2001", subtitle: "г. в подарок" },
          { id: 4, title: "путешествие", value: "597", subtitle: "дней" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadAdvantages();
  }, []);

  if (loading) {
    return (
      <AuthProvider store={store}>
        <Box
          component="img"
          src="/space.png"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: 'auto',
            minWidth: '100%',
            minHeight: '100%',
            objectFit: 'cover'
          }}
        />
        <Grid>
          <Grid.Col span={3} offset={3} style={{
            display: 'flex', 
            alignItems: 'center', 
            justifySelf: 'right', 
            justifyContent: 'flex-end', 
            marginTop: '10rem'
          }}>
            <div style={{ width: '100%', maxWidth: 480 }}>
              <div style={{ textAlign: 'center', color: 'white' }}>Загрузка преимуществ...</div>
            </div>
          </Grid.Col>
        </Grid>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider store={store}>
       <Box
        component="img"
        src="/space.png"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: 'auto',
          minWidth: '100%',
          minHeight: '100%',
          objectFit: 'cover'
        }}
      />
      
      <Grid>  
        <GridText>

        </GridText>
     
        <Grid.Col span={3} offset={3} style={{
          display: 'flex', 
          alignItems: 'center', 
          justifySelf: 'right', 
          justifyContent: 'flex-end', 
          marginTop: '10rem'
        }}>
          <div style={{ width: '100%', maxWidth: 480 }}>
            <Grid style={{
              display: 'flex', 
              alignItems: 'center', 
              justifySelf: 'right', 
              justifyContent: 'flex-end', 
              marginLeft: 'auto'
            }}>
              {advantages.map((advantage) => (
                <Grid.Col key={advantage.id} span={6}>
                  <StatsCard 
                    smallLabel={advantage.title}
                    big={advantage.value}
                    caption={advantage.subtitle}
                  />
                </Grid.Col>
              ))}
            </Grid>
          </div>
        </Grid.Col>
      </Grid>
    </AuthProvider>
  );
});