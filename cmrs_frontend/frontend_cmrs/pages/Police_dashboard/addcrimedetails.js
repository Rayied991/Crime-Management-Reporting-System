/*import Layout from "../layout"
export default function AddCrimeDetails(){
    return(
        <>
        <form>
        <Layout page="AddCrimeDetails">
        <h1>Please Add Crime Details</h1>
        <div>
        <label for="phoneNumber">Criminal Phone Number:</label>
        <input type="tel"  name="phoneNumber" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required/>
        </div><br></br>

        <div>
        <label for="name">Details:</label>
        <input type="varchar" />
        </div>
        <br></br>
        <div>
        <label for="name">Police Username:</label>
        <input type="varchar" />
        </div>
        <br></br>
        <div>
        <label for="id">Wanted Criminal No:</label>
        <input type="number" />
        </div><br></br>

        <div>

            
        <button type="submit">Login</button>
        </div>

            </Layout>
        </form>
        </>
    )
}
*/

import dynamic from "next/dynamic";

import { useRouter } from "next/router";

import axios from "axios";

import { useState } from "react";

import { useForm } from "react-hook-form";

import Image from "next/image";

import Link from "next/link";

const Layout = dynamic(() =>
  import("../police_layout/police_layout"),{
    ssr: false,
  }
  
);

const _Title = dynamic(() => import("../title"),{
  ssr: false,
});


 

export default function AddCrimeDetails() {

  const router = useRouter();

 

  const [criminal_phonenumber, setCriminal_PhoneNum] = useState("");

  const [ Details, setCriminalDetails] = useState("");
  
  const [police, setPoliceUname] = useState("");

  const [wantedlist2, setWantedCriminalNo] = useState("");


 

  const handleSubmit = async (e) => {

    e.preventDefault();

 

    const formData = new FormData();

    formData.append("criminal_phonenumber", criminal_phonenumber);

    formData.append("Details", Details);

    

    formData.append("police", police);

    
    formData.append("wantedlist2", wantedlist2);

    console.warn(formData)

 

    try {

      console.log("Posting Data");

      const response = await axios.post(

        "http://localhost:3000/police/crimedetails",

        {

            criminal_phonenumber:criminal_phonenumber,

            Details: Details,

            police: police,

            wantedlist2:wantedlist2,


        },

        {

          headers: {

            "Content-Type": "application/json",

          },

        }

      );

      console.warn(response);

 

      // if (response.status === 200) {

      //   router.push("/victim/postCom");

      // } else {

      //   router.push("/error");

      // }

      if(response.data)

                  {

                    router.push({

                     pathname:"/Police_dashboard/addcrimedetails",

                    });

                    window.location.reload();

                  }

                  else

                  {

                    router.push({

                      pathname:"error",

                    });

                  }

               

    } catch (error) {

      console.error("Error adding wantedlist", error);

    }

  };

 
  const View_CrimeDetails = function () {
    router.push({
      pathname: "/Police_dashboard/crimedetailsinput",
    });
  };

    return (

<>

<_Title title= "Add Crime Details" />

 

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
        <li>
        <button type="button" onClick={View_CrimeDetails}  class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View Crime Details</button> 
        </li>
      </ul>
    </div>
  </div>
</nav>

<section class="bg-gray-50 dark:bg-gray-900  bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 text-white">
            {/* <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/> */}
           Add Crime Details  
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Please Enter Any Crime Details Information
                </h1>
               



<form onSubmit={handleSubmit} encType="multipart/form-data" >

 

        {/* <input type="hidden"

        id="id"

        value={id}

       onChange={(e) => setid(0)}

     

        /> */}

       

<div>

        <label for="criminal_phonenumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Criminal Phone Number :</label>

        <input type="number"

        id="criminal_phonenumber"

        value={criminal_phonenumber}

       onChange={(e) => setCriminal_PhoneNum(e.target.value)}class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Criminal Phone Number" required=""/> 


          {/* {errors.Victim_FName && <p >FName is required</p>} */}

        </div>

 

 

        <div>

        <label for=" Details"> Criminal Details:

        </label>

        <input type="text"  

        id=" Details"

        value={ Details}

        onChange={(e) => setCriminalDetails(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Criminal Details" required=""/>

        {/* {...register('Email', { required: true, pattern: /\S+@\S+\.\S+/ })} */}

      

        

        </div>

 

        
       

       

 

 

        <div>

        <label for="police">Police Username:</label>

        <input type="text"

        id="police"  

        value={police}

        onChange={(e) => setPoliceUname(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Police Username" required=""/>

 

        

          {/* {errors.Eventdate && <p >Eventdate is required</p>} */}

        </div>

       

       {/* Hidden vicitm id passed as foreign key */}

        {/* <input type="number" id="victim" value={victim} */}

 

        {/* /> */}

         
        <div>

<label for="wantedlist2">Wanted Criminal No :</label>

<input type="text"

id="wantedlist2"

value={wantedlist2}

onChange={(e) =>  setWantedCriminalNo(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Wanted List No" required=""/>



  {/* {errors.PostCom && <p >postCom is required</p>} */}
  

</div>
<br></br><br></br>

        <div>

        <button type="submit"

        value="AddCrimeDetails" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add Crime Details</button>

      

        </div>

       
        </form>
            </div>
        </div>
    </div>
  </section>


      
  </Layout >

        

           
     

</>

    );

}