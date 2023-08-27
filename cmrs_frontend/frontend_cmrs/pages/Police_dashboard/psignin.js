
/*
import dynamic from "next/dynamic";
import axios from "axios";

//import dotenv from 'dotenv';

import { useState } from 'react'

import { useRouter } from 'next/router';
import { useAuth } from "../utils/authcontext";
//import Layout from '../layout';

//import Link from 'next/link'
const Layout = dynamic(() => import("../layout"));
const _Title = dynamic(() => import("../title"));
export default function Login() {
  const router = useRouter();

  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
       //setError("Email and password are required");
    } 
    
    else if (!isValidUsername(username)) {
      //setError("Invalid email address");
    } else {
      const data = await axios.post(
        "https://localhost:3000/police/plogin",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      
      if (data.data) {
        
        login(username, document.cookie);
        console.log(data.data);
        router.push({
          pathname: "/Police_dashboard/policeprofile",
        });
      } else {
        // ! Create a Toast Message => Text is Invalid User
      }
      console.log(data);
    }
  };

  const isValidUsername= (username) => {
    const usernamePattern = /^[a-zA-Z0-9._-]{1,12}$/;
    return usernamePattern.test(username);
  };

  return (
    <>
      <_Title title="Login" />
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
                      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                      <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)}class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
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
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <br />
                  <br />
                 
                  <button type="submit" value="Login" class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                 
                  <br />
                  <br />
                      Don't have an account yet? <a href="/Police_dashboard/Registration" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
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
*/

"use client"
import dynamic from "next/dynamic";
import { useState } from 'react'
import axios from 'axios'

import { useRouter } from 'next/router';


import { useAuth } from "../utils/authcontext";
const Layout = dynamic(() => import("../layout"));
const _Title = dynamic(() => import("../title"));

export default function Login() {
  const router = useRouter();

  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


    const [error, setError] = useState('')
   if (typeof window !== 'undefined') {
      
      const isLoggedIn = sessionStorage.getItem('username');
      if (isLoggedIn) {
        // If already logged in, redirect to another page
        router.push("/Police_dashboard/policeprofile");
      } 
    }
    
    

    
    const handleSubmit = async (e) => {
      e.preventDefault();

      
   

      try {
        const response = await axios.post( "http://localhost:3000/police/plogin", {username, password })
        console.log("res: "+response.data)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('username', response.data);
      /*    const isLoggedIn = sessionStorage.getItem('username');
      if (isLoggedIn) {
        // If already logged in, redirect to another page
        router.push("/Police_dashboard/policeprofile");*/
      } 
        

        
        
          login(username, document.cookie);
          router.push("/Police_dashboard/policeprofile");
          

  
      } catch (error) {
          console.log("error22: "+error.message)
        setError("invalid login")
      }
    }

  
      
    return (
      <>
        <_Title title="Login" />
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
                        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                        <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)}class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required=""/>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
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
                        <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                    </div>
                    <br />
                    <br />
                   
                    <button type="submit" value="Login" class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                   
                    <br />
                    <br />
                        Don't have an account yet? <a href="/Police_dashboard/Registration" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
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
  

