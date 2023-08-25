import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../Layout/navbar';
import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('../Layout/layout'), {
    ssr: false,
  })
  const Title = dynamic(() => import('../Layout/title'), {
    ssr: false,
  })

export default function AllManager() {
    const [jsonData, setJsonData] = useState(null);
    
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
             const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/getVictim/",
             {
                withCredentials: true
              }
             );
            const jsonData = response.data;
            console.log(jsonData)
            setJsonData(jsonData);
        } catch (error) {
            console.error(error);
        }
    }

    const printArray = (jsonData) => {
        return (
            jsonData.map((item, index) => {
                return (

                    <div key={index}>
                         <h2>id: {item.id}</h2>
                        <h2>Victim_FName: {item.Victim_FName}</h2>
                        <h2>Victim_LName: {item.Victim_LName}</h2>
                        <h2>VicEmail: {item.VicEmail}</h2>
                        <h2>Vicpassword: {item.Vicpassword}</h2>
                        <h2>Confirm_Vicpassword: {item.Confirm_Vicpassword}</h2>
                        <h2>Confirm_Vicpassword: {item.Confirm_Vicpassword}</h2>
                        {/* Admin Info: 
                        <h4>{item.admin.id}</h4>
                        <h4>{item.admin.name}</h4> */}

                        <hr />
                    </div>
                );

            })
        );
    }


    const printObject = (jsonData) => {
        return (
            <div>
                print Object
               
                <h2>name: {jsonData.Victim_FName}</h2>
                <h2>email: {jsonData.VicEmail}</h2>

            </div>
        );
    }


    
    return (

        <>
 <Title page="ALL Manager"/> 
  <Layout>
    <NavBar/>
            {jsonData != null &&
                <div>
                    {Array.isArray(jsonData) ? printArray(jsonData) : printObject(jsonData)}
                </div>

            }
</Layout>
        </>
    );
}

