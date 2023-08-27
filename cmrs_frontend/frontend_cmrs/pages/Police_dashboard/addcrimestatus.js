/*import Layout from "../layout"
export default function ADDCRIMESTATUS(){
    return(
        <>
        <form>
        <Layout page="ADDCRIMESTATUS">
        <h1>Please Add Crime Status </h1>
        <div>
        <label for="id">PostId:</label>
        <input type="number" />
        </div><br></br>
        
        <div>
        <label for="name">CrimeStatus:</label>
        <input type="varchar" />
        </div>
        <br></br>
        <div>
        <label for="name">Police Username:</label>
        <input type="varchar" />
        </div>
        <br></br>
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

//const Layout = dynamic(() => import("../components/layout/layout"));

//const _Title = dynamic(() => import("../components/layout/title"));

 

export default function AddCrimeStatus() {

  const router = useRouter();

 

  const [PostId, setVictim_PostId] = useState("");

  const [ Status, setCrimeStatus] = useState("");

  const [police, setPoliceUname] = useState("");


 

  const handleSubmit = async (e) => {

    e.preventDefault();

 

    const formData = new FormData();

    formData.append("PostId", PostId);

    formData.append("Status", Status);

    formData.append("police", police);

    

    console.warn(formData)

 

    try {

      console.log("Posting Data");

      const response = await axios.post(

        "http://localhost:3000/police/crimestatus/",

        {

            PostId:PostId,

            Status: Status,

            police: police,

        

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

                     pathname:"/Police_dashboard/addcrimestatus",

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

  const sendCrimeStatus = function () {
    router.push({
      pathname: "/Police_dashboard/crimestatusinput",
    });
  };

    return (

<>

<_Title title= "Add Crime Status" />

 

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
        <button type="button" onClick={sendCrimeStatus} class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View Crime Status</button> 
        </li>
      </ul>
    </div>
  </div>
</nav>

<section class="bg-gray-50 dark:bg-gray-900  bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 text-white">
            {/* <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/> */}
           Add Crime status  
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Crime Status Information
                </h1>
               



<form onSubmit={handleSubmit} encType="multipart/form-data" >

 

        {/* <input type="hidden"

        id="id"

        value={id}

       onChange={(e) => setid(0)}

     

        /> */}

       

<div>

        <label for="PostId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">VicTim Post Id:</label>

        <input type="number"

        id="PostId"

        value={PostId}

       onChange={(e) => setVictim_PostId(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Post ID" required=""/>

       

          {/* {errors.Victim_FName && <p >FName is required</p>} */}

        </div>

 

 

        <div>

        <label for=" Status"> Crime Status:

        </label>

        <input type="text"  

        id=" Status"

        value={ Status}

        onChange={(e) => setCrimeStatus(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Criminal Status" required=""/>

       

         {/* {errors.email && (

                    <p>

                      {errors.VicEmail.type === 'required'

                        ? 'Email is required'

                        : 'Invalid email address'}

                    </p>

                                      )} */}

        </div>

 

        <div>

        <label for="police">Police UserName :</label>

        <input type="text"

        id="police"

        value={police}

        onChange={(e) =>  setPoliceUname(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Police Username" required=""/>

      

          {/* {errors.PostCom && <p >postCom is required</p>} */}

        </div>

       

 
       <br></br><br></br>


         

        <div>

        <button type="submit"

        value="AddCrimeStatus" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add Crime Status</button>

        

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