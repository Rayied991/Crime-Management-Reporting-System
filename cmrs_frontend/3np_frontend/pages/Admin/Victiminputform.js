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

export default function VictimInputForm() {
  const router = useRouter();
  const [inputVictimid, setinputVictimid] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputVictimid) {
        console.error("Victim id is required ");
        return;
      }
      console.info(inputVictimid);
  
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/getVictim/${inputVictimid}`
      );
  
      console.log("API Response:", response.data);
  
      if (response.data) {
        // If the username exists, redirect to the profile page
        router.push(`/Admin/victimprofile/${inputVictimid}`);
      } else {
        // Handle the case where the username doesn't exist
        console.log("Victim not found");
      }
    } catch (error) {
      console.error("Error checking Victimid:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter Victimid:
        <input
          type="number"
          value={inputVictimid}
          onChange={(e) => setinputVictimid(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
