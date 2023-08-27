import Landing_Page from "./Admin/Landing_Page";
import dynamic from "next/dynamic";
const Layout = dynamic(() => import('./Layout/layout'), {
  ssr: false,
})
const Title = dynamic(() => import('./Layout/title'), {
  ssr: false,
})

export default function Home() {
  return (
    <>
    <Title page="Landing Page"/>
    <Landing_Page></Landing_Page>
  
     
     
     

    </>
  )
}



