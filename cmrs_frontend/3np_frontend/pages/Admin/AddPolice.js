import { useRouter } from "next/router";
import axios from 'axios';
import { useState } from "react";
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
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
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Layout page="AddPolice">
          <h2>Registration Page</h2>
          {success && <p>{success}</p>}

          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" {...register('username', { required: true })} />
            {errors.username && <span>This field is required</span>}
          </div>
          <br />

          <div>
            <label htmlFor="fname">First Name:</label>
            <input type="text" {...register('fname', { required: true })} />
            {errors.fname && <span>This field is required</span>}
          </div>
          <br />

          <div>
            <label htmlFor="lname">Last Name:</label>
            <input type="text" {...register('lname', { required: true })} />
            {errors.lname && <span>This field is required</span>}
          </div>
          <br />

          

          <div>
            <label htmlFor="location">Location:</label>
            <input type="text" {...register('location', { required: true })} />
            {errors.location && <span>This field is required</span>}
          </div>
          <br />

          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" {...register('email', { required: true })} />
            {errors.email && <span>This field is required</span>}
          </div>
          <br />

          <div>
            <label htmlFor="phoneNum">Phone Number:</label>
            <input type="text" {...register('phoneNum', { required: true })} />
            {errors.location && <span>This field is required</span>}
          </div>
          <br />

          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" {...register('password', { required: true })} />
            {errors.password && <span>This field is required</span>}
          </div>
          <br />

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
           <label htmlFor="adminid">Admin ID: </label>
           <input
            type="number"
            id="adminid"
            value={adminid}
            onChange={(e) => setAdminId(e.target.value)}
          />
        </div>

          <div>
            <button type="submit">SignUp</button>
          </div>
        </Layout>
      </form>
      <br/>
      <button type="button" onClick={() => router.back()}>
              Click here to go back
            </button>
    </>
  );
}

