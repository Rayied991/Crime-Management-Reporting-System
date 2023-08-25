import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/authcontext';
import dynamic from 'next/dynamic'
import { useEffect } from 'react';
const Layout = dynamic(() => import('../Layout/layout'), {
    ssr: false,
  })
  const Title = dynamic(() => import('../Layout/title'), {
    ssr: false,
  })

export default function LoginPage() {

  const router = useRouter();

  const { login } = useAuth();

  const [AdminId, setAdminId] = useState();
  const [password, setPassword] = useState("");



    const [error, setError] = useState('')
    // useEffect(() => {
    //   // Check if a session is established, e.g., by checking a session storage value
    //   const isLoggedIn = sessionStorage.getItem('AdminId');
    //   if (isLoggedIn) {
    //     // If already logged in, redirect to another page
    //     router.push("/Admin/Adminprofile");
    //   }
    // }, []);
 
    
    const handleSubmit = async (e) => {
      e.preventDefault();

      
   

      try {
        const response = await axios.post( process.env.NEXT_PUBLIC_API_ENDPOINT+"/admin/signin/", {AdminId, password })
        console.log("res: "+response.data)
        
          sessionStorage.setItem('AdminId', response.data);
          document.cookie = `${response.data}; domain=localhost; path=/`;
          login(AdminId, document.cookie);
          console.warn("AdminId: "+ AdminId)
          console.warn("Cookie: "+ document.cookie);
          router.push('/Admin/Adminprofile');
          

        //   if (document.getElementById('remember').checked) {
        //     // Set a cookie for remembering the credentials
        //     document.cookie = `rememberedAdminId=${AdminId};rememberedPassword=${password};expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()};path=/`;
        // }
         
          

  
      } catch (error) {
          console.log("error22: "+error.message)
        setError("invalid login")
      }
    }

return (

  <>

    <Title page="Login" />

     {/* <Layout>

     <section class="bg-gray-50 dark:bg-gray-900">

<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">

        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>

        Crime Management reporting system    

    </a>

    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">

            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">

                Sign in to your account

            </h1>

           

            <form onSubmit={handleSubmit}>

                <div>

                    <label htmlFor="AdminId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your AdminId</label>

                    <input type="number" name="AdminId" id="AdminId" value={AdminId} onChange={(e) => setAdminId(e.target.value)}class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required=""/>

                </div>

                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input  data-popover-target="popover-password" data-popover-placement="bottom" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
    <div data-popover id="popover-password" role="tooltip" class="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
        <div class="p-3 space-y-2">
            <h3 class="font-semibold text-gray-900 dark:text-white">Must have at least 6 characters</h3>
            <div class="grid grid-cols-4 gap-2">
                <div class="h-1 bg-orange-300 dark:bg-orange-400"></div>
                <div class="h-1 bg-orange-300 dark:bg-orange-400"></div>
                <div class="h-1 bg-gray-200 dark:bg-gray-600"></div>
                <div class="h-1 bg-gray-200 dark:bg-gray-600"></div>
            </div>
            <p>It’s better to have:</p>
            <ul>
                <li class="flex items-center mb-1">
                    <svg class="w-3.5 h-3.5 mr-2 text-green-400 dark:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                    </svg>
                    Upper & lower case letters
                </li>
                <li class="flex items-center mb-1">
                    <svg class="w-3 h-3 mr-2.5 text-gray-300 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    A symbol (#$&)
                </li>
                <li class="flex items-center">
                    <svg class="w-3 h-3 mr-2.5 text-gray-300 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    A longer password (min. 12 chars.)
                </li>
            </ul>
    </div>
    <div data-popper-arrow></div>
</div>

                <div class="flex items-center justify-between">

                    <div class="flex items-start">

                        <div class="flex items-center h-5">

                          <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>

                        </div>

                        <div class="ml-3 text-sm">

                          <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>

                        </div>

                    </div>

                    <a href="./PassChange" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">  got password?</a>

                </div>

                <br />

                <br />

               

                <button type="submit" value="Login" class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

                <p class="text-sm font-light text-gray-500 dark:text-gray-400">

               

                <br />

                <br />

                    Don't have an account yet? <a href="/Admin/Registration" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>

                </p>

            </form>

        </div>

    </div>

</div>

</section>

    </Layout> */}
<Layout>
         <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
            Crime Management reporting system    
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
               
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="AdminId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your AdminId</label>
                        <input type="number" name="AdminId" id="AdminId" value={AdminId} onChange={(e) => setAdminId(e.target.value)}class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required=""/>
                    </div>
                    <div>
                        <label htmlFor="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                    </div>
                    <label htmlFor="remember" class="flex items-center ml-3 text-sm">
    <input
        id="remember"
        type="checkbox"
        name="remember"
        class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-primary-300 focus:border-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
    />
    <span class="ml-2 text-gray-500 dark:text-gray-300">Remember me</span>
</label>
                    <br />
                    <br />
                   
                    <button type="submit" value="Login" class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                   
                    <br />
                    <br />
                        Don't have an account yet? <a href="/Admin/Registration" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section>
        </Layout>
  </>

);

}