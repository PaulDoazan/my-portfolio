import '../styles/global.css'
import type { AppProps } from 'next/app'
import { wrapper } from "../store/store";
import { Analytics } from '@vercel/analytics/react';

function App({ Component, pageProps }: AppProps) {
  return
  <>
    <Component {...pageProps} />
    <Analytics />
  </> 
  
}

export default wrapper.withRedux(App);
