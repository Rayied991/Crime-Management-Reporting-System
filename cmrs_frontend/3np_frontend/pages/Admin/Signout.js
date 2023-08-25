import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/authcontext';

// export default function Signout() {
//   const router = useRouter();

//   useEffect(() => {
//     const handleSignOut = async () => {
//       try {
//         // Make sure to send the session cookie along with the request
//         const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT + '/admin/signout', { withCredentials: true });
//         console.log(response.data);
//         sessionStorage.removeItem('AdminId');
//         // Redirect the user to the login page or another appropriate page
//         router.push('/Admin/Signin');
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     handleSignOut();
//   }, []);

//   return (
//     <p>Signing out...</p>
//   );
// }


// export default function Signout(){
//     const handleSignOut = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/signout",{withCredentials:true})
//             console.log(response.data)
//             sessionStorage.removeItem('AdminId');
//             setAdminId(null);
//             router.push({
//                             pathname: '/Admin/Signin',
//                         });
//           } catch (error) {
//             console.error(error)
//           }
    
//   };
//   return(
//     // <p>Signed out</p>
//     <>
//     </>
//   )
// }
export default function Signout() {
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/signout",
          { withCredentials: true }
        );
        console.log(response.data);

        // Assuming 'AdminId' is the key used in sessionStorage
        sessionStorage.removeItem("AdminId");

        // Redirect to the sign-in page
        router.push({
          pathname: "/Admin/Signin",
        });
      } catch (error) {
        console.error(error);
      }
    };

    handleSignOut();
  }, []);

  return <p>Signing out...</p>;
}