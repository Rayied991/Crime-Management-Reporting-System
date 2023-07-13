import { Injectable, NotFoundException } from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AdminEntity, Adminprofile } from "./Admin.entity";
import { VictimEntity } from "src/Victim/victim.entity";
import { ManagerEntity } from "src/Manager/manager.entity";
import { PoliceEntity } from "src/Police/police.entity";
import { AdminDTO } from "./Admin.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService{
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepo: Repository<AdminEntity>,
    @InjectRepository(Adminprofile)
    private AdminProfileRepo: Repository<Adminprofile>,
    @InjectRepository(VictimEntity)
    private VictimRepo: Repository<VictimEntity>,
    @InjectRepository(ManagerEntity)
    private ManagerRepo: Repository<ManagerEntity>,
    @InjectRepository(PoliceEntity)
    private PoliceRepo: Repository<PoliceEntity>
) { }

async create(data:AdminDTO):Promise<AdminEntity>{
  //default salt generate
  const salt=await bcrypt.genSalt();
  //way-1
  // const hashedPassword=await bcrypt.hash(data.password,salt);
  // data.password=hashedPassword;
  //way-2
  data.password=await bcrypt.hash(data.password,salt);
 
  return this.adminRepo.save(data);
}
async getAdminProfilebyid(id): Promise<AdminEntity[]> {
  const adminProfiles = await this.adminRepo.find({
    where: { AdminId: id },
    relations: ['adminProfile'],
  });

  if (!adminProfiles || adminProfiles.length === 0) {
    throw new NotFoundException('Admin profile not found');
  }
  // Dehash the password
  adminProfiles.forEach(admin => {
    admin.password = undefined;
  });

  return adminProfiles;
}
async signin(session,data) {

       
  if(session.AdminId){
    return 0;
  }
  const mydata = await this.adminRepo.findOneBy({ AdminId: data.AdminId });
  if (!mydata) {
    return 0;
  }
  if(data.password== mydata.password) 
  {
    return 1;
  }
  return 0;
}


// async create(mydto:AdminDTO) {
//   const adminaccount = new AdminEntity()

//   const mydata = await this.adminRepo.findOneBy({ email: mydto.email });
  
//   if(mydata) 
//   {
//     return 0;
//   }

//   adminaccount.name = mydto.name;
//   adminaccount.email = mydto.email;
//   adminaccount.phone = mydto.phone;
//   adminaccount.password = mydto.password;
  

  
  
//    return this.adminRepo.save(adminaccount);
//     }
  }
// // async updateVictimById(id: number, data: VicDTO): Promise<VictimEntity> {
// //   await this.adminRepo.update(id, data);
// //   return this.adminRepo.findOneBy({ id });
// // }

// async getVictimById(id: number): Promise<VictimEntity> {
//   return this.VictimRepo.findOneBy({ id });
// }
// async getAdminbyid(id:number):Promise<AdminEntity[]>{
//   return this.adminRepo.find({
//     where:{id:id},
//     relations:{victims:true}
//   });
// }
// async addVictim(id:number,victim:VicDTO): Promise<VictimEntity> {
//   // return this.VictimRepo.findOneBy({id});
//   return this.VictimRepo.save(victim);
// }

// async updateVictimById(id: number, data: VicDTO): Promise<VictimEntity> {
//   await this.VictimRepo.update(id, data);
//   return this.VictimRepo.findOneBy({ id:id });
//   }
  
//    DeleteVictimBYID(id:number): any{
//     return this.VictimRepo.delete(id);
//     return{
//       message:"Deleted Succesfully"
//     }
//   }



//   //  async addadminbyid(id:number, data:AdminDTO):Promise<AdminEntity[]>{
//   //   return this.adminRepo.save(id,data);
//   //  }

//     getAdminProfile(mydata:AdminDTO): object{
//         return mydata;
//     }
//     getPoliceProfile(mydata:RegistrationDTO):object{
//         return {fname:"Md", lname:"Rakib",username:"Rakib123",location:"Dhaka",phoneNum:"0181232434343"};
       
//     }
//     getVictimProfile(mydata:AdminDTO): object{
//         return mydata;
//     }
//     updatePolicebyemail(email: string, data: RegistrationDTO): object {
//         return {
//           message: 'Police profile updated successfully',
//           email,
//           data,
//         };
//       }

     
//     updateadmin(data:AdminDTO):object{
//     return {
//             message: 'Admin profile updated successfully',
//             data,
//           };
//     }
// 6
//     getVictimProfilebyName(mydata:VicDTO): object{
//         return {Victim_FName:"Md", Victim_LName:"Rakib",VicEmail:"Rakib123@gmail.com",VicID:"13",NID_No:"1232434343"};
//     }
//     updateVictimbyid(VicID: number, data: VicDTO): object {
//         return {
//           message: 'Victim  profile updated successfully',
//           VicID,
//           data
//         };
//       }

//       deleteVictimbyid(VicID: number, data: VicDTO): object {
//         return {
//           message: 'Victim  profile deleted successfully',
//           VicID,
//           data
//         };
//       }

//     login(logindata: loginDTO): object {
        
//         const { username, password } = logindata;
      
//         if (username === 'Admin' && password === 'Abc123@#') {
           
      
//             return { message: "Login Successful" };
//           } else {
//             return { message: "Invalid logindata" };
//           }
//         }
//     }
    



//     // deletePoliceByEmail(data:RegistrationDTO): object {
       
//     //     // Perform deletion operation here
//     //     return {
//     //       message: 'Police Data Deleted successfully',
//     //     };
      
//     // }
  