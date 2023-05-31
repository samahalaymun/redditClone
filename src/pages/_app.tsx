import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react';
import {theme} from "../chakra/theme";
import Layout from '../components/Layout/Layout';
import { RecoilRoot } from 'recoil';
import dynamic from "next/dynamic";

const DynamicChakraProvider = dynamic(
  () => import("@chakra-ui/react").then((mod) => mod.ChakraProvider),
  {
    ssr: false,
  }
);
function MyApp({ Component, pageProps }: AppProps)  {
   return (
     <RecoilRoot>
       <DynamicChakraProvider theme={theme}>
         <Layout>
           <Component {...pageProps} />
         </Layout>
       </DynamicChakraProvider>
     </RecoilRoot>
   ); 
  
}

export default MyApp
