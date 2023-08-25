import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import dynamic from 'next/dynamic';
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
    <form onSubmit={handleSubmit}>
      <label>
        Enter AdminId:
        <input
          type="number"
          value={inputAdminid}
          onChange={(e) => setinputAdminid(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
