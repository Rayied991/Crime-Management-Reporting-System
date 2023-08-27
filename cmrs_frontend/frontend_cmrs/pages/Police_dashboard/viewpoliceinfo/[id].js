import dynamic from "next/dynamic";

import { useRouter } from "next/router";

import axios from "axios";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import Image from "next/image";
import { DEFAULT_SANS_SERIF_FONT } from "next/dist/shared/lib/constants";
import { useAuth } from "../../utils/authcontext";

const Layout = dynamic(() =>
  import("../../police_layout/police_layout")
);

const _Title = dynamic(() => import("../../title"));

 
export default function Fetch_Profle()

{

    const router = useRouter();

 

  const [fname, setFname] = useState();

  const [ lname, setLname] = useState("");

  const [username, setUsername] = useState("");

  const [location, setLocation] = useState("");

  const [email, setEmail] = useState("");

  const [ phoneNum, setPhoneNum] = useState("");
  const [ password, setPassword] = useState("");

  const [profile_image, setFileUpload] = useState("");

//   const [victim, setVictim] = useState(); //"14"

 

  const [CollectedpoliceData, setCollectedpoliceData] = useState(null);

  const [isFormComplete, setIsFormComplete] = useState(false);

 

  console.warn("Username " + router.query.id); // Working

 

 
const { logout } = useAuth();

  useEffect(() => {

    fetchPoliceData();
    logout();
   

  }, [router.query.id]);

 

    // * Collect  Data

    useEffect(() => {

        if (CollectedpoliceData !== null) {

          console.log("Collected police Data:", CollectedpoliceData);

          

          setFname(CollectedpoliceData.fname);
          setLname(CollectedpoliceData.lname);
         
          setUsername(CollectedpoliceData?.username);

          setLocation(CollectedpoliceData.location);
          setEmail(CollectedpoliceData.email);
          setPhoneNum(CollectedpoliceData.phoneNum);

          setPassword(CollectedpoliceData.password);

          setFileUpload(CollectedpoliceData.profile_image);

 

 

 

          console.log("fname:", CollectedpoliceData.fname);

          console.log("lname :", CollectedpoliceData.lname);

          console.log("username :", CollectedpoliceData?.username);

          console.log("location:", CollectedpoliceData.location);
          console.log("email:", CollectedpoliceData.email);

          console.log("phoneNum :", CollectedpoliceData.phoneNum);

          console.log("password :", CollectedpoliceData.password);

          console.log("profile_image :", CollectedpoliceData.profile_image);

        //   console.log("Book Image Name :", CollectedpostData.Book_Image);

        //   console.log("Seller_ID :", CollectedpostData.Seller_ID);

        }

      }, [CollectedpoliceData]);

 

      useEffect(() => {

        // Check if all required fields are filled

        const allFieldsFilled =

        fname && lname && location && email && phoneNum && password && profile_image;

   

        setIsFormComplete(allFieldsFilled);

      }, [fname, lname, location, email, phoneNum, password,profile_image]);

   

      const fetchPoliceData = async () => {

        try {
          console.log("username="+router.query.id)

          const response = await axios.get(

            "http://localhost:3000/police/policeviewprofile/" +router.query.id,

           // { withCredentials: true }

          );

          const data = response.data;

          console.log("Fetched Police Data:", data);

   


          if (data != null) {

            setCollectedpoliceData(data);

           

          }

        } catch (error) {

          console.error("Error fetching Complain data:", error);

        }

      };

//PUT method

const handleSubmit = async (e)=>{

  e.preventDefault();

  //update
  const formData = new FormData();
    // formData.append('myfile', e.target.elements.myfile);
    const fileInput = document.getElementById("mypicfile"); // Get the file input element

    if (fileInput && fileInput.files.length > 0) {
      formData.append("mypicfile", fileInput.files[0]);
      const uploadedFileName = formData.get("mypicfile").name;
      setFileUpload(uploadedFileName);
      // ! Not used
      // * If there is a change in Book Image of new Image uploaded then,
      formData.append("profile_image", uploadedFileName);
      // console.warn('Uploaded File Name:', uploadedFileName);
    }
 

  formData.append(" fname ",  fname );

  formData.append("lname", lname);

  formData.append("location", location);

  formData.append("email", email);

  formData.append(" password",  password);

//formData.append("profile_image", profile_image);

 

  console.log(formData); // Working

 

  try {

    console.log("Posting Data...");

 

    const response = await axios.put(

      "http://localhost:3000/police/updatepoliceproinfo/" + username,
/*
      {

       

        fname:fname,

        lname: lname,

        location: location,

        email:email,
        
        phoneNum:phoneNum,
        password:  password,

        profile_image: profile_image

        //victim: victim

       

      },*/
      formData,  
      {
        withCredentials: true,

      

        headers: {

          //"Content-Type": "application/json",
          "Content-Type": "multipart/form-data",

        },

      }

    );

 

    console.log(response);

 

    if (response.data) {

      console.info("Data Has been Updated");

      // TODO: Reload the Page Here

      router.push({

        pathname: "/Police_dashboard/viewpoliceinfo/" + router.query.id,

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

 

  //Delete

 

 

 

 

 

 

 

 

};

const handleDelete = async () =>

  {

    try{

      if(username)

      {

        const res = await axios.delete(

          `http://localhost:3000/police/delete/${username}`
         

        );
     

        console.log("Deleted Or Not? = " + res);

        // You might want to refresh the book list after deletion

        // You can call fetchBookImages() again or refetch data here

        // fetchBookImages();

        setUsername(null); // Reset selected book ID
        logout( sessionStorage.clear());
        router.push('/Police_dashboard/psignin'); 
       // window.location.reload(); 

      }

    }

    catch (error) {

      console.error("Error deleting complain:", error);

    }

  }

 

const set_fname = (e)=> {

  setFname(e.target.value);

}

const set_lname = (e) => {

  setLname(e.target.value);

};

const set_username = (e) => {

  setUsername(e.target.value);

};

const set_location = (e) => {

  setLocation(e.target.value);

};

const set_email = (e) => {

  setEmail(e.target.value);

};

const set_phonenum = (e) => {

  setPhoneNum(e.target.value);

};
const set_password = (e) => {
setPassword(e.target.value);
};

const set_image = (e) => {

  setFileUpload(e.target.value);

};

 

 

 

 
 

return(

 

  <>
  
  <_Title title= "view Your Profile" />
  
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
            <br></br><br></br><br></br><br></br><br></br>
           Update and Delete Wanted List   
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Wanted List Information
                </h1>
  
 
  
  <h1>View Profile</h1>
  
  <form onSubmit={handleSubmit} encType="multipart/form-data">
  
   
  <div>
 
  
   
  
  <div>
  
          <label for="fname">First Name :</label>
  
          <input type="text"
  
          placeholder={CollectedpoliceData?.fname}
  
          id="fname"
  
          value={fname}
  
         onChange={set_fname} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""/>
  
        
  
            {/* {errors.Victim_FName && <p >FName is required</p>} */}
  
          </div>
  
   
  
   
  
   <div>
  
          <label for="lname">Last Name :
  
          </label>
  
          <input type="text"
  
          placeholder={CollectedpoliceData?.lname}
  
          id="lname"
  
          value={lname}
  
          onChange={set_lname}
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""/>

          
  
  
  <label for="username">Police Username :</label>
  
   <input
  
   type="hidden"
  
   id="username"
  
   value={username}
  
   onChange={set_username}
  
   />
  
  </div>
  
           {/* {errors.email && (
  
                      <p>
  
                        {errors.VicEmail.type === 'required'
  
                          ? 'Email is required'
  
                          : 'Invalid email address'}
  
                      </p>
  
                                        )} */}
  
          </div>
  
   
  
          <div>
  
          <label for="location">Location :</label>
  
          <input type="text"
  
           placeholder={CollectedpoliceData?.location}
  
          id="location"
  
          value={location}
  
          onChange={set_location}
  
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""/>
  
            {/* {errors.PostCom && <p >postCom is required</p>} */}
  
          </div>
  
          <div>
  
          <label for="email">Email :</label>
  
          <input type="email"
  
          placeholder={CollectedpoliceData?.email}
  
          id="Eventdate"  
  
          value={email}
  
          onChange={set_email}
  
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""/>
  
            {/* {errors.Eventdate && <p >Eventdate is required</p>} */}
  
          </div>
  
   
  
          
          
   
  <div>
  
  <label for="phoneNum">Phone Number :</label>

  <input type="text"

  placeholder={CollectedpoliceData?.phoneNum}

   id="phoneNum"  

   value={phoneNum}

   onChange={set_phonenum}

   class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""/>
   </div>


<div>
  
  <label for="password">Password :</label>

  <input type="text"

  placeholder={CollectedpoliceData?.password}

   id="password"  

   value={password}

   onChange={set_password}

   class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required=""/>

    {/* {errors.Witness && <p >Witness is required</p>} */}

  </div>
   
  
          <div>
          
          <label for="profile_image">Upload Image :</label>
  
          <input type="file"
                    
                   
                    
  
          //placeholder={CollectedpoliceData?.profile_image}
          id="mypicfile" 
          
  
          // value={profile_image}
         
        //  onChange={set_image} 
  
          />
  
  
          
  
            {/* {errors.FileUpload && <p >File is required</p>} */}
  
          </div>
  
          <div className="text-center">
  
                    <button
  
                     
  
                      type="submit"
  
                      disabled={!isFormComplete}
  
                      value="Update Complain" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Update Wanted List </button>
  
                    
  
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
<div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            </div>  <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
</section>

</Layout >
  
   
  
   
  
   
  
  </>
  
   
  
   
  
  )
  
   
  
   
  
   
  
  }

 

 

 

 

 

 

