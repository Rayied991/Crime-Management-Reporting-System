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

export default function UsernameInputForm() {
  const router = useRouter();
  const [inputUsername, setInputUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputUsername) {
        console.error("Username is required ");
        return;
      }
      console.log(inputUsername);
  
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/getpolice/${inputUsername}`
      );
  
      console.log("API Response:", response.data);
  
      if (response.data) {
        // If the username exists, redirect to the profile page
        router.push(`/Admin/policeprofile/${inputUsername}`);
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
        Enter Username:
        <input
          type="text"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
