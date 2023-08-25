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

export default function InputForm() {
  const router = useRouter();
  const [inputid, setInputid] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputid) {
        console.error("Id is required ");
        return;
      }
      console.info(inputid);
  
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/send-otp/${inputid}`
      );
  
      console.log("API Response:", response.data);
  
      if (response.data) {
        // If the username exists, redirect to the profile page
        router.push(`/Admin/otpverification`);
      } else {
        // Handle the case where the username doesn't exist
        console.log("Adminid not found");
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
          value={inputid}
          onChange={(e) => setInputid(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
