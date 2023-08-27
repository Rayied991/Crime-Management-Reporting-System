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
      console.log("user:  " + user.ManagerID);
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
          <Link href="/Manager/Signup" className="fb-button fb-button-primary">Registration</Link>
          <Link href="/Manager/Signin" className="fb-button fb-button-primary">Signin</Link>
          <Link href="/Manager/ChangePassword" className="fb-button fb-button-primary">Change Password</Link>
          <Link href="/Manager/ViewProfile" className="fb-button fb-button-primary">ViewProfile</Link>
          <Link href="/Manager/SafetyPost" className="fb-button fb-button-primary">Add Safety Post</Link>
          <Link href="/Manager/NoticePost" className="fb-button fb-button-primary">Add Notice Post</Link>
          <Link href="/Manager/ContactAdmin" className="fb-button fb-button-primary">Contact Admin</Link>
        </div>
      </div>
    </nav>
  );
}