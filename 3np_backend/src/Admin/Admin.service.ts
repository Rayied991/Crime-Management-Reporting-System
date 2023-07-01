import { Injectable } from "@nestjs/common";
import { AdminDTO, loginDTO } from "./Admin.dto";
import { RegistrationDTO } from "src/Police/police.dto";
import { VicDTO } from "src/Victim/victim.dto";


@Injectable()
export class AdminService{
    getAdminProfile(mydata:AdminDTO): object{
        return mydata;
    }
    getPoliceProfile(mydata:RegistrationDTO):object{
        return {fname:"Md", lname:"Rakib",username:"Rakib123",location:"Dhaka",phoneNum:"0181232434343"};
       
    }
    getVictimProfile(mydata:AdminDTO): object{
        return mydata;
    }
    updatePolicebyemail(email: string, data: RegistrationDTO): object {
        return {
          message: 'Police profile updated successfully',
          email,
          data,
        };
      }

     
    updateadmin(data:AdminDTO):object{
    return {
            message: 'Admin profile updated successfully',
            data,
          };
    }
6
    getVictimProfilebyName(mydata:VicDTO): object{
        return {Victim_FName:"Md", Victim_LName:"Rakib",VicEmail:"Rakib123@gmail.com",VicID:"13",NID_No:"1232434343"};
    }
    updateVictimbyid(VicID: number, data: VicDTO): object {
        return {
          message: 'Victim  profile updated successfully',
          VicID,
          data
        };
      }

      deleteVictimbyid(VicID: number, data: VicDTO): object {
        return {
          message: 'Victim  profile deleted successfully',
          VicID,
          data
        };
      }

    login(logindata: loginDTO): object {
        
        const { username, password } = logindata;
      
        if (username === 'Admin' && password === 'Abc123@#') {
           
      
            return { message: "Login Successful" };
          } else {
            return { message: "Invalid logindata" };
          }
        }
    }
    



    // deletePoliceByEmail(data:RegistrationDTO): object {
       
    //     // Perform deletion operation here
    //     return {
    //       message: 'Police Data Deleted successfully',
    //     };
      
    // }
  
 
 
  