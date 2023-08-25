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
export default function DeleteVictim() {
  const router = useRouter();
 
  const [id, setid] = useState();

  const handleDelete = async () => {
    if (!id) {
      console.error("id is required for deletion.");
      return;
    }

    try {
      console.log("Deleting Data...");
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/deletevictim/${id}`,
        {
          withCredentials: true
        }
      );

      console.log(response);

      if (response.data) {
        console.log("Victim deleted successfully.");
        // You can perform additional actions if needed
      } else {
        console.log("Error deleting Victim.");
      }
    } catch (error) {
      console.error("Error deleting Victim:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <>
      <Layout />
      <Title page="Delete Victim" />
      <div>
        <h1>Delete Victim Page</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="id">id:</label>
            <input
              type="number"
              id="id"
              value={id}
              onChange={(e) => setid(e.target.value)}
            />
          </div>
          
        <button type="button" onClick={handleDelete}>
          Delete Victim
        </button>
        </form>
      </div>
    </>
  );
}
