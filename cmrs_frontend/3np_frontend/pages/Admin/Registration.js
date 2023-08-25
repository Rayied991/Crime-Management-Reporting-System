
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

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !phone) {
      console.error("All fields are required.");
      return;
    }
  
    try {
      console.log("Posting Data");
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/addadmin/",
        {
          name  : name,
          email: email,
          password: password,
          phone: phone
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
      console.error("Error Adding Admin", error);
    }
  };
  

    return (
<>
< title page= "Add Admin" />

<Layout />
<div>
        <h1>Registration Page</h1>
    
<form onSubmit={handleSubmit} >
 
        
<div>
        <label htmlFor="name">Admin Name :</label>
        <input type="text" 
        id="name" 
        value={name}
       onChange={(e) => setname(e.target.value)}
       
        />
          {/* {errors.fullName && <p >FName is required</p>} */}
        </div>


        <div>
        <label htmlFor="email"> Email :
        </label>
        <input type="email"  
        id="email" 
        value={email}
        onChange={(e) => setemail(e.target.value)}
        // {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
        />
         {/* {errors.email && (
                    <p>
                      {errors.email.type === 'required'
                        ? 'Email is required'
                        : 'Invalid email address'}
                    </p>
                                      )} */}
        </div>

        <div>
        <label htmlFor="password"> Password :</label>
        <input type="password" 
        id="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
       
        />
          {/* {errors.M_Password && <p >M_Password is required</p>} */}
        </div>
        <div>
        <label htmlFor="phone">phone :</label>
        <input type="number" 
        id="phone"
        value={phone}
        onChange={(e) => setphone(e.target.value)}
     
        />
          {/* {errors.M_Password && <p >M_Password is required</p>} */}
        </div>
       

       
       

      
        
        <div>
        <input type="submit" 
        value="Register" 
        />
        </div>

        <div>
        {/* <label for="number">phone :</label>
        <input type="text" 
        id="Eventdate"  
        value={Eventdate}
        onChange={(e) => setEventdate(e.target.value)}
        // {...register('Eventdate', { required: true })}
        />
          {errors.Eventdate && <p >Eventdate is required</p>} */}
        </div>
       
       {/* Hidden vicitm id passed as foreign key */}
        {/* <input type="number" id="phone" value={phone} */}

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

  