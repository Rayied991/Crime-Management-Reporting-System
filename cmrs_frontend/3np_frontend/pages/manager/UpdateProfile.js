import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from '../../utils/authcontext';


const Layout = dynamic(() => import('../../Layout/layout'), {
    ssr: false,
  })
  const Title = dynamic(() => import('../../Layout/title'), {
    ssr: false,
  })



export default function managerProfile()
{
    const router = useRouter();
     
    const [ManagerID, setManagerID] = useState();
    const [M_Name, setM_Name] = useState("");
    const [M_Email, setM_Email] = useState("");
    const [M_Password, setM_Password] = useState("");
  

  const [CollectedpostData, setCollectedpostData] = useState(null);
  const [isFormComplete, setIsFormComplete] = useState(false);
 const aid=router.query.id;
  console.info("ManagerID line(23)= " + router.query.ManagerID); 


  useEffect(() => {
    fetchManagerdata();
    
  }, [router.query.id]);

    // * Collect  Data
    useEffect(() => {
        if (CollectedpostData !== null) {
          console.log("Collected post Data:", CollectedpostData);
          setManagerID(router.query.ManagerID);
          setM_Name(CollectedpostData.M_Name);
          setM_Email(CollectedpostData.M_Email);
          setM_Password(CollectedpostData.M_Password);
      
         



          console.log("ManagerID:", CollectedpostData.ManagerID);
          console.log("M_Name :", CollectedpostData.M_Name);
          console.log("M_Email:", CollectedpostData.M_Email);
          console.log("M_Password :", CollectedpostData.M_Password);
        
         
        }
      }, [CollectedpostData]);

      useEffect(() => {
        // Check if all required fields are filled
        const allFieldsFilled =
        M_Name && M_Email && M_Password;
    
        setIsFormComplete(allFieldsFilled);
      }, [M_Name, M_Email, M_Password]);
      
    
      const fetchManagerdata = async () => {
        try {
          const response = await axios.get(
            
            "http://localhost:3000/manager/managerProfile/" + router.query.ManagerID,
            // { withCredentials: true }
          );  
          const data = response.data;
          console.info("Fetched manager Data:", data);
    
          // Update the CollectedBookData state
          if (data != null) {
            setCollectedpostData(data);
            //setBook_Image(data.Book_Image);
          }
        } catch (error) {
          console.error("Error fetching Manager data:", error);
        }
      };
//PUT method
const handleSubmit = async (e)=>{
  e.preventDefault();
  //update 
  const formData = new FormData();
  formData.append("M_Name", M_Name);
  formData.append("M_Email", M_Email);
  formData.append("M_Password", M_Password);
  
  
  console.log(formData); // Working

  try {
    console.log("Posting Data...");

    const response = await axios.put(
        process.env.NEXT_PUBLIC_API_ENDPOINT+"/manager/updatemanager/" + ManagerID,
      {
        
        M_Name:M_Name,
        M_Password: M_Password,
        M_Email: M_Email
 
      
        
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




const set_ManagerID = (e)=> {
  setManagerID(e.target.value);
}
const set_M_Name = (e) => {
  setM_Name(e.target.value);
};
const set_M_Password = (e) => {
  setM_Password(e.target.value);
};
const set_M_Email = (e) => {
  setM_Email(e.target.value);
};









return(

<>
<Title page= "Manager Update" />
<Layout />

<div>
<h1 className="text-center text-2xl font-bold mb-4">Manager Update</h1>
<form onSubmit={handleSubmit} class="max-w-lg mx-auto" >

<div  class="form-group">
<label htmlFor="ManagerID" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Post ManagerID :</label>
 <input 
 type="number"
 id="ManagerID"
 placeholder={CollectedpostData?.ManagerID}
 value={ManagerID}
 class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" 
 onChange={set_ManagerID}
 />
</div>

<div  class="form-group">
        <label htmlFor="M_Name" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Name :</label>
        <input type="text" 
        placeholder={CollectedpostData?.M_Name}
        id="M_Name" 
        value={M_Name}
        class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" 
       onChange={set_M_Name}
        //  {...register('name', { required: true })}
        />
          {/* {errors.name && <p >FName is required</p>} */}
        </div>


 <div  class="form-group">
        <label htmlFor="M_Email" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"> Email :
        </label>
        <input type="email" 
        placeholder={CollectedpostData?.M_Email} 
        id="M_Email" 
        value={M_Email}
        class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" 
        onChange={set_M_Email}
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
        <label htmlFor="M_Password" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">password :</label>
        <input type="password" 
        placeholder={CollectedpostData?.M_Password} 
        id="M_Password"  
        value={M_Password}
        class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" 
        onChange={set_M_Password}
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
           

                <a href="/manager/DashBaord" class="font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-blue-500">Back</a>

    </form>


</div>





</>


)



}