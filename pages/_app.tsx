import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const inter = Inter({ subsets: ["latin"] });
const queryclient=new QueryClient()
export default function App({ Component, pageProps }: AppProps) {
  return (
    < div className={inter.className} >
      <QueryClientProvider client={queryclient}>
      <GoogleOAuthProvider clientId='611289805673-dbev6l710fsjpc3ejq1mh5n771829mvv.apps.googleusercontent.com'>
        <Component {...pageProps} />
          <Toaster />
          <ReactQueryDevtools/>
        </GoogleOAuthProvider>
        </QueryClientProvider>
    </div>
  )
   
}
