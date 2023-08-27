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
import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useAuth } from '../utils/authcontext';
import { useForm } from 'react-hook-form';
import Footer from '../Layout/footer';
const Layout = dynamic(() => import('../Layout/layout'), {
  ssr: false,
})
const Title = dynamic(() => import('../Layout/title'), {
  ssr: false,
})

// export default function Signout() {
//   const router = useRouter();
//   const { register, handleSubmit, formState: { errors }, reset } = useForm("");
  
//   const handleSignOut = async () => {
//     try {
//       const response = await axios.get(
//         process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/signout",
//         { withCredentials: true }
//       );
//       console.log(response.data);

//       session.destroy();
//       // Assuming 'AdminId' is the key used in sessionStorage
//       sessionStorage.removeItem("AdminId");

//       // Redirect to the sign-in page
//       router.push({
//         pathname: "/Admin/Signin",
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <Title page="Signout"></Title>
//       <Layout />
//      <form onSubmit={handleSubmit(handleSignOut)}>

//      </form>
        
//     </>
//   )
// }
export default function signout(){
  


  const router  = useRouter();
  const { logout } = useAuth();
  
  useEffect(() => {
  
      logout();
  
  handleSubmit();
    }, []);
   const handleSubmit = async (e) => {
      // e.preventDefault();
      try {
          const response = await axios.get("http://localhost:3000/victim/signout")
          if (response.data.Logout == "Success") {
              router.push({
                  pathname: '/Signin',
              });
          } else {
              router.push({
                  pathname: 'error',
              });
          }
      } catch (error) {
          console.error('Error adding books:', error);
      }
  }
  
 
  
   const handleSignOut = () => {
        // Clear session data from cookies and state
        document.cookie = 'AdminId=; domain=localhost; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
        logout();
        router.push('/Admin/Signin'); // Redirect to your desired sign-out page
      };
  
  
      return (
          <>
           <Title page= "Sign Out" />
          <Layout>
        
          <button 
           class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
           align="center"
          onClick={handleSignOut}>Sign Out</button>
              {/* <h2>You have signed out . Thank you </h2> */}
              </Layout>
          
          <Footer/>
          </>
              );
      }
