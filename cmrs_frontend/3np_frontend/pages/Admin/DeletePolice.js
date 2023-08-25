import { useRouter } from "next/router";
import axios from 'axios';
import { useState } from "react";
import dynamic from 'next/dynamic';
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
      <div>
        <h1>Delete Police Page</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          
        <button type="button" onClick={handleDelete}>
          Delete Police
        </button>
        </form>
      </div>
    </>
  );
}
