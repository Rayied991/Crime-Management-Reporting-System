import { useRouter } from "next/router";
import axios from 'axios';
import { useState } from "react";
import dynamic from 'next/dynamic';
import { useForm } from "react-hook-form";
import Footer from "../../Layout/footer";
const Layout = dynamic(() => import('../../Layout/layout'), {
  ssr: false,
})
const Title = dynamic(() => import('../../Layout/title'), {
  ssr: false,
})
export default function Signup(){
    
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm("");


  const [M_Name, setM_Name] = useState("");
  const [M_Email, setM_Email] = useState("");
  const [M_Password, setM_Password] = useState("");


  const onSubmit = async (e) => {
    // e.preventDefault();
    if (!M_Name || !M_Email || !M_Password ) {
      console.error("All fields are required.");
      return;
    }
  
    try {
      console.log("Posting Data");
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/manager/signup/",
        {
          M_Name: M_Name,
          M_Email: M_Email,
          M_Password: M_Password
     
        },
        {
          headers: {
            " Content-Type": "application/x-www-form-urlencoded"
          },
          withCredentials: true
        }
      );
  
      console.warn(response);
  
      if (response.data) {
       
        window.location.reload();
      } else {
        router.push({
          pathname: "error",
        });
      }
    } catch (error) {
      console.error("Error Adding Manager", error);
    }
  };
  

    return (
<>
< Title page= "Add Manager" />

<Layout />
<div>
        <h1 className="text-center text-2xl font-bold mb-4">Add Manager Page</h1>
    

 <form onSubmit={handleSubmit(onSubmit)} class="max-w-lg mx-auto" >
        
<div class="form-group">
        <label htmlFor="M_Name" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500" >Manager Name :</label>
        <input type="text" 
        id="M_Name" 
        class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your Manager Name"
        value={M_Name}
        {...register("M_Name", { required: true })}
       onChange={(e) => setM_Name(e.target.value)}
       
        />
           {errors.M_Name &&  <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> This Field is Required!</p>}
        </div>


        <div class="form-group">
        <label htmlFor="email" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500" >Manager Email :
        </label>
        <input type="email"  
        id="M_Email" 
        class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your Email"
        value={M_Email}
        

        {...register('M_Email', { required: true, pattern:  /\S+@\S+\.\S+/ })}
        onChange={(e) => setM_Email(e.target.value)}
        />
         {errors.M_Email && (
                    <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                      {errors.M_Email.type === 'required'
                        ? 'Email is required'
                        : 'Invalid email address'}
                      
                      
                    </p>
                    
                                      )}
        </div>

        <div class="form-group">
        <label htmlFor="M_Password" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500" >Manager Password :</label>
        <input type="password" 
        id="M_Password"
        class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your Password"
        value={M_Password}
        {...register("M_Password", { required: true, minLength: 6 })}
        onChange={(e) => setM_Password(e.target.value)}
       
        />
           {errors.M_Password && (
              <span class="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.M_Password.type === "required"
                  ? "Password is required"
                  : "Password should have at least 6 characters"}
              </span>
            )} 
        </div>
        {/* <div class="form-group">
        <label htmlFor="admin"  class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500" >admin :</label>
        <input type="number" 
        id="adminid"
        class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your Admin id"
        value={admin}
        {...register("admin", { required: true })}
      
        onChange={(e) => setadmin(e.target.value)}
     
        />
        {errors.admin &&  <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> This Field is Required!</p>}
           
        </div>
       

        */}
       

      
        <br/>
        <div className="text-center">
        <input type="submit" 
        value="Add Manager" 
        class="text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-red-800"
         data-drawer-target="drawer-navigation"
         data-drawer-show="drawer-navigation"
         aria-controls="drawer-navigation" 
         align="center"
        />
        </div>

        
         
      
        
      </form>
      </div>

        <br></br>
        <a href="/manager/DashBaord" class="font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-blue-500">Back</a>
     <Footer/>
</>
    );
}
