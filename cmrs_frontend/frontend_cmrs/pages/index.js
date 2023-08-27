import Image from 'next/image';

import ABOUT from './about';
import Layout from "./layout";

//const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Layout page="Home">
      <h2> Welcome Our Page</h2>
      <center>
      <Image
        src="/LogoPolice.png"
        alt="logo"
        width={500}
        height={500}
        />
        </center>
      </Layout>
    
    </>
    
  )
}
