import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const getInitialProps = createGetInitialProps();

import Config from '@/config'

class _Document extends Document {

  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang={Config.locale} className="html">
        <Head>
          <meta charSet={Config.encode} />
          <meta name="viewport" content={Config.viewport} />
          <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <meta name="apple-mobile-web-app-title" content="INS" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
        </Head>
        <body className="body" >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

}

export default _Document