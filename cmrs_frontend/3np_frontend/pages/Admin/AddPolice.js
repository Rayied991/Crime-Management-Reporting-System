import { useRouter } from "next/router";
import axios from 'axios';
import { useState } from "react";
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import Footer from "../Layout/footer";
const Layout = dynamic(() => import('../Layout/layout'), {
  ssr: false,
})
const Title = dynamic(() => import('../Layout/title'), {
  ssr: false,
})

export default function AddPolice() {
  const router = useRouter();
  const [adminid,setAdminId]=useState();
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
    formData.append("adminid", data.adminid);
    formData.append('username', data.username);
    formData.append('fname', data.fname);
    formData.append('lname', data.lname);
    formData.append('location', data.location);
    formData.append('email', data.email);
    formData.append('phoneNum', data.phoneNum);
    formData.append('password', data.password);
    formData.append('mypicfile', data.mypicfile[0]); //changed
    console.log(formData);

    try {
      const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/addpolice/${adminid}`,
          formData,
          {
              headers: {
                  "Content-Type": "multipart/form-data"
              }
          }
      );
  
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
      <form onSubmit={handleSubmit(onSubmit)} class="max-w-lg mx-auto" encType="multipart/form-data">
        <Title page="Add Police"/>
        <Layout />
          <h1 className="text-center text-2xl font-bold mb-4">Add Police Page</h1>
          

          <div class="form-group">
            <label htmlFor="username" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Username:</label>
            <input type="text" class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your UserName" {...register('username', { required: true })} />
            {errors.username && <span class="mt-2 text-sm text-red-600 dark:text-red-500">This field is required</span>}
          </div>
          <br />

          <div class="form-group">
            <label htmlFor="fname" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">First Name:</label>
            <input type="text" class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your First Name" {...register('fname', { required: true })} />
            {errors.fname && <span class="mt-2 text-sm text-red-600 dark:text-red-500">This field is required</span>}
          </div>
          <br />

          <div class="form-group">
            <label htmlFor="lname" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Last Name:</label>
            <input type="text" class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your Last Name" {...register('lname', { required: true })} />
            {errors.lname && <span class="mt-2 text-sm text-red-600 dark:text-red-500">This field is required</span>}
          </div>
          <br />

          

          <div class="form-group">
            <label htmlFor="location" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Location:</label>
            <input type="text" class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your Location" {...register('location', { required: true })} />
            {errors.location && <span class="mt-2 text-sm text-red-600 dark:text-red-500">This field is required</span>}
          </div>
          <br />

          <div class="form-group">
            <label htmlFor="email" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Email:</label>
            <input type="email" class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your Email" {...register('email', { required: true })} />
            {errors.email && <span class="mt-2 text-sm text-red-600 dark:text-red-500">This field is required</span>}
          </div>
          <br />

          <div class="form-group">
            <label htmlFor="phoneNum" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Phone Number:</label>
            <input type="text"  class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your Phone Number"{...register('phoneNum', { required: true })} />
            {errors.phoneNum && <span class="mt-2 text-sm text-red-600 dark:text-red-500">This field is required</span>}
          </div>
          <br />

          <div class="form-group">
            <label htmlFor="password" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Password:</label>
            <input type="password" class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your Password" {...register('password', { required: true })} />
            {errors.password && <span class="mt-2 text-sm text-red-600 dark:text-red-500">This field is required</span>}
          </div>
          <br />

          <div class="form-group">
                    <label htmlFor="file" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                    <input
                        type="file"
                        id="mypicfile"
                        class=" text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        {...register('mypicfile', { required: true, validate: validateFile })}
                    />
                    {errors.mypicfile && 
                    <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.mypicfile.type === 'required'
                        ? 'file is required'
                        : 'invalid file'}
                </p>
    }
                </div>
       <br></br>
       <div class="form-group">
           <label htmlFor="adminid" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Admin ID: </label>
           <input
            type="number"
            id="adminid" class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your Adminid"
            value={adminid}
            {...register("admin", { required: true })}
            onChange={(e) => setAdminId(e.target.value)}
          />
           {errors.admin &&  <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> This Field is Required!</p>}
        </div>
<br/>
          <div className="text-center">
            <button type="submit"
            class="text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-red-800"
         data-drawer-target="drawer-navigation"
         data-drawer-show="drawer-navigation"
         aria-controls="drawer-navigation" 
         align="center"
            >Add Police</button>
          </div>
        
      </form>
      {success && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{success}</p>}
      <br/>
      <button type="button" onClick={() => router.back()}>
              Click here to go back
            </button>
            <Footer/>
    </>
  );
}

