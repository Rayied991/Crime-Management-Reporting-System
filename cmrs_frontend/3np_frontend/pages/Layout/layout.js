import React from "react"
import Header from "./header"
import Footer from "./footer"
import NotFound from "../404"
import dynamic from 'next/dynamic'

  const Title = dynamic(() => import('../Layout/title'), {
    ssr: false,
  })

export default function Layout({children},props){//component
//layout parent component
  return (
    <>
    {/* <head  > 
   

    </head> */}
    <Header>
    <title>My Web Page- {props.page}</title>
    </Header>
    

   
    
    {/* <Navigator></Navigator> */}
    {children}
    {/* <Footer/> */}
    {/* </body> */}
    </>
  )
}