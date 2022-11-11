import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body>
          <div id="modals" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
