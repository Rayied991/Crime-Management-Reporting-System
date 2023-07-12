import { Injectable } from "@nestjs/common";
// import { AdminDTO, loginDTO } from "./Admin.dto";
// import { RegistrationDTO } from "src/Police/police.dto";
// import { VicDTO } from "src/Victim/victim.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AdminEntity, Adminprofile } from "./Admin.entity";
import { VictimEntity } from "src/Victim/victim.entity";
import { ManagerEntity } from "src/Manager/manager.entity";
import { PoliceEntity } from "src/Police/police.entity";
// import { VictimEntity } from "src/Victim/victim.entity";

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

// async addAdminid(data: AdminDTO): Promise<AdminEntity> {
//   return this.adminRepo.save(data);
// }

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
  