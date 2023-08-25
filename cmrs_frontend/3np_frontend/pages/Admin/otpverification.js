import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../Layout/layout'), {
  ssr: false,
});
const Title = dynamic(() => import('../Layout/title'), {
  ssr: false,
});

export default function OtpVerificationForm() {
  const router = useRouter();
  const [otp, setotp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/verify-otp/${otp}`
      );

      if (response.data) {
        // OTP is valid, redirect to password change page
        router.push(`/Admin/PassChange`);
      } else {
        // Handle other status codes or unexpected responses
        setError("Invalid OTP or expired");
      }
    } catch (error) {
      setError("Error checking OTP");
      console.error("Error checking OTP:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter OTP:
        <input
          type="text"
          value={otp}
          onChange={(e) => {
            setotp(e.target.value);
            setError(""); // Clear error when input changes
          }}
        />
      </label>
      <button type="submit">Submit</button>
      {error && <p>{error}</p>}
    </form>
  );
}
