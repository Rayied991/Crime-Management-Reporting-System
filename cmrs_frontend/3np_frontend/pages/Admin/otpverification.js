import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import dynamic from 'next/dynamic';
import Footer from "../Layout/footer";

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

      if (response.status) {
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
    <>
    <Title page="OTP " />
    <Layout />
    <h1  className="text-center text-2xl font-bold mb-4">OTP Verification Page</h1>
    <form onSubmit={handleSubmit}  class="max-w-lg mx-auto">
    <div  class="form-group">
      <label  class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">
        Enter OTP:
        <input
          type="text"
          value={otp}
          class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" 
          onChange={(e) => {
            setotp(e.target.value);
            setError(""); // Clear error when input changes
          }}
        />
      </label>
      </div>
      <div className="text-center">
      <button type="submit"  class="text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-red-800"
                    data-drawer-target="drawer-navigation"
                    data-drawer-show="drawer-navigation"
                    aria-controls="drawer-navigation" 
                    align="center">Send</button>
                    </div>
                    {error && <p>{error}</p>}

     
    </form>
    <Footer/>
    </>
  );
}
