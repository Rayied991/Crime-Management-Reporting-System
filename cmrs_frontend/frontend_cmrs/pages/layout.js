import Header from "./header"
import Navigation from "./navigation"
import Footer from "./footer"
import React from "react"


export default function Layout({children},props){//component
    //layout parent component
      return (
        <>
        <Header> 
        
             <title>{props.page}</title> 

             
        </Header>
    
        <Navigation></Navigation>
        {children}
        <Footer></Footer>
        {/* </body> */}
        </>
      )
    }