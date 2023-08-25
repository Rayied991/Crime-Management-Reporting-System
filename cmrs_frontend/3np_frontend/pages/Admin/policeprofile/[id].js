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
  e.preventDefault();
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

<div>
<h1>Police Update</h1>
<form onSubmit={handleSubmit} >

<div>
<label htmlFor="username">username :</label>
 <input 
 type="text"
 id="username"
 placeholder={CollectedpostData?.username}
 value={username}
 onChange={set_username}
 />
</div>

<div>
        <label htmlFor="fname">fname :</label>
        <input type="text" 
        placeholder={CollectedpostData?.fname}
        id="fname" 
        value={fname}
       onChange={set_fname}
        //  {...register('name', { required: true })}
        />
          {/* {errors.name && <p >FName is required</p>} */}
        </div>
<div>
        <label htmlFor="lname">lname :</label>
        <input type="text" 
        placeholder={CollectedpostData?.lname}
        id="lname" 
        value={lname}
       onChange={set_lname}
        //  {...register('name', { required: true })}
        />
          {/* {errors.name && <p >FName is required</p>} */}
        </div>


 <div>
        <label htmlFor="email"> email :
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
       
        <div>
        <label htmlFor="location">location :</label>
        <input type="text" 
         placeholder={CollectedpostData?.location} 
        id="location"
        value={location}
        onChange={set_location}
        // {...register('phone', { required: true })}
        />
          {/* {errors.phone && <p >phone is required</p>} */}
        </div>

        <div>
        <label htmlFor="phoneNum">phoneNum :</label>
        <input type="text" 
         placeholder={CollectedpostData?.phoneNum} 
        id="phoneNum"
        value={phoneNum}
        onChange={set_phone}
        // {...register('phone', { required: true })}
        />
          {/* {errors.phone && <p >phone is required</p>} */}
        </div>

        
        

       


       
        <div className="text-center">
                  <input
                    
                    type="submit"
                    disabled={!isFormComplete}
                    value="Update "
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
