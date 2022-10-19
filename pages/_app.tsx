import '../lib/styles/reset.scss';
import '../lib/styles/typography.css';
import '../lib/styles/root.scss';
import '../lib/styles/global.scss';
import Head from 'next/head';
import { FC } from 'react';
import { AppProps } from 'next/app';

export const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Connect Four Next</title>
      </Head>

      <div className="app">
        <Component {...pageProps} />
      </div>

      <style jsx>{`
        .app {
          height: 100%;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default App;
