import { useRouter } from "next/router";
import axios from 'axios';
import { useState } from "react";
import Footer from "../Layout/footer";
import dynamic from 'next/dynamic';
import { useForm } from "react-hook-form";
const Layout = dynamic(() => import('../Layout/layout'), {
  ssr: false,
})
const Title = dynamic(() => import('../Layout/title'), {
  ssr: false,
})
export default function AddAdmin(){

  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset } = useForm("");

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState();

  const onSubmit = async (e) => {
    // e.preventDefault();
    if (!name || !email || !password || !phone) {
      console.error("All fields are required.");
      return;
    }
  
    try {
      console.log("Posting Data");
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/addadmin/",
        {
          name  : name,
          email: email,
          password: password,
          phone: phone
        },
        {
          headers: {
            " Content-Type": "application/x-www-form-urlencoded"
          },
          
        }
      );
  
      console.warn(response);
  
      if (response.data) {
       reset();
        window.location.reload();
      } else {
        router.push({
          pathname: "error",
        });
      }
    } catch (error) {
      console.error("Error Adding Admin", error);
    }
  };
  

    return (
<>
< Title page= "Add Admin" />

<Layout />
<div class="mb-6">

        <h1  className="text-center text-2xl font-bold mb-4">Registration Page</h1>
       
       
        <form onSubmit={handleSubmit(onSubmit)} class="max-w-lg mx-auto">
 
        
<div class="form-group">
        <label htmlFor="name" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500" >Admin Name:</label>
        <input type="text" 
        id="name" 
         class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your Admin Name"
        value={name}
        {...register("name", { required: true })}
       onChange={(e) => setname(e.target.value)}
       
        />
       
           {errors.name &&  <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> This Field is Required!</p>}
        </div>


        <div class="form-group">
        <label htmlFor="email"  class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500" > Email:
        </label>
        <input type="email"  
        id="email" 
          class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your Email"
        value={email}
        {...register('email', { required: true, pattern:  /\S+@\S+\.\S+/ })}
        onChange={(e) => setemail(e.target.value)}
        />
         {errors.email && (
                    <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                      {errors.email.type === 'required'
                        ? 'Email is required'
                        : 'Invalid email address'}
                      
                      
                    </p>
                    
                                      )}
        </div>

        <div class="form-group">
        <label htmlFor="password"  class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Password: </label>
        <input type="password" 
        id="password"
         class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your Password"
        value={password}
        {...register("password", { required: true, minLength: 6 })}
        onChange={(e) => setpassword(e.target.value)}
        />
          {errors.password && (
              <span class="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.password.type === "required"
                  ? "Password is required"
                  : "Password should have at least 6 characters"}
              </span>
            )}  
        </div >
        <div class="form-group">
        <label htmlFor="phone" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500" >Phone:</label>
        <input type="number" 
        id="phone"
        class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter Phone Number"
        value={phone}
        {...register("phone", { required: true, minLength: 10 })}
        onChange={(e) => setphone(e.target.value)}
     
        />
         {errors.phone && (
              <span class="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.phone.type === "required"
                  ? "Phone is required"
                  : "Phone should have at least 10 digits"}
              </span>
            )}
        </div>
        <br></br>

        <div className="text-center">
        <input type="submit" 
         class="text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-red-800"
         data-drawer-target="drawer-navigation"
         data-drawer-show="drawer-navigation"
         aria-controls="drawer-navigation" 
         align="center"
        
        value="Register" 
       
        />
        </div>
        
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">

                   

                    <br />

                    <br />

                        Already Have an Account! <a href="/Admin/Signin" class="font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-blue-500">Sign in</a>

                    </p>

        
         
      
        
      </form>
      </div>
    

        <br></br>
        <Footer/>
        
     
</>
    );
}