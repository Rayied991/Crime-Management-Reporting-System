import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
//import Layout from '../layout';
import dynamic from "next/dynamic";

const Layout = dynamic(() => import('../layout'), {
  ssr: false,
})
const _Title = dynamic(() => import('../title'), {
  ssr: false,
})
export default function REG() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const validateFile = (value) => {
    const file = value[0];
    const allowedtypes = ['image/jpg', 'image/png'];

    if (!allowedtypes.includes(file.type)) {
      return false;
    }
  };

  const [success, setSuccess] = useState('');

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append('fname', data.fname);
    formData.append('lname', data.lname);
    formData.append('username', data.username);
    formData.append('location', data.location);
    formData.append('email', data.email);
    formData.append('phoneNum', data.phoneNum);
    formData.append('password', data.password);
    formData.append('mypicfile', data.mypicfile[0]); //changed
    console.log(formData);

    try {
      const response = await axios.post('http://localhost:3000/police/registration', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setSuccess('Police added successfully');
      reset();
    } catch (error) {
      if (error.response?.data?.message) {
        //console.log(error.response.data.message);
        setSuccess('Police addition unsuccessful: ' + error.response.data.message);
      } else {
        console.log(error);
        setSuccess('An error occurred during police addition.');
      }
    }
  };

  return (
    <>
     <_Title title= "SignUp" />
    <Layout >
    

<section class="bg-[url('/RegPage.jpg')] bg-cover bg-center min-h-screen">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-4xl font-semibold text-black-00 text-black">
            {/* <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/> */}
            <br></br><br></br><br></br><br></br><br></br>
          Account Registration  
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                   Please Enter Your Information
                </h1>
               
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        
          {/* <h2>Registration Page</h2> */}
          {success && <p>{success}</p>}

          <div>
            <label htmlFor="fname">First Name:</label>
            <input type="text" {...register('fname', { required: true })} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Fname" required=""/>
            {errors.fname && <span>This field is required</span>}
          </div>
          

          <div>
            <label htmlFor="lname">Last Name:</label>
            <input type="text" {...register('lname', { required: true })} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Lname" required=""/>
            {errors.lname && <span>This field is required</span>}
          </div>
          

          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" {...register('username', { required: true })} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Username" required=""/>
            {errors.username && <span>This field is required</span>}
          </div>
          

          <div>
            <label htmlFor="location">Location:</label>
            <input type="text" {...register('location', { required: true })} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Location" required=""/>
            {errors.location && <span>This field is required</span>}
          </div>
          

          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" {...register('email', { required: true })} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Email" required=""/>
            {errors.email && <span>This field is required</span>}
          </div>
          

          <div>
            <label htmlFor="phoneNum">Phone Number:</label>
            <input type="text" {...register('phoneNum', { required: true })} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Phone Number" required=""/>
            {errors.location && <span>This field is required</span>}
          </div>
          

          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" {...register('password', { required: true })} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Password" required=""/>
            {errors.password && <span>This field is required</span>}
          </div>
          <br></br>

          <div>
                    <label htmlFor="file">File</label>
                    <input
                        type="file"
                        id="mypicfile" 
                        {...register('mypicfile', { required: true, validate: validateFile })}
                    />
                    {errors.mypicfile && 
                    <p>
                    {errors.mypicfile.type === 'required'
                        ? 'file is required'
                        : 'invalid file'}
                </p>
    }
                </div>
       <br></br>

          <div>
            <button type="submit" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">SignUp</button>
          </div>
          
         
          </form>
          <br></br><br></br>
            </div>
        </div>
    </div>
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            </div>  <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
  </section>
  </Layout>

        </>
      
  );
}






