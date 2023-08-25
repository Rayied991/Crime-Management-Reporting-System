import { useRouter } from "next/router";
import axios from 'axios';
import { useState } from "react";
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('../Layout/layout'), {
  ssr: false,
})
const Title = dynamic(() => import('../Layout/title'), {
  ssr: false,
})
export default function AddManager(){
    
  const router = useRouter();

  const [M_Name, setM_Name] = useState("");
  const [M_Email, setM_Email] = useState("");
  const [M_Password, setM_Password] = useState("");
  const [admin, setadmin] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!M_Name || !M_Email || !M_Password || !admin) {
      console.error("All fields are required.");
      return;
    }
  
    try {
      console.log("Posting Data");
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/addmanager/",
        {
          M_Name: M_Name,
          M_Email: M_Email,
          M_Password: M_Password,
          admin: admin
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
< title page= "Add Manager" />

<Layout />
<div>
        <h1>Add Manager Page</h1>
    
<form onSubmit={handleSubmit} encType="multipart/form-data" >
 
        
<div>
        <label htmlFor="M_Name">Manager Name :</label>
        <input type="text" 
        id="M_Name" 
        value={M_Name}
       onChange={(e) => setM_Name(e.target.value)}
       
        />
          {/* {errors.M_Name && <p >FName is required</p>} */}
        </div>


        <div>
        <label htmlFor="email">Manager Email :
        </label>
        <input type="email"  
        id="M_Email" 
        value={M_Email}
        onChange={(e) => setM_Email(e.target.value)}
        // {...register('M_Email', { required: true, pattern: /\S+@\S+\.\S+/ })}
        />
         {/* {errors.email && (
                    <p>
                      {errors.M_Email.type === 'required'
                        ? 'Email is required'
                        : 'Invalid email address'}
                    </p>
                                      )} */}
        </div>

        <div>
        <label htmlFor="M_Password">Manager Password :</label>
        <input type="password" 
        id="M_Password"
        value={M_Password}
        onChange={(e) => setM_Password(e.target.value)}
       
        />
          {/* {errors.M_Password && <p >M_Password is required</p>} */}
        </div>
        <div>
        <label htmlFor="admin">admin :</label>
        <input type="number" 
        id="adminid"
        value={admin}
        onChange={(e) => setadmin(e.target.value)}
     
        />
          {/* {errors.M_Password && <p >M_Password is required</p>} */}
        </div>
       

       
       

      
        
        <div>
        <input type="submit" 
        value="Register" 
        />
        </div>

        <div>
        {/* <label for="number">admin :</label>
        <input type="text" 
        id="Eventdate"  
        value={Eventdate}
        onChange={(e) => setEventdate(e.target.value)}
        // {...register('Eventdate', { required: true })}
        />
          {errors.Eventdate && <p >Eventdate is required</p>} */}
        </div>
       
       {/* Hidden vicitm id passed as foreign key */}
        {/* <input type="number" id="admin" value={admin} */}

        {/* /> */}
         
      
        
      </form>
      </div>

        <br></br>
        <button type="button" onClick={() => router.back()}>
              Back
            </button>
     
</>
    );
}
