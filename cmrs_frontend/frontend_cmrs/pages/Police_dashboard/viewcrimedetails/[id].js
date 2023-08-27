import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/pages/utils/authcontext";

/*const Layout = dynamic(() => import('../../Layout/layout'), {
    ssr: false,
  })
  const Title = dynamic(() => import('../../Layout/title'), {
    ssr: false,
  })

*/
const Layout = dynamic(() =>
  import("../../police_layout/police_layout"),{
    ssr: false,
  }
  
);
/*
const _Profile_Navigation = dynamic(() =>
  import("../police_layout/profile_navigation")
);*/

const _Title = dynamic(() => import("../../title"),{
    ssr: false,
  });

export default function Policeprofile()
{
    const router = useRouter();

    const [criminal_phonenumber, setCriminalName] = useState();
    const [Details, setCriminalEmail] = useState("");
    const [police, setCriminalCaptureDate] = useState("");
    const [wantedlist2, setWantedListNo] = useState();
    
    const [CollectedpostData, setCollectedpostData] = useState(null);
    const [isFormComplete, setIsFormComplete] = useState(false);
    
  const aid =router.query.id;
  console.info("Police id line(23)= " + router.query.id); // Working


  useEffect(() => {
    fetchVictimdata();
    
  }, [router.query.id]);

    // * Collect  Data
    useEffect(() => {
        if (CollectedpostData !== null) {
          console.log("Collected post Data:", CollectedpostData);
         
          setCriminalName(CollectedpostData.criminal_phonenumber);
          setCriminalEmail(CollectedpostData.Details);
          setCriminalCaptureDate(CollectedpostData.police);
          setWantedListNo(router.query.wantedlist2);
         
         
         



          console.log("criminal_phonenumber:", CollectedpostData.criminal_phonenumber);
          console.log("Details :", CollectedpostData.Details);
          console.log("police :", CollectedpostData.police);
          console.log("wantedlist2 :", CollectedpostData.wantedlist2);
         
         
          
         
        }
      }, [CollectedpostData]);

      useEffect(() => {
        // Check if all required fields are filled
        const allFieldsFilled =
        criminal_phonenumber && Details && police && wantedlist2   ;
    
        setIsFormComplete(allFieldsFilled);
      }, [criminal_phonenumber,Details,police,wantedlist2]);
      
    
      const fetchVictimdata = async () => {
        try {
          const response = await axios.get(
            // `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/adminprofile/${aid}`
            "http://localhost:3000/police/scrimedetails/" + router.query.id,
            // { withCredentials: true }
          );
          const data = response.data;
          console.info("Fetched Police Data:", data);
    
          // Update the CollectedBookData state
          if (data != null) {
            setCollectedpostData(data);
            //setBook_Image(data.Book_Image);
          }
        } catch (error) {
          console.error("Error fetching Police data:", error);
        }
      };
//PUT method
const handleSubmit = async (e)=>{
  e.preventDefault();
  //update 
  const formData = new FormData();
  formData.append("criminal_phonenumber", criminal_phonenumber);
  formData.append("criminal_email", Details);
  formData.append("police", police);
  formData.append("wantedlist2", wantedlist2);
 
  
 
  
  
  console.log(formData); // Working

  try {
    console.log("Posting Data...");

    const response = await axios.put(
      "http://localhost:3000/police/updatecrimedetails/" + router.query.id,
      {
        
        criminal_phonenumber: criminal_phonenumber,
          
        Details:Details,
        police: police,
        wantedlist2:wantedlist2,
         
        
          
         
      
        
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);

    if (response.data) {

      console.info("Data Has been Updated");
  
      // TODO: Reload the Page Here
  
      router.push({
  
        pathname: "/Police_dashboard/viewcrimedetails/" + router.query.id,
  
      });
  
    } else {
  
      console.info("Failed to Update");
  
      router.push({
  
        pathname: "error",
  
      });
  
    }
  
  } catch (error) {
  
    console.error("Error Upload", error);
  
  }
  
  
  
  
  
  
  
  
  
  
  
  };


  
const handleDelete = async () =>

{

  try{

    if(wantedlist2)

    {

      const res = await axios.delete(

        `http://localhost:3000/police/delete_crimedetails/${wantedlist2}`,
        {
          withCredentials: true
        }
      );

      //);  
    
      console.log("Deleted Or Not? = " + res);

      // You might want to refresh the book list after deletion

      // You can call fetchBookImages() again or refetch data here

      // fetchBookImages();

      setWantedListNo(null); // Reset selected book ID

      window.location.reload(); 

    } 

  }

  catch (error) {

    console.error("Error deleting complain:", error);

  }

} 
  

const set_CriminalName = (e)=> {
    setCriminalName(e.target.value);
}
const set_CriminalEmail = (e) => {
    setCriminalEmail(e.target.value);
};

const set_CriminalCaptureDate = (e) => {
    setCriminalCaptureDate(e.target.value);
};
const set_WantedListNO = (e) => {
    setWantedListNo(e.target.value);
};











return(

<>
<_Title title= "View Upadete Delete Crime Details" />
<Layout >

<nav class="bg-gray border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    {/* <a href="https://flowbite.com/" class="flex items-center"> */}
        {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" /> */}
        {/* <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span> */}
    {/* </a> */}
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        {/* <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14"> */}
            {/* <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/> */}
        {/* </svg> */}
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      
        <li>
        <button type="button" onClick={() => router.back()}



class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Back</button> 
        </li>
       
      </ul>
    </div>
  </div>
</nav>

<section class="bg-gray-50 dark:bg-gray-900  bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 text-white">
            {/* <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/> */}
           Update and Delete Crime Details   
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Crime Details Information
                </h1>


<form onSubmit={handleSubmit} >

<div>
<label htmlFor="criminal_phonenumber">Criminal Phone Number :</label>
 <input 
 type="number"
 id="criminal_phonenumber"
 placeholder={CollectedpostData?.criminal_phonenumber}
 value={criminal_phonenumber}
 onChange={set_CriminalName} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""/>
 
</div>

<div>
        <label htmlFor="Details">Criminal Details:</label>
        <input type="text" 
        placeholder={CollectedpostData?.Details}
        id="Details" 
        value={Details}
       onChange={set_CriminalEmail} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""/>
       
          {/* {errors.name && <p >FName is required</p>} */}
        </div>


        <div>
        <label htmlFor="police"> Police Username :
        </label>
        <input type="text" 
        placeholder={CollectedpostData?.police} 
        id="police" 
        value={police}
        onChange={set_CriminalCaptureDate} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""/>
       
         {/* {errors.email && (
                    <p>
                      {errors.email.type === 'required'
                        ? 'Email is required'
                        : 'InvalAdminId email address'}
                    </p>
                                      )} */}
        </div>


<div>
        <label htmlFor="wantedlist2">Wanted Criminal NO :</label>
        <input type="number" 
        placeholder={CollectedpostData?.wantedlist2}
        id="wantedlist2" 
        value={wantedlist2}
       onChange={set_WantedListNO} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""/>
     
          {/* {errors.name && <p >FName is required</p>} */}
        </div>


 <br></br><br></br>

       
        <div className="text-center">
                  <button
                    
                    type="submit"
                    disabled={!isFormComplete}
                    value="Update " class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Update Crime Details </button>
                 
                </div>
            {/* You can open the modal using AdminId.showModal() method */}
      {/* <button className="btn" >open modal</button> */}
      {/* <dialog AdminId="confirm_Delete" className="modal">
        <form method="dialog" className="modal-box"> */}
          {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button> */}
          {/* <h3 className="font-bold text-lg">Confirm Delete?</h3>
          <p className="py-4">Are you sure that you want to delete it?</p> */}
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            {/* <button onClick={ handleDelete } className="btn">
              Delete
            </button> */}
          </div>


          <div className="text-center">
  
  {/* if there is a button in form, it will close the modal */}

  <button onClick={ handleDelete } class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete Wanted list</button>

   
</div>

</form>
</div>
</div>
</div>
</section>

</Layout >








</>


)



}
