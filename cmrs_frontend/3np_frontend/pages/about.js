import Link from "next/link";
import Image from 'next/image';
import Layout from "./Layout/layout";

export default function ABOUT(){
    return (
        <>
        <Layout page="About">
        <h1>About Us</h1>
        <Link href="/"> Home</Link><br></br>
        <Image
        src="/AIUB.jpg"
        alt="Picture of the Author"
        width={1920}
        height={1080}
        />
</Layout>
        </>
    )
}