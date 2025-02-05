import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import localFont from 'next/font/local';
const felix = localFont({
  src: [
    {
      path: '../public/font/Fellix-SemiBold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../public/font/Fellix-Light.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../public/font/Fellix-Black.woff2',
      weight: '900',
      style: 'normal'
    },
    {
      path: '../public/font/Fellix-ExtraBold.woff2',
      weight: '800',
      style: 'normal'
    },
    {
      path: '../public/font/Fellix-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../public/font/Fellix-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/font/Fellix-Bold.woff2',
      weight: 'bold',
      style: 'normal'
    }
  ]
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <main className={felix.className}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}

export default MyApp;
