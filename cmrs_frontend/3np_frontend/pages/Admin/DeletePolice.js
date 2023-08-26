import { useRouter } from "next/router";
import axios from 'axios';
import { useState } from "react";
import dynamic from 'next/dynamic';
import Footer from "../Layout/footer";
const Layout = dynamic(() => import('../Layout/layout'), {
  ssr: false,
})
const Title = dynamic(() => import('../Layout/title'), {
  ssr: false,
})
export default function DeletePolice() {
  const router = useRouter();
 
  const [username, setusername] = useState("");

  const handleDelete = async () => {
    if (!username) {
      console.error("Username is required for deletion.");
      return;
    }

    try {
      console.log("Deleting Data...");
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/deletepolice/${username}`,
        {
          withCredentials: true
        }
      );

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <>
      <Layout />
      <Title page="Add Police" />
    
        <h1  className="text-center text-2xl font-bold mb-4">Delete Police Page</h1>
        <form onSubmit={handleSubmit} class="max-w-lg mx-auto">
        <div  class="form-group">
            <label htmlFor="username" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" 
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <br/>
          <div className="text-center">
      <button type="submit"  class="text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-red-800"
                    data-drawer-target="drawer-navigation"
                    data-drawer-show="drawer-navigation"
                    aria-controls="drawer-navigation" 
                    align="center">Delete</button>
                    </div>
        </form>
        <Footer/>
      
    </>
  );
}
