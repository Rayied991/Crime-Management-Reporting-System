import { useRouter } from "next/router";
import axios from 'axios';
import { useState } from "react";
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('../layout'), {
  ssr: false,
})
const _Title = dynamic(() => import('../title'), {
  ssr: false,
})
export default function DeletePolice() {
  const router = useRouter();
 
  const [wanted_criminal_no, setusername] = useState("");

  const handleDelete = async () => {
    if (!wanted_criminal_no) {
      console.error("Username is required for deletion.");
      return;
    }

    try {
      console.log("Deleting Data...");
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/police/delete_wantedlist1/${wanted_criminal_no}`,
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
      <_Title title="Add Police" />
      <div>
        <h1>Delete Police Page</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="wanted_criminal_no">Username:</label>
            <input
              type="text"
              id="wanted_criminal_no"
              value={wanted_criminal_no}
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