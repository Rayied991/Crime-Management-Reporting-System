import dynamic from "next/dynamic";

import { useRouter } from "next/router";

import axios from "axios";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import Image from "next/image";
import { DEFAULT_SANS_SERIF_FONT } from "next/dist/shared/lib/constants";
 
const Layout = dynamic(() =>
  import("../../police_layout/police_layout"),{
    ssr: false,
  }
  
);


const _Title = dynamic(() => import("../../title"),{
    ssr: false,
  });

 

export default function Fetch_Profle()

{

    const router = useRouter();

 

 
  const [criminal_name, setCriminalName] = useState("");
  const [criminal_email, setCriminalEmail] = useState("");
  const [wanted_criminal_no, setWantedListNo] = useState("");
  const [criminal_capture_date, setCriminalCaptureDate] = useState("");
  const [address, setAddress] = useState("");
  const [police_username, setPoliceUname] = useState("");
  
const [CollectedpostData, setCollectedpostData] = useState(null);
const [isFormComplete, setIsFormComplete] = useState(false);

const aid=router.query.id;
console.info("AdminId line(23)= " + router.query.id);

  console.warn("police_username " + router.query.id); // Working

 

 

  useEffect(() => {

    fetchVictimdata();

   

  }, [router.query.id]);

 

    // * Collect  Data

    useEffect(() => {

      if (CollectedpostData !== null) {
        console.log("Collected post Data:", CollectedpostData);
       
        setCriminalName(CollectedpostData.criminal_name);
        setCriminalEmail(CollectedpostData.criminal_email);
        setWantedListNo(router.query.wanted_criminal_no);
        setCriminalCaptureDate(CollectedpostData.criminal_capture_date);
        setAddress(CollectedpostData.address);
        setPoliceUname(CollectedpostData.police_username);
    
       



        console.log("criminal_name:", CollectedpostData.criminal_name);
        console.log("criminal_email :", CollectedpostData.criminal_email);
        console.log("wanted_criminal_no :", CollectedpostData.wanted_criminal_no);
        console.log("criminal_capture_date :", CollectedpostData.criminal_capture_date);
        console.log("address :", CollectedpostData.address);   
        console.log("police_username :", CollectedpostData.police_username);
        
       
      }
    }, [CollectedpostData]);

    useEffect(() => {
      // Check if all required fields are filled
      const allFieldsFilled =
      criminal_name && criminal_email && wanted_criminal_no && criminal_capture_date  && address && police_username ;
  
      setIsFormComplete(allFieldsFilled);
    }, [criminal_name,criminal_email,wanted_criminal_no,criminal_capture_date,address,police_username]);
    
  
    const fetchVictimdata = async () => {
      try {
        const response = await axios.get(
          // `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/adminprofile/${aid}`
          "http://localhost:3000/police/wantedlist/" + router.query.id,
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
formData.append("criminal_name", criminal_name);
formData.append("criminal_email", criminal_email);
formData.append("wanted_criminal_no", wanted_criminal_no);
formData.append("criminal_capture_date", criminal_capture_date);
formData.append("address", address);
formData.append("police_username", police_username);



console.log(formData); // Working

try {
  console.log("Posting Data...");

  const response = await axios.put(
    "http://localhost:3000/police/updatewantedlist1/" + router.query.id ,
    {
      
      criminal_name: criminal_name,
        
        criminal_email:criminal_email,
        wanted_criminal_no:wanted_criminal_no,
        criminal_capture_date: criminal_capture_date,
        address:address,
        police_username: police_username
        
       
    
      
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

      pathname: "/Police_dashboard/viewwantedlist/" + router.query.id,

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

      if(wanted_criminal_no)

      {

        const res = await axios.delete(

          `http://localhost:3000/police/delete_wantedlist1/${wanted_criminal_no}`,
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
/*
  console.log(response);

  if (response.data) {
    console.log("Police deleted successfully.");
    // You can perform additional actions if needed
  } else {
    console.log("Error deleting police.");
  }
} catch (error) {
  console.error("Error deleting police:", error);
}
};
*/


 
const set_CriminalName = (e)=> {
  setCriminalName(e.target.value);
}
const set_CriminalEmail = (e) => {
  setCriminalEmail(e.target.value);
};
const set_WantedListNO = (e) => {
  setWantedListNo(e.target.value);
};
const set_CriminalCaptureDate = (e) => {
  setCriminalCaptureDate(e.target.value);
};
const set_Address = (e) => {
  setAddress(e.target.value);
};

const set_PoliceUname = (e) => {
  setPoliceUname(e.target.value);
};

 

 
 

return(
  
  <>
<_Title title= "Update and Delete WantedList" />

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
           Update and Delete Wanted List   
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Wanted List Information
                </h1>
               
<form onSubmit={handleSubmit} >

<div>
<label htmlFor="criminal_name">Criminal Name :</label>
 <input 
 type="text"
 id="criminal_name"
 placeholder={CollectedpostData?.criminal_name}
 value={criminal_name}
 onChange={set_CriminalName}class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""/>
 
</div>

<div>
        <label htmlFor="criminal_email">Criminal Email:</label>
        <input type="email" 
        placeholder={CollectedpostData?.criminal_email}
        id="fname" 
        value={criminal_email}
       onChange={set_CriminalEmail}class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""/>
        
        
          {/* {errors.name && <p >FName is required</p>} */}
        </div>
<div>
        <label htmlFor="wanted_criminal_no">Wanted Criminal NO :</label>
        <input type="number" 
        placeholder={CollectedpostData?.wanted_criminal_no}
        id="wanted_criminal_no" 
        value={wanted_criminal_no}
       onChange={set_WantedListNO}class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""/>
       
        
          {/* {errors.name && <p >FName is required</p>} */}
        </div>


 <div>
        <label htmlFor="criminal_capture_date"> Criminal Capture Date :
        </label>
        <input type="text" 
        placeholder={CollectedpostData?.criminal_capture_date} 
        id="criminal_capture_date" 
        value={criminal_capture_date}
        onChange={set_CriminalCaptureDate}class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""/>
         
         {/* {errors.email && (
                    <p>
                      {errors.email.type === 'required'
                        ? 'Email is required'
                        : 'InvalAdminId email address'}
                    </p>
                                      )} */}
        </div>
        <div>
        <label htmlFor="address">Criminal Address :</label>
        <input type="text" 
        placeholder={CollectedpostData?.address} 
        id="address"  
        value={address}
        onChange={set_Address}class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""/>
       
        
          {/* {errors.password && <p >password is required</p>} */}
        </div>
       
        <div>
        <label htmlFor="police_username">Police Username :</label>
        <input type="text" 
         placeholder={CollectedpostData?.police_username} 
        id="police_username"
        value={police_username}
        onChange={set_PoliceUname}class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""/>
       
        
          {/* {errors.phone && <p >phone is required</p>} */}
          <br></br><br></br>
        </div>

       


       
        <div className="text-center">
                  <button
                    
                    type="submit"
                    disabled={!isFormComplete}
                    value="Update " class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Update Wanted List </button>
                  
              
  </div>
              {/* You can open the modal using ID.showModal() method */}
  
        {/* <button className="btn" >open modal</button> */}
  
        {/* <dialog id="confirm_Delete" className="modal">
  
          <form method="dialog" className="modal-box"> */}
  
            {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
  
              ✕
  
            </button> */}
  
            {/* <h3 className="font-bold text-lg">Confirm Delete?</h3>
  
            <p className="py-4">Are you sure that you want to delete it?</p> */}
  
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

 

 

 

 

 

 

