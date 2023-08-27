/*import Layout from "../layout"
export default function LOGOUT(){
    return(
        <>
        <form>
        <Layout page="LOGOUT">
        <h1>You Have Successfully Logged Out.</h1>
        
       

            </Layout>
        </form>
        </>
    )
}

import dynamic from "next/dynamic";
import axios from 'axios';
import {useRouter} from 'next/router';
import { useEffect,useState } from 'react';
import { useAuth } from "../utils/authcontext";


export default function  Logout() {

    const { logout } = useAuth();

    const router  = useRouter();
  //const [userImage, setUserImage] = useState(null);

  // When the page loads
  useEffect(() => {

    logout();

// handleSubmit();
  }, []);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
        const response = await axios.get(
          "http://localhost:3000/police/plogout",
          {
            withCredentials: true,
          }
        );
        if (response.data.Logout == "Success") {
            router.push({
                pathname: '/Police_dashboard/psignin',
            });
        } else {
            router.push({
                pathname: 'error',
            });
        }
    } catch (error) {
        console.error('Error adding books:', error);
    }
}



    
    
}
*/
/*

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from "../utils/authcontext";


export default function Signout() {
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_ENDPOINT + "/police/plogout",
          { withCredentials: true }
        );
        console.log(response.data);

        // Assuming 'AdminId' is the key used in sessionStorage
        sessionStorage.removeItem("username");

        // Redirect to the sign-in page
        router.push({
          pathname: "/Police_dashboard/psignin",
        });
      } catch (error) {
        console.error(error);
      }
    };

    handleSignOut();
  }, []);

  return <p>Signing out...</p>;
}
*/
import { useAuth } from "../utils/authcontext";
import axios from 'axios';
import {useRouter} from 'next/router';
import { useEffect,useState } from 'react';
import dynamic from 'next/dynamic';
//import Footer from "./components/layout/footer";



const _Title = dynamic(() => import("../title"),{
  ssr: false,
});


export default function signout(){
  


const router  = useRouter();
const { logout } = useAuth();

useEffect(() => {

    logout();

handleSubmit();
  }, []);
 const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
        const response = await axios.get("http://localhost:3000/police/plogout")
        if (response.data.Logout == "Success") {
            router.push({
                pathname: '/Police_dashboard/psignin',
            });
        } else {
            router.push({
                pathname: 'error',
            });
        }
    } catch (error) {
        console.error('Error adding books:', error);
    }
}


// const handleSubmit = async (e) => {
//     e.preventDefault();
// }

 const handleSignOut = () => {
      // Clear session data from cookies and state
     // document.cookie = 'VicEmail=; domain=localhost; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
     //logout(username, document.cookie);
     logout( sessionStorage.clear());
      //logout();
      router.push('/Police_dashboard/psignin'); // Redirect to your desired sign-out page
    };


    return (
        <>
         <_Title title= "Sign Out" />
               <button 
         class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
         align="center"
        onClick={handleSignOut}>Sign Out</button>
            {/* <h2>You have signed out . Thank you </h2> */}
            
        
        {/* <Footer/> */}
        </>
            );
    }

