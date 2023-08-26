import { useRouter } from "next/router";
import axios from 'axios';
import { useState } from "react";
import dynamic from 'next/dynamic';
import { useForm } from "react-hook-form";
import Footer from "../Layout/footer";
const Layout = dynamic(() => import('../Layout/layout'), {
  ssr: false,
})
const Title = dynamic(() => import('../Layout/title'), {
  ssr: false,
})


export default function AddVictim() {
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
    formData.append('VicEmail', data.VicEmail);
    formData.append('Victim_FName', data.Victim_FName);
    formData.append('Victim_LName', data.Victim_LName);
    formData.append('Phone', data.Phone);
    formData.append('NID_No', data.NID_No);
    formData.append('Vicpassword', data.Vicpassword);
    formData.append('Confirm_Vicpassword', data.Confirm_Vicpassword);
    formData.append('image', data.image[0]);
//changed
    console.log(formData);

    try {
      const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/addVictim/${adminid}`,
          formData,
          {
              headers: {
                  "Content-Type": "multipart/form-data"
              }
          }
      );
  
      setSuccess('Victim added successfully');
      reset();
    } catch (error) {
      if (error.response?.data?.message) {
        //console.log(error.response.data.message);
        setSuccess('Victim addition unsuccessful: ' + error.response.data.message);
      } else {
        console.log(error);
        setSuccess('An error occurred during Victim addition.');
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} class="max-w-lg mx-auto" encType="multipart/form-data">
        <Title page="Add Victim"/>
          <Layout/>
          <h1 className="text-center text-2xl font-bold mb-4">Add Victim Page</h1>
          {success && <p>{success}</p>}

         
          <div class="form-group">
            <label htmlFor="Victim_FName" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Victim_FName:</label>
            <input type="text" 
             class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your First Name"
           {...register('Victim_FName', { required: true })} />
             {errors.Victim_FName && <p  class="mt-2 text-sm text-red-600 dark:text-red-500">FName is required</p>}
          </div>
          <br />

          <div class="form-group">
            <label htmlFor="Victim_LName" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"> Victim_LName:</label>
            <input type="text" class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your Last Name"
             {...register('Victim_LName', { required: true })} />
             {errors.Victim_LName && <p  class="mt-2 text-sm text-red-600 dark:text-red-500">LName is required</p>}
          </div>
          <br />
          <div class="form-group">
            <label htmlFor="VicEmail" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">VicEmail:</label>
            <input type="email"  class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your Email"
            {...register('VicEmail', { required: true, pattern: /\S+@\S+\.\S+/ })}/> 
            {errors.VicEmail && (
                    <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                      {errors.VicEmail.type === 'required'
                        ? 'Email is required'
                        : 'Invalid email address'}
                    </p>
                                      )}
          </div>
          <br />

          <div class="form-group">
            <label htmlFor="Phone" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Phone:</label>
            <input type="number"  class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your Phone No"
        {...register('Phone', { required: true })} />
              {errors.Phone && <p  class="mt-2 text-sm text-red-600 dark:text-red-500">Phone Number is required</p>}
          </div>
          <br />
          <div class="form-group">
            <label htmlFor="NID_No" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">NID_No:</label>
            <input type="number"  class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your NID No"
            {...register('NID_No', { required: true })} />
            {errors.NID_No && <p  class="mt-2 text-sm text-red-600 dark:text-red-500">NID is required</p>}
          </div>
          <br />

          <div class="form-group">
            <label htmlFor="Vicpassword" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Vicpassword:</label>
            <input type="password" class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your Password"
           {...register('Vicpassword', { required: true })} />
             {errors.Vicpassword && (
                    <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                      {errors.Vicpassword.type === 'required'
                        ? 'Password is required'
                        : 'Invalid password pattern'}
                    </p>
                  )}
          </div>
          <br />
          <div class="form-group">
            <label htmlFor="Confirm_Vicpassword" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Confirm_Vicpassword:</label>
            <input type="password"  class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter Password"
            {...register('Confirm_Vicpassword', { required: true })} />
            {errors.Confirm_Vicpassword && (
                    <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                      {errors.Confirm_Vicpassword.type === 'required'
                        ? 'Password is required'
                        : 'Invalid password pattern'}
                    </p>
                  )}
          </div>
          <br />

          <div class="form-group">
                    <label htmlFor="image" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                    <input
                        type="file"
                        id="image" 
                        class=" text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        {...register('image', { required: true, validate: validateFile })}
                    />
                    {errors.image && 
                    <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.image.type === 'required'
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
            id="adminid" class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your Email"
            value={adminid}
            {...register('adminid', { required: true })}
            onChange={(e) => setAdminId(e.target.value)}
          />
          {errors.adminid && <p  class="mt-2 text-sm text-red-600 dark:text-red-500">Admin id is required</p>}
        </div>
<br/>
          <div className="text-center">
            <button type="submit"
            class="text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-red-800"
            data-drawer-target="drawer-navigation"
            data-drawer-show="drawer-navigation"
            aria-controls="drawer-navigation" 
            align="center"
            >Add Victim</button>
          </div>
      
      </form>
      <br/>
      <button type="button" class="font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-blue-500" onClick={() => router.back()}>
              Click here to go back
            </button>
            <Footer/>
    </>
  );

}
