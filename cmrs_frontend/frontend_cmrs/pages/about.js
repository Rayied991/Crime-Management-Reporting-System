import Link from "next/link";
import Image from 'next/image';
import Layout from "./layout";

export default function ABOUT(){
    return (
        <>
        <Layout page="ABOUT">
        <h1>About Us</h1>
        
        <Image
        src="/Pic.jpg"
        alt="Picture of the Devolopers who develops this site"
        width={200}
        height={200}
        />
</Layout>
        </>
    )
}