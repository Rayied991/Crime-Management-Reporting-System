// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import { useAuth } from '../utils/authcontext';
// import dynamic from 'next/dynamic';
// import { useForm } from 'react-hook-form';
// const Layout = dynamic(() => import('../Layout/layout'), {
//   ssr: false,
// })
// const Title = dynamic(() => import('../Layout/title'), {
//   ssr: false,
// })

// // export default function Signout() {
// //   const router = useRouter();

// //   useEffect(() => {
// //     const handleSignOut = async () => {
// //       try {
// //         // Make sure to send the session cookie along with the request
// //         const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT + '/admin/signout', { withCredentials: true });
// //         console.log(response.data);
// //         sessionStorage.removeItem('AdminId');
// //         // Redirect the user to the login page or another appropriate page
// //         router.push('/Admin/Signin');
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };

// //     handleSignOut();
// //   }, []);

// //   return (
// //     <p>Signing out...</p>
// //   );
// // }


// // export default function Signout(){
// //     const handleSignOut = async (event) => {
// //         event.preventDefault();
// //         try {
// //             const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/signout",{withCredentials:true})
// //             console.log(response.data)
// //             sessionStorage.removeItem('AdminId');
// //             setAdminId(null);
// //             router.push({
// //                             pathname: '/Admin/Signin',
// //                         });
// //           } catch (error) {
// //             console.error(error)
// //           }
    
// //   };
// //   return(
// //     // <p>Signed out</p>
// //     <>
// //     </>
// //   )
// // }
// export default function Signout() {
//   const router = useRouter();
//   const { register, handleSubmit, formState: { errors }, reset } = useForm("");

  
//     const handleSignOut = async () => {
//       try {
//         const response = await axios.get(
//           process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/signout",
//           { withCredentials: true }
//         );
//         console.log(response.data);

//         // Assuming 'AdminId' is the key used in sessionStorage
//         sessionStorage.removeItem("AdminId");

//         // Redirect to the sign-in page
//         router.push({
//           pathname: "/Admin/Signin",
//         });
//       } catch (error) {
//         console.error(error);
//       }
//     };
    
//     handleSignOut();
    
    
//     return (
//       <>
//     <Title page="Signout"></Title>
//     <Layout/>
//     <form onSubmit={handleSubmit(handleSignOut)}>
//     <div class='text-center dark:text-white'>
//       <p>Signed out</p>
//       </div>
//     </form>
//     </>
//   )
// }
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useAuth } from '../utils/authcontext';
import { useForm } from 'react-hook-form';
const Layout = dynamic(() => import('../Layout/layout'), {
  ssr: false,
})
const Title = dynamic(() => import('../Layout/title'), {
  ssr: false,
})

export default function Signout() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset } = useForm("");
  
  const handleSignOut = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/signout",
        { withCredentials: true }
      );
      console.log(response.data);

      session.destroy();
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

  return (
    <>
      <Title page="Signout"></Title>
      <Layout />
     <form onSubmit={handleSubmit(handleSignOut)}>

     </form>
        
    </>
  )
}
