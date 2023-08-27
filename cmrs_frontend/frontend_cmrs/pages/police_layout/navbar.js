/*import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import { useAuth } from '../utils/authcontext';

export default function NavBar() {

  const [jsonData, setJsonData] = useState('')
  const router = useRouter();
  const { user, logout, checkUser } = useAuth();

  useEffect(() => {

    checkSession();

  }, []);

  function checkSession()
  {
    if (user!=null) {
      
      fetchData();
      console.log("user:  "+user.username)
      console.log("user:  "+user.cookie)
    }
    else {
      router.push('/psignin')
    }
  }

  async function fetchData() {

    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT + "/police/policeviewprofile" + user.username,

      );
      const jsonData = response.data;
      console.log(jsonData)
      setJsonData(jsonData);
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogout = () => {

    logout();
    router.push('/psignin');
  };



  return (
<>
{jsonData &&
    <div className="navbar bg-slate-400">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">3NP</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={process.env.NEXT_PUBLIC_API_ENDPOINT + '/' + jsonData.filenames} />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                {user && user.username}
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li> <button onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
}
</>
  );
}*/
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";
const _Title = dynamic(() => import("../title")); 
//mport { useAuth } from "../../../utils/authcontext";
import { useAuth } from "../utils/authcontext";

export default function _NavBar() {
  const { user, logout } = useAuth();

  const router = useRouter();
  const [userImage, setUserImage] = useState(null);
  //const [session_data, setSession_data] = useState(null);
const [sessionData, setSession_data] = useState(null);
  // #region [Check Backend Session is Active or NOT]
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get("http://localhost:3000/police/index", {
          withCredentials: true,
        });
       const sessionData = response.data; // Assuming the session data is a string

         console.info("Session Data =", sessionData);

       if (!sessionData) {
          router.push("/Police_dashboard/psignin");
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    }, 1000); 

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);    

  // #endregion [Check Backend Session is Active or NOT]

  // #region [Get Seller Image] When the Navbar is Called
  // When the page loads
  useEffect(() => {
    if (user != null) {
      //  Fetch The Data
/*
      axios
        .get("http://localhost:3000/seller/profile/profile_image", {
          responseType: "arraybuffer", // Indicate that we're expecting binary data
          withCredentials: true,
        })
        .then((response) => {
          const imageBlob = new Blob([response.data], {
            type: response.headers["content-type"],
          });
          const imageUrl = URL.createObjectURL(imageBlob);
          setUserImage(imageUrl);
        })
        .catch((error) => {
          setUserImage(null); // Set to null if there's an error
        });
*/
      console.warn("user:  " + user.username);
      console.warn("user:  " + user.cookie);
    } else {
      router.push("/Police_dashboard/psignin");
    }
  }, []);

  // #endregion [Get Seller Image] When the Navbar is Called

  // #region [Storing New Data to Variable]
  
  const sendToAddCrimeDetails = function () {
    router.push({
      pathname: "/Police_dashboard/addcrimedetails",
    });
  };
  const sendToViewProfile = function () {
    router.push({
      pathname: "/Police_dashboard/profileinput",
    });
  };

  const sendToAddwantedList = function () {
    router.push({
      pathname: "/Police_dashboard/addwantedlist",
    });
  };

  const sendToLogout = function () {
    router.push({
      pathname: "/Police_dashboard/psignout",
    });
  };

  const sendToCrimeStatus = function () {
    router.push({
      pathname: "/Police_dashboard/addcrimestatus",
    });
  };
  // #endregion [Storing New Data to Variable]

  return (
    <>
    
    {/* <_Title title= "Wantedlist" /> */}
    <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="#" class="flex items-center">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Crime Management Reporting System</span>
    </a>
    <button data-collapse-toggle="navbar-dropdown" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
      <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="/Police_dashboard/policeprofile" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</a>
        </li>
        <li>
            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" class="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Dropdown <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
  </svg></button>
            {/* <!-- Dropdown menu --> */}
            <div id="dropdownNavbar" class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
     
                <li>
                  <a onClick={sendToAddwantedList}class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Add Wanted list</a>
                </li>
                <li>
                  <a onClick={sendToAddCrimeDetails}class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Add Crime Details</a>
                </li>
                <li>
                  <a onClick={sendToCrimeStatus}class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Add Crime Status</a>
                </li>
                </ul>
                <div class="py-1">
                <a onClick={sendToLogout} 
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Sign out</a>
                </div>
            </div>
        </li>
        <li>
        <button type="button" onClick={sendToViewProfile}class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View Profile</button>
        </li>
        </ul>
    </div>
  </div>
</nav>
</>
)
}