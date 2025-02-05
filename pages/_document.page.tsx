import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import { felix } from '@styles/font';
import { twMerge } from 'tailwind-merge';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body>
          <div id="modals" className={twMerge(felix.className, 'relative')} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
