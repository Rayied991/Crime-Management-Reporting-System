import Header  from "./header";
import Footer  from "./footer";


export default function Police_Layout({children}) {
  //  title = props.title;
  return (
    <>
    <Header/>
      <div 
      className="main"
      >{children}</div>
     <Footer/>
    </>
      

  );
}