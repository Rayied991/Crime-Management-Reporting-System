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



export default function Victimprofile()
{
    const router = useRouter();

    const [username, setusername] = useState("");
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [location, setlocation] = useState("");
    const [email, setemail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [password, setpassword] = useState("");
    

  const [CollectedpostData, setCollectedpostData] = useState(null);
  const [isFormComplete, setIsFormComplete] = useState(false);
 const aid=router.query.id;
  console.info("Police id line(23)= " + router.query.id); // Working


  useEffect(() => {
    fetchVictimdata();
    
  }, [router.query.id]);

    // * Collect  Data
    useEffect(() => {
        if (CollectedpostData !== null) {
          console.log("Collected post Data:", CollectedpostData);
          setusername(router.query.id);
          setfname(CollectedpostData.fname);
          setlname(CollectedpostData.lname);
          setlocation(CollectedpostData.location);
          setemail(CollectedpostData.email);
          setPhoneNum(CollectedpostData.phoneNum);
          setpassword(CollectedpostData.password);
          
         



          console.log("Username:", CollectedpostData.username);
          console.log("Fname :", CollectedpostData.fname);
          console.log("Lname :", CollectedpostData.lname);
          console.log("Location :", CollectedpostData.location);
          console.log("email :", CollectedpostData.email);   
          console.log("phone :", CollectedpostData.phoneNum);
          console.log("Password :", CollectedpostData.password);
          
         
        }
      }, [CollectedpostData]);

      useEffect(() => {
        // Check if all required fields are filled
        const allFieldsFilled =
        fname && lname && email && password  && location && phoneNum ;
    
        setIsFormComplete(allFieldsFilled);
      }, [fname,lname,email,password,location,phoneNum]);
      
    
      const fetchVictimdata = async () => {
        try {
          const response = await axios.get(
            // `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/adminprofile/${aid}`
            "http://localhost:3000/admin/getpolice/" + router.query.id,
            // { withCredentials: true }
          );
          const data = response.data;
          console.info("Fetched Police Data:", data);
    
          // Update the CollectedBookData state
          if (data != null) {
            setCollectedpostData(data);
            //setBook_Image(data.Book_Image);
          }
        } catch (error) {
          console.error("Error fetching Police data:", error);
        }
      };
//PUT method
const handleSubmit = async (e)=>{
  // e.preventDefault();
  //update 
  const formData = new FormData();
  formData.append("fname", fname);
  formData.append("lname", lname);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("Location", location);
  formData.append("Phone", phoneNum);
  
  
  
  console.log(formData); // Working

  try {
    console.log("Posting Data...");

    const response = await axios.put(
        process.env.NEXT_PUBLIC_API_ENDPOINT+"/admin/updatepolice/" + router.query.id,
      {
        
          username: username,
          fname: fname,
          lname:lname,
          location:location,
          email: email,
          phoneNum:phoneNum,
          password: password
          
         
      
        
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


const set_username = (e)=> {
  setusername(e.target.value);
}
const set_fname = (e) => {
  setfname(e.target.value);
};
const set_lname = (e) => {
  setlname(e.target.value);
};
const set_email = (e) => {
  setemail(e.target.value);
};
const set_password = (e) => {
    setpassword(e.target.value);
  };

const set_phone = (e) => {
  setPhoneNum(e.target.value);
};
const set_location = (e) => {
  setlocation(e.target.value);
};








return(

<>
<Title page= "Police Update" />
<Layout />


<h1 className="text-center text-2xl font-bold mb-4">Police Update</h1>
<form onSubmit={handleSubmit} class="max-w-lg mx-auto" encType="multipart/form-data">

<div class="form-group">
<label htmlFor="username"  class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">username :</label>
 <input 
 type="text"
 id="username"
 placeholder={CollectedpostData?.username}
 class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" 
 value={username}
 onChange={set_username}
 />
</div>

<div class="form-group">
        <label htmlFor="fname"  class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">fname :</label>
        <input type="text" 
        placeholder={CollectedpostData?.fname}
        id="fname" 
        value={fname}
        class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" 
       onChange={set_fname}
        //  {...register('name', { required: true })}
        />
          {/* {errors.name && <p >FName is required</p>} */}
        </div>
<div class="form-group">
        <label htmlFor="lname"  class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">lname :</label>
        <input type="text" 
        placeholder={CollectedpostData?.lname}
        id="lname" 
        value={lname}         class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" 
       onChange={set_lname}
        //  {...register('name', { required: true })}
        />
          {/* {errors.name && <p >FName is required</p>} */}
        </div>


 <div class="form-group">
        <label htmlFor="email"  class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"> email :
        </label>
        <input type="email" 
        placeholder={CollectedpostData?.email} 
        id="email" 
        value={email}         class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" 
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
        </div>
        <div class="form-group">
        <label htmlFor="password"  class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">password :</label>
        <input type="password" 
        placeholder={CollectedpostData?.password} 
        id="password"  
        value={password}         class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" 
        onChange={set_password}
        // {...register('password', { required: true })}
        />
          {/* {errors.password && <p >password is required</p>} */}
        </div>
       
        <div class="form-group">
        <label htmlFor="location"  class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">location :</label>
        <input type="text" 
         placeholder={CollectedpostData?.location} 
        id="location"
        value={location} 
        class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" 
        onChange={set_location}
        // {...register('phone', { required: true })}
        />
          {/* {errors.phone && <p >phone is required</p>} */}
        </div>

        <div class="form-group">
        <label htmlFor="phoneNum"  class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">phoneNum :</label>
        <input type="text" 
         placeholder={CollectedpostData?.phoneNum} 
        id="phoneNum"
        value={phoneNum}         
        class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" 
        onChange={set_phone}
        // {...register('phone', { required: true })}
        />
          {/* {errors.phone && <p >phone is required</p>} */}
        </div>

        
        

       


       
          <br/>
        <div className="text-center">
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
          



    </form>
    <a href="/Admin/Adminprofile" class="font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-blue-500">Back</a>

<Footer/>



</>


)



}
