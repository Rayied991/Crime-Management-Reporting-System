import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/pages/utils/authcontext";


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
<h1>Admin Update</h1>
<form onSubmit={handleSubmit} >

<div>
<label htmlFor="AdminId">Post AdminId :</label>
 <input 
 type="number"
 id="AdminId"
 placeholder={CollectedpostData?.AdminId}
 value={AdminId}
 onChange={set_AdminId}
 />
</div>

<div>
        <label htmlFor="name">Name :</label>
        <input type="text" 
        placeholder={CollectedpostData?.name}
        id="name" 
        value={name}
       onChange={set_name}
        //  {...register('name', { required: true })}
        />
          {/* {errors.name && <p >FName is required</p>} */}
        </div>


 <div>
        <label htmlFor="email"> Email :
        </label>
        <input type="email" 
        placeholder={CollectedpostData?.email} 
        id="email" 
        value={email}
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

        <div>
        <label htmlFor="phone">Phone :</label>
        <input type="number" 
         placeholder={CollectedpostData?.phone} 
        id="phone"
        value={phone}
        onChange={set_phone}
        // {...register('phone', { required: true })}
        />
          {/* {errors.phone && <p >phone is required</p>} */}
        </div>
        <div>
        <label htmlFor="password">password :</label>
        <input type="password" 
        placeholder={CollectedpostData?.password} 
        id="password"  
        value={password}
        onChange={set_password}
        // {...register('password', { required: true })}
        />
          {/* {errors.password && <p >password is required</p>} */}
        </div>

       


       
        <div className="text-center">
                  <input
                    
                    type="submit"
                    disabled={!isFormComplete}
                    value="Update "
                    className="px-6 py-2 bg-blue-500 text-white rounded cursor-pointer disabled:opacity-50 hover:bg-blue-600"
                  />
                </div>
            {/* You can open the modal using AdminId.showModal() method */}
      {/* <button className="btn" >open modal</button> */}
      {/* <dialog AdminId="confirm_Delete" className="modal">
        <form method="dialog" className="modal-box"> */}
          {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button> */}
          {/* <h3 className="font-bold text-lg">Confirm Delete?</h3>
          <p className="py-4">Are you sure that you want to delete it?</p> */}
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            {/* <button onClick={ handleDelete } className="btn">
              Delete
            </button> */}
          </div>



    </form>


</div>




</>


)



}
