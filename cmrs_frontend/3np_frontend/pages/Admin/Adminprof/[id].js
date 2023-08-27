import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/pages/utils/authcontext";
import Footer from "@/pages/Layout/footer";


const Layout = dynamic(() => import('../../Layout/layout'), {
    ssr: false,
  })
  const Title = dynamic(() => import('../../Layout/title'), {
    ssr: false,
  })



export default function Adminprofile()
{
    const router = useRouter();

  const [AdminId, setAdminId] = useState();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState();
  const [password, setpassword] = useState("");

  const [CollectedpostData, setCollectedpostData] = useState(null);
  const [isFormComplete, setIsFormComplete] = useState(false);
 const aid=router.query.id;
  console.info("AdminId line(23)= " + router.query.id); // Working


  useEffect(() => {
    fetchAdmindata();
    
  }, [router.query.id]);

    // * Collect  Data
    useEffect(() => {
        if (CollectedpostData !== null) {
          console.log("Collected post Data:", CollectedpostData);
          setAdminId(router.query.id);
          setname(CollectedpostData.name);
          setemail(CollectedpostData.email);
          setphone(CollectedpostData.phone);
          setpassword(CollectedpostData.password);
         



          console.log("AdminId:", CollectedpostData.AdminId);
          console.log("name :", CollectedpostData.name);
          console.log("email :", CollectedpostData.email);
          console.log("phone :", CollectedpostData.phone);
          console.log("password :", CollectedpostData.password);
         
        }
      }, [CollectedpostData]);

      useEffect(() => {
        // Check if all required fields are filled
        const allFieldsFilled =
        name && email && phone && password;
    
        setIsFormComplete(allFieldsFilled);
      }, [name, email, phone, password]);
      
    
      const fetchAdmindata = async () => {
        try {
          const response = await axios.get(
            // `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/adminprofile/${aid}`
            "http://localhost:3000/admin/adminprofile/" + router.query.id,
            // { withCredentials: true }
          );  
          const data = response.data;
          console.info("Fetched Admin Data:", data);
    
          // Update the CollectedBookData state
          if (data != null) {
            setCollectedpostData(data);
            //setBook_Image(data.Book_Image);
          }
        } catch (error) {
          console.error("Error fetching Admin data:", error);
        }
      };
//PUT method
const handleSubmit = async (e)=>{
  e.preventDefault();
  //update 
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("password", password);
  
  
  console.log(formData); // Working

  try {
    console.log("Posting Data...");

    const response = await axios.put(
        process.env.NEXT_PUBLIC_API_ENDPOINT+"/admin/updateadmin/" + aid,
      {
        
        name:name,
        email: email,
        phone: phone,
        password:password,
      
        
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);

    if (response.data) {
      console.info("Data Has been Updated");
      // TODO: Reload the Page Here
    //   router.push({
    //     pathname: "../Layout//" + router.query.AdminId,
    //   });
    } else {
      console.info("Failed to Update");
    //   router.push({
    //     pathname: "error",
    //   });
    }
  } catch (error) {
    console.error("Error Update", error);
  }

  
  







};


const set_AdminId = (e)=> {
  setAdminId(e.target.value);
}
const set_name = (e) => {
  setname(e.target.value);
};
const set_email = (e) => {
  setemail(e.target.value);
};
const set_phone = (e) => {
  setphone(e.target.value);
};
const set_password = (e) => {
  setpassword(e.target.value);
};








return(

<>
<Title page= "Admin Update" />
<Layout />

<div>
<h1 className="text-center text-2xl font-bold mb-4">Admin Update</h1>
<form onSubmit={handleSubmit} class="max-w-lg mx-auto" >

<div  class="form-group">
<label htmlFor="AdminId" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Post AdminId :</label>
 <input 
 type="number"
 id="AdminId"
 placeholder={CollectedpostData?.AdminId}
 value={AdminId}
 class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" 
 onChange={set_AdminId}
 />
</div>

<div  class="form-group">
        <label htmlFor="name" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Name :</label>
        <input type="text" 
        placeholder={CollectedpostData?.name}
        id="name" 
        value={name}
        class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" 
       onChange={set_name}
        //  {...register('name', { required: true })}
        />
          {/* {errors.name && <p >FName is required</p>} */}
        </div>


 <div  class="form-group">
        <label htmlFor="email" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"> Email :
        </label>
        <input type="email" 
        placeholder={CollectedpostData?.email} 
        id="email" 
        value={email}
        class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" 
        onChange={set_email}
        // {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
        />
         {/* {errors.email && (
                    <p>
                      {errors.email.type === 'required'
                        ? 'Email is required'
                        : 'InvalAdminId email address'}
                    </p>
                                      )} */}
        </div  >

        <div class="form-group">
        <label htmlFor="phone" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Phone :</label>
        <input type="number" 
         placeholder={CollectedpostData?.phone} 
        id="phone"
        value={phone}
        class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" 
        onChange={set_phone}
        // {...register('phone', { required: true })}
        />
          {/* {errors.phone && <p >phone is required</p>} */}
        </div  >
        <div class="form-group">
        <label htmlFor="password" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">password :</label>
        <input type="password" 
        placeholder={CollectedpostData?.password} 
        id="password"  
        value={password}
        class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" 
        onChange={set_password}
        // {...register('password', { required: true })}
        />
          {/* {errors.password && <p >password is required</p>} */}
        </div>

       


       <br/>
        <div  className="text-center">
                  <input
                    
                    type="submit"
                    disabled={!isFormComplete}
                    value="Update "
                    class="text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-red-800"
                    data-drawer-target="drawer-navigation"
                    data-drawer-show="drawer-navigation"
                    aria-controls="drawer-navigation" 
                    align="center"
                  />
                </div>
           

                <a href="/Admin/Adminprofile" class="font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-blue-500">Back</a>

    </form>


</div>
<Footer/>




</>


)



}
