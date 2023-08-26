import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import dynamic from 'next/dynamic';
import Footer from "../Layout/footer";
const Layout = dynamic(() => import('../Layout/layout'), {
  ssr: false,
})
const Title = dynamic(() => import('../Layout/title'), {
  ssr: false,
})

export default function AdminInputForm() {
  const router = useRouter();
  const [inputAdminid, setinputAdminid] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputAdminid) {
        console.error("AdminId is required ");
        return;
      }
      console.info(inputAdminid);
  
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/adminprofile/${inputAdminid}`
      );
  
      console.log("API Response:", response.data);
  
      if (response.data) {
        // If the username exists, redirect to the profile page
        router.push(`/Admin/Adminprof/${inputAdminid}`);
      } else {
        // Handle the case where the username doesn't exist
        console.log("Username not found");
      }
    } catch (error) {
      console.error("Error checking username:", error);
    }
  };

  return (
    <>
    <Title page="Admin Input"/>
    <Layout/>
    <h1 className="text-center text-2xl font-bold mb-4">Search Admin Page</h1>
    <form onSubmit={handleSubmit} class="max-w-lg mx-auto" >
    <div  class="form-group">
      <label class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
        Enter AdminId:
        <input
          type="number"
          value={inputAdminid}
          class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" 
          onChange={(e) => setinputAdminid(e.target.value)}
        />
      </label>
      </div>
      <div className="text-center">
      <button type="submit"  class="text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-red-800"
                    data-drawer-target="drawer-navigation"
                    data-drawer-show="drawer-navigation"
                    aria-controls="drawer-navigation" 
                    align="center">Submit</button>
                    </div>
    </form>
    <Footer/>
    </>
  );
}
