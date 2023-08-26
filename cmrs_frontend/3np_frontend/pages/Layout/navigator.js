import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../utils/authcontext";

export default function Navigator() {
  const { user, logout } = useAuth();

  const router = useRouter();
  const [session_data, setSession_data] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/index",
          {
            withCredentials: true,
          }
        );
        const sessionData = response.data;

        // Handle session data

      } catch (error) {
        console.error("Error checking session:", error);
        router.push("/signin");
      }
    }, 8000000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (user != null) {
      console.log("user:  " + user.Adminid);
      console.log("user:  " + user.cookie);
    } else {
      router.push("/Signin");
    }
  }, []);

  return (
    <nav className="bg-gray-900 text-white py-4 px-6">
  <div className="container mx-auto flex justify-between items-center">
    <div className="text-xl font-semibold">Crime Management</div>
    <div className="space-x-4">
          <Link href="/" className="fb-button fb-button-primary">Home</Link>
          <Link href="/Admin/Registration" className="fb-button fb-button-primary">Registration</Link>
          <Link href="/Admin/Signin" className="fb-button fb-button-primary">Signin</Link>
          <Link href="/Admin/OTPsend" className="fb-button fb-button-primary">Change Password</Link>
          <Link href="/Admin/AddManager" className="fb-button fb-button-primary">Add Manager</Link>
          <Link href="/Admin/Signout" className="fb-button fb-button-primary">Log Out</Link>
          <Link href="/about" className="fb-button fb-button-primary">About</Link>
          <Link href="/Admin/AddVictim" className="fb-button fb-button-primary">Add Victim</Link>
        </div>
      </div>
    </nav>
  );
}
