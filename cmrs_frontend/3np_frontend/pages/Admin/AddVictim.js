import { useRouter } from "next/router";
import axios from 'axios';
import { useState } from "react";
import dynamic from 'next/dynamic';
import { useForm } from "react-hook-form";
const Layout = dynamic(() => import('../Layout/layout'), {
  ssr: false,
})
const Title = dynamic(() => import('../Layout/title'), {
  ssr: false,
})
// export default function AddVictim() {
//     const router = useRouter();
//     const [adminid, setAdminId] = useState();
//     const [Victim_FName, setVictim_FName] = useState("");
//     const [Victim_LName, setVictim_LName] = useState("");
//     const [VicEmail, setVicEmail] = useState("");
//     const [Vicpassword, setVicpassword] = useState("");
//     const [Confirm_Vicpassword, setConfirm_Vicpassword] = useState("");
//     const [NID_No, setNID_No] = useState("");
//     const [Phone, setPhone] = useState("");
//     const [Insertfile_NID, setInsertfile_NID] = useState("");

//     // const admin=router.query.id;
//     console.log(adminid);
   
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!adminid||!Victim_FName ||!Victim_LName || !VicEmail||!Vicpassword || !Confirm_Vicpassword||!NID_No||!Phone||!Insertfile_NID ) {
//           console.error("All fields are required.");
//           return;
//         }
      
//         try {
//           console.log("Posting Data");
//           const response = await axios.post(
//             `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/addVictim/${router.query.adminid}`,
//             // process.env.NEXT_PUBLIC_API_ENDPOINT+"/admin/addVictim/",
//             {
//               Victim_FName: Victim_FName,
//               Victim_LName: Victim_LName,
//               VicEmail: VicEmail,
//               Vicpassword: Vicpassword,
//               Confirm_Vicpassword:Confirm_Vicpassword,
//               NID_No:NID_No,
//               Phone:Phone,
//               Insertfile_NID:Insertfile_NID
             
//             },
//             {
//               headers: {
//                 "Content-Type": "application/x-www-form-urlencoded"
//               },
//               withCredentials: true
//             }
//           );
      
//           // console.warn(response);
      
//           if (response.data) {
           
//             window.location.reload();
//           } else {
//             router.push({
//               pathname: "error",
//             });
//           }
//         } catch (error) {
//           console.error("Error Adding Victim", error);
//         }
//       };
    
      
      
    
//         return (
//     <>
//     < Title page= "Add Victim" />
    
//     <Layout />
//     <div>
//             <h1>Add Victim Page</h1>
        
//     <form onSubmit={handleSubmit} >
     
//     <div>
//           <label htmlFor="adminid">Admin ID: </label>
//           <input
//             type="text"
//             id="adminid"
//             value={adminid}
//             onChange={(e) => setAdminId(e.target.value)}
//           />
//         </div>
//     <div>
//             <label htmlFor="Victim_FName">Victim_FName :</label>
//             <input type="text" 
//             id="Victim_FName" 
//             value={Victim_FName}
//            onChange={(e) => setVictim_FName(e.target.value)}
           
//             />
//               {/* {errors.M_Name && <p >FName is required</p>} */}
//             </div>
//     <div>
//             <label htmlFor="Victim_LName">Victim_LName :</label>
//             <input type="text" 
//             id="Victim_LName" 
//             value={Victim_LName}
//            onChange={(e) => setVictim_LName(e.target.value)}
           
//             />
//               {/* {errors.M_Name && <p >FName is required</p>} */}
//             </div>
    
    
//             <div>
//             <label htmlFor="VicEmail">VicEmail :
//             </label>
//             <input type="email"  
//             id="VicEmail" 
//             value={VicEmail}
//             onChange={(e) => setVicEmail(e.target.value)}
//             // {...register('M_Email', { required: true, pattern: /\S+@\S+\.\S+/ })}
//             />
//              {/* {errors.email && (
//                         <p>
//                           {errors.M_Email.type === 'required'
//                             ? 'Email is required'
//                             : 'Invalid email address'}
//                         </p>
//                                           )} */}
//             </div>
    
//             <div>
//             <label htmlFor="Vicpassword">Vicpassword :</label>
//             <input type="password" 
//             id="Vicpassword"
//             value={Vicpassword}
//             onChange={(e) => setVicpassword(e.target.value)}
           
//             />
//               {/* {errors.M_Password && <p >M_Password is required</p>} */}
//             </div>
//             <div>
//             <label htmlFor="Confirm_Vicpassword">Confirm_Vicpassword :</label>
//             <input type="password" 
//             id="Confirm_Vicpassword"
//             value={Confirm_Vicpassword}
//             onChange={(e) => setConfirm_Vicpassword(e.target.value)}
           
//             />
//               {/* {errors.M_Password && <p >M_Password is required</p>} */}
//             </div>
//             <div>
//             <label htmlFor="NID_No">NID_No :</label>
//             <input type="number" 
//             id="NID_No"
//             value={NID_No}
//             onChange={(e) => setNID_No(e.target.value)}
           
//             />
//               {/* {errors.M_Password && <p >M_Password is required</p>} */}
//             </div>
//             <div>
//             <label htmlFor="Phone">Phone :</label>
//             <input type="number" 
//             id="Phone"
//             value={Phone}
//             onChange={(e) => setPhone(e.target.value)}
           
//             />
//               {/* {errors.M_Password && <p >M_Password is required</p>} */}
//             </div>
//             <div>
//             <label htmlFor="Insertfile_NID">Insertfile_NID :</label>
//             <input type="text" 
//             id="Insertfile_NID"
//             value={Insertfile_NID}
//             onChange={(e) => setInsertfile_NID(e.target.value)}
           
//             />
//               {/* {errors.M_Password && <p >M_Password is required</p>} */}
//             </div>
            
    
           
           
    
          
            
//             <div>
//             <input type="submit" 
//             value="Register" 
//             />
//             </div>
    
//             <div>
//             {/* <label for="number">admin :</label>
//             <input type="text" 
//             id="Eventdate"  
//             value={Eventdate}
//             onChange={(e) => setEventdate(e.target.value)}
//             // {...register('Eventdate', { required: true })}
//             />
//               {errors.Eventdate && <p >Eventdate is required</p>} */}
//             </div>
           
//            {/* Hidden vicitm id passed as foreign key */}
//             {/* <input type="number" id="admin" value={admin} */}
    
//             {/* /> */}
             
          
            
//           </form>
//           </div>
    
//             <br></br>
//             <button type="button" onClick={() => router.back()}>
//                   Back
//                 </button>
         
//     </>
//         );
//     }

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
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Layout page="Add Victim">
          <h2>Add Victim Page</h2>
          {success && <p>{success}</p>}

         
          <div>
            <label htmlFor="Victim_FName">Victim_FName:</label>
            <input type="text" {...register('Victim_FName', { required: true })} />
            {errors.fname && <span>This field is required</span>}
          </div>
          <br />

          <div>
            <label htmlFor="Victim_LName"> Victim_LName:</label>
            <input type="text" {...register('Victim_LName', { required: true })} />
            {errors.lname && <span>This field is required</span>}
          </div>
          <br />
          <div>
            <label htmlFor="VicEmail">VicEmail:</label>
            <input type="email" {...register('VicEmail', { required: true })} />
            {errors.email && <span>This field is required</span>}
          </div>
          <br />

          <div>
            <label htmlFor="Phone">Phone:</label>
            <input type="number" {...register('Phone', { required: true })} />
            {errors.location && <span>This field is required</span>}
          </div>
          <br />
          <div>
            <label htmlFor="NID_No">NID_No:</label>
            <input type="number" {...register('NID_No', { required: true })} />
            {errors.location && <span>This field is required</span>}
          </div>
          <br />

          <div>
            <label htmlFor="Vicpassword">Vicpassword:</label>
            <input type="password" {...register('Vicpassword', { required: true })} />
            {errors.password && <span>This field is required</span>}
          </div>
          <br />
          <div>
            <label htmlFor="Confirm_Vicpassword">Confirm_Vicpassword:</label>
            <input type="password" {...register('Confirm_Vicpassword', { required: true })} />
            {errors.password && <span>This field is required</span>}
          </div>
          <br />

          <div>
                    <label htmlFor="image">image</label>
                    <input
                        type="file"
                        id="image"
                        {...register('image', { required: true, validate: validateFile })}
                    />
                    {errors.image && 
                    <p>
                    {errors.image.type === 'required'
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

