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
    <Title page="Home">
  
     </Title>
     <Layout></Layout>
     

    </>
  )
}
