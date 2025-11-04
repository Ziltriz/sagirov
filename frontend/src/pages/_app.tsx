import 'dayjs/locale/ru';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/charts/styles.css';
import '@/styles/document.scss';
import '@mantine/notifications/styles.css';
import '@/fonts/museosanscyrl-700.css'

import { observable } from 'mobx'
import { createTheme, MantineProvider, Container } from '@mantine/core';
import { I18n, I18nProvider } from 'next-localization';

import Store from "@/core/store/"
import Preloader from "@/components/parts/preloader"
import Error from '@/components/parts/error'
import Theme from '@/theme'
import localesCore from '@/core/locales.json'
import locales from '@/locales.json'
import { initLocales } from '@/core/modules/Locales'
import Config from '@/config'
import { Notifications } from '@mantine/notifications';



const i18n = I18n(initLocales(
  Config.locales,
  [localesCore, locales]
));

const store = observable({
  ...Store,
  ...{ locale: Config.locale }
})

const App = ({ Component }) => {
  return (
    <I18nProvider i18nInstance={i18n} locale={Config.locale}>
      <MantineProvider theme={createTheme(Theme)}>
      <Notifications position="bottom-left" autoClose={3000} />
        <Container fluid>
          <main className="main">  <Component store={store} /> </main>
          <Error store={store} />
          <Preloader store={store} />
        </Container>
      </MantineProvider>
    </I18nProvider>
  );
};

export default (App);