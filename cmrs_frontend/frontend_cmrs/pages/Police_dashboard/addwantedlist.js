/*import Layout from "../layout"
export default function AddWantedList(){
    return(
        <>
        <form>
        <Layout page="AddWantedList">
        <h1>Wanted List</h1>
        
        
        <div>
        <label for="name">Criminal Name:</label>
        <input type="varchar" />
        </div>
        <br></br>

        <div>
        <label for="email">Criminal email:</label>
        <input type="email" />
        </div>
        <br></br>
        <div>
        <label for="id">Wanted Criminal No:</label>
        <input type="number" />
        </div><br></br>

        <div>
        <label for="date">Criminal Capture date:</label>
        <input type="date"  name="date"/>
        </div><br></br>
        
        <div>
        <label for="name">Criminal Address:</label>
        <input type="varchar" />
        </div><br></br>

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

// import dynamic from "next/dynamic"

// import { useRouter } from "next/router"

// import axios from "axios"

// import { useState } from "react"

// import Image from "next/image"

// import { useForm } from "react-hook-form"

 

// const Layout= dynamic(()=>

// import("../components/layout/layout")

// );

// const _Title = dynamic(()=>

// import("../components/layout/title")

// );

// export default function postCom(){

 

 

// const router = useRouter();

// // const {

// //     register,

// //     handleSubmit,

// //     formState: { errors },

// //     reset,

// // } = useForm();

// // const validateFile = (value) => {

// //     const file = value[0];

// //     const allowedtypes = ["image/jpg", "image/png"];

 

// //     if (!allowedtypes.includes(file.type)){

// //         return false;

// //     }

// //     }

// // const [id,setid]= useState(0);

// const [Victim_FName,setVictim_FName] = useState("");

// const [VicEmail,setVicEmail]=useState(); //session

// const [PostCom,setPostCom]= useState("");

// const [Eventdate,setEventdate] = useState("");

// const [Witness,setWitness] = useState("");

// const [FileUpload,setFileUpload] = useState("");

// const [victim,setvictim] = useState(14);//default foreignkey

 

//   //  const [success, setSuccess] = useState('')

//   //   const onSubmit = async (data) => {

//   //       console.log(data);

//   const handleSubmit= async (e)=> {

//     e.preventDefault();

 

 

//         const formData = new FormData();

       

//         // formData.append('id',id );

//         formData.append('Victim_FName',Victim_FName);

//         formData.append('VicEmail',VicEmail);

//         formData.append('PostCom',PostCom);

//         formData.append('Eventdate',Eventdate);

//         formData.append('Witness',Witness);

//         formData.append('FileUpload',FileUpload);

//         formData.append('victim',victim);

 

 

 

//         // formData.append('Phone', data.Phone);

//         // formData.append('NID_No', data.NID_No);

//         // formData.append('Vicpassword', data.Vicpassword);

//         // formData.append('Confirm_Vicpassword', data.Confirm_Vicpassword);

//         // formData.append('image', data.image[0]);

 

 

//         console.log(formData);

//         try {

//           console.log("Posting Data");

//             const response = await axios.post("http://localhost:3000/victim/postComplain")

//                 // formData, {

//                 //     headers: {

//                 //         "Content-Type": "multipart/form-data"

//                 //     },

             

//             // });

//             console.warn(response);

 

//     //         if(response.data)

//     //         {

//     //           router.push({

//     //            pathname:"/victim/postCom",

//     //           });

//     //           window.location.reload();

//     //         }

//     //         else

//     //         {

//     //           router.push({

//     //             pathname:"error",

//     //           });

//     //         }

         

//     //         setSuccess('Complain Posted ');

//     //         reset();

 

//     //     }

//     //     catch (error) {

//     //        // console.log(error.response.data.message);

           

//     //         setSuccess('Complain post unsuccessfull ' + error.response.data.message);

 

//     //     }

//     // };

//     if (response.data) {

//       router.push({

//         pathname: "/victim/postCom",

//       });

//       window.location.reload(); // Reload the page

//     } else {

//       router.push({

//         pathname: "error",

//       });

//     }

//   } catch (error) {

//     console.error("Error posting Complain", error);

//   }

//   // Page Reload here

// };

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

// const _Title = dynamic(() => import("../title")); 

//const Layout = dynamic(() => import("../components/layout/layout"));

//const _Title = dynamic(() => import("../components/layout/title"));

 

export default function WantedList() {

  const router = useRouter();

 

  const [criminal_name, setCriminal_Name] = useState("");

  const [ criminal_email, setCriminalEmail] = useState("");

  const [wanted_criminal_no, setWantedCriminalNo] = useState("");

  const [criminal_capture_date, setCriminalCaptureDate] = useState("");

  const [address, setAddress] = useState("");

  

  const [police_username, setVictim] = useState(); //"14"

 

  const handleSubmit = async (e) => {

    e.preventDefault();

 

    const formData = new FormData();

    formData.append("criminal_name", criminal_name);

    formData.append("criminal_email", criminal_email);

    formData.append("wanted_criminal_no", wanted_criminal_no);

    formData.append("criminal_capture_date", criminal_capture_date);

    formData.append("address", address);

   //formData.append("FileUpload", FileUpload);

    formData.append("police_username", police_username);

    console.warn(formData)

 

    try {

      console.log("Posting Data");

      const response = await axios.post(

        "http://localhost:3000/police/addwantedlist1",

        {

            criminal_name:criminal_name,

            criminal_email: criminal_email,

            wanted_criminal_no: wanted_criminal_no,

            criminal_capture_date:criminal_capture_date,

            address: address,

         // FileUpload: FileUpload,

          police_username: police_username

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

                     pathname:"/Police_dashboard/addwantedlist",

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

  const Wantedlistview = function () {
    router.push({
      pathname: "/Police_dashboard/wantedlistinput" ,
    });
  };


    return (

<>

<_Title title= "Wantedlist" />

 

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
        <button type="button" onClick={Wantedlistview} class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View Wanted List</button> 
        </li>
      </ul>
    </div>
  </div>
</nav>

<section class="bg-gray-50 dark:bg-gray-900  bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 text-white">
            {/* <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/> */}
           Add Wanted List   
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Wanted List Information
                </h1>
               

        {/* {success} */}

<form onSubmit={handleSubmit} encType="multipart/form-data" >

 

        {/* <input type="hidden"

        id="id"

        value={id}

       onChange={(e) => setid(0)}

     

        /> */}

       

<div>

        <label for="criminal_name"class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Criminal Name :</label>

        <input type="text"

        id="criminal_name"

        value={criminal_name}

       onChange={(e) => setCriminal_Name(e.target.value)}class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Criminal Name" required=""/>


          {/* {errors.Victim_FName && <p >FName is required</p>} */}

        </div>

 

 

        <div>

        <label for=" criminal_email"> Criminal Email:

        </label>

        <input type="email"  

        id=" criminal_email"

        value={ criminal_email}

        onChange={(e) => setCriminalEmail(e.target.value)}class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Criminal Email" required=""/>

      

        

         {/* {errors.email && (

                    <p>

                      {errors.VicEmail.type === 'required'

                        ? 'Email is required'

                        : 'Invalid email address'}

                    </p>

                                      )} */}

        </div>

 

        <div>

        <label for="wanted_criminal_no">Wanted Criminal No :</label>

        <input type="text"

        id="wanted_criminal_no"

        value={wanted_criminal_no}

        onChange={(e) =>  setWantedCriminalNo(e.target.value)}class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Wanted Criminal No" required=""/>

       
      

          {/* {errors.PostCom && <p >postCom is required</p>} */}

        </div>

       

 

        <div>

        <label for="criminal_capture_date"> Criminal Capture Date :</label>

        <input type="text"

         id="criminal_capture_date"  

         value={criminal_capture_date}

         onChange={(e) => setCriminalCaptureDate(e.target.value)}class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Criminal Capture Date" required=""/>

       

          {/* {errors.Witness && <p >Witness is required</p>} */}

        </div>

       

        <div>

        <label for="address">Address :</label>

        <input type="text"

        id="address"  

        value={address}

        onChange={(e) => setAddress(e.target.value)}class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Criminal Address" required=""/>

 

          {/* {errors.Eventdate && <p >Eventdate is required</p>} */}

        </div>

       

       

 

 

        <div>

        <label for="police_username">Police Username:</label>

        <input type="text"

        id="police_username"  

        value={police_username}

        onChange={(e) => setVictim(e.target.value)}class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Police Username" required=""/>

       
        

          {/* {errors.Eventdate && <p >Eventdate is required</p>} */}

        </div>

       

       {/* Hidden vicitm id passed as foreign key */}

        {/* <input type="number" id="victim" value={victim} */}

 

        {/* /> */}
<div><br></br></div>
         
        <div>

        <button type="submit"

        value="WantedList"class="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Add Wanted List </button>

        

        </div>

       


 

        <br></br>

        

            </form>
            </div>
        </div>
    </div>
  </section>
  </Layout >
</>

    );

}