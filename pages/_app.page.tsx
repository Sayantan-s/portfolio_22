import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { felix } from '@styles/font';

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
