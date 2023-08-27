import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/authcontext';
import dynamic from 'next/dynamic'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Footer from '../Layout/footer';
const Layout = dynamic(() => import('../Layout/layout'), {
    ssr: false,
  })
  const Title = dynamic(() => import('../Layout/title'), {
    ssr: false,
  })

export default function LoginPage() {

  const router = useRouter();

  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm("");
  const [AdminId, setAdminId] = useState();
  const [password, setPassword] = useState("");



    const [error, setError] = useState('')
    useEffect(() => {
      // Check if a session is established, e.g., by checking a session storage value
      const isLoggedIn = sessionStorage.getItem('AdminId');
      if (isLoggedIn) {
        // If already logged in, redirect to another page
        router.push("/Admin/Adminprofile");
      }
    }, []);
 
    
    const onSubmit = async (e) => {
      // e.preventDefault();

      
   

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

    <Layout/>
   
   <div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
    <div class="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
    <div class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
    <div class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
    <div class="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
    <div class="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
        {/* <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-1-light.png" class="dark:hidden w-[272px] h-[572px]" alt=""/>
        <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-1-dark.png" class="hidden dark:block w-[272px] h-[572px]" alt=""/> */}


        <form onSubmit={handleSubmit(onSubmit)}>
            <div class='text-center dark:text-white'>
                <h1>Signin Page</h1>
            </div>
                    <div>
                        <label htmlFor="AdminId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your AdminId</label>
                        <input type="number" name="AdminId" id="AdminId" value={AdminId} 
                        onChange={(e) => setAdminId(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Id" required=""
                        {...register("AdminId", { required: true })}/>
                        {errors.AdminId &&  <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> This Field is Required!</p>}
                    </div>
                    <div>
                        <label htmlFor="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" value={password}
                        {...register("password", { required: true, minLength: 6 })}
                        onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                         {errors.password && (
              <span class="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.password.type === "required"
                  ? "Password is required"
                  : "Password should have at least 6 characters"}
              </span>
            )}  
                    </div>
                 
                    <br />
                    <br />
                   
                    <button
  type="submit"
  value="Login"
  class="w-full text-black bg-primary-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-blue-500 dark:focus:ring-primary-800 dark:text-white hover:shadow-md"
>
  Sign in
</button>
<p class="text-sm font-light text-gray-500 dark:text-gray-400">
            <br />
            <br />
            <a href="/Admin/OTPsend" class="font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-blue-500">
                Forget Password
            </a>
        </p>
<p class="text-sm font-light text-gray-500 dark:text-gray-400">
            <br />
            <br />
            Don't have an account yet?{' '}
            <a href="/Admin/Registration" class="font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-blue-500">
                Sign up
            </a>
        </p>


                    
                </form>
    </div>
</div>
<Footer/>
        
  </>

);

}