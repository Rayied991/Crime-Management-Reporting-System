
import Head from "next/head"
export default function _Title(props){


    return(
        <>
            <Head>
            <script src="https://cdn.tailwindcss.com"></script>
           
    <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.css" rel="stylesheet" />
    
  
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"></script>
    
                <title>{props.title}</title>
            </Head>
        
        </>
    )
}