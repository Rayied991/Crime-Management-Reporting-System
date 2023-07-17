import { Injectable, NotFoundException } from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AdminEntity, Adminprofile } from "./Admin.entity";
import { VictimEntity } from "src/Victim/victim.entity";
import { ManagerEntity } from "src/Manager/manager.entity";
import { PRegistrationEntity } from "src/Police/police.entity";
import { AdminDTO } from "./Admin.dto";
import * as bcrypt from 'bcrypt';
import { ManagerDto } from "src/Manager/manager.dto";
import { PRegistrationDTO } from "src/Police/police.dto";
import { VicDTO } from "src/Victim/victim.dto";
import { MailerService } from "@nestjs-modules/mailer";
import * as generatePassword from 'generate-password';

@Injectable()
export class AdminService{
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepo: Repository<AdminEntity>,
    private mailerService: MailerService,
    @InjectRepository(Adminprofile)
    private AdminProfileRepo: Repository<Adminprofile>,
    @InjectRepository(VictimEntity)
    private VictimRepo: Repository<VictimEntity>,
    @InjectRepository(ManagerEntity)
    private ManagerRepo: Repository<ManagerEntity>,
    @InjectRepository(PRegistrationEntity)
    private PoliceRepo: Repository<PRegistrationEntity>
) { }
async sendEmailToVictim(id: number): Promise<VictimEntity> {
  const victim = await this.VictimRepo.findOneBy({id:id});
  if (!victim) {
    throw new NotFoundException('Victim not found');
  }

  await this.mailerService.sendMail({
    to: victim.VicEmail,
    subject: 'Password Changed issue',
    text: `Your New Password is: ${victim.Vicpassword}`,
  });

  // You might want to do some additional processing or logging here

  return victim;
}
async sendEmailToPolice(username: string): Promise<PRegistrationEntity> {
  const police = await this.PoliceRepo.findOneBy({username:username});
  if (!police) {
    throw new NotFoundException('Police not found');
  }

  await this.mailerService.sendMail({
    to: police.email,
    subject: 'Password Changed issue',
    text: `Your New Password is: ${police.password}`,
  });

  // You might want to do some additional processing or logging here

  return police;
}


// async addmanager(id:number,manager:ManagerDTO): Promise<ManagerEntity> {
//   return this.ManagerRepo.findOneBy({ManagerID:id});
//   return  this.ManagerRepo.save(manager);
// }
// updateadminbyid
async updateAdminById(id: number, data: AdminDTO): Promise<AdminEntity> {
  const hashedPassword = await bcrypt.hash(data.password, 10); // Hash the new password

  await this.adminRepo.update(id, { ...data, password: hashedPassword }); // Update the admin with the hashed password

  return this.adminRepo.findOneBy({ AdminId: id });
}
// //getall admins
// async getAllAdmins(): Promise<AdminEntity[]> {
//   return this.adminRepo.find();
// }

//get admins by id
async getAdminById(id: number): Promise<AdminEntity> {
  return this.adminRepo.findOneBy({ AdminId: id });
}


// //make a change password using nodemailer and send email after changing password
// async changePassword(id:number,oldPassword:string,newPassword:string):Promise<AdminEntity>{
//   const admin=await this.adminRepo.findOneBy({AdminId:id});
//   if(!admin){
//     throw new NotFoundException('Admin not found');
//   }
//   else{
//     const isMatch=await bcrypt.compare(oldPassword,admin.password);
//     if(!isMatch){
//       throw new NotFoundException('Password not match');
//     }
//     else{
//       const salt=await bcrypt.genSalt();
//       admin.password=await bcrypt.hash(newPassword,salt);
//       return this.adminRepo.save(admin);
//     }
//     }
//     }
  


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
async addManager(data:ManagerDto):Promise<ManagerEntity>{
  //default salt generate
  const salt=await bcrypt.genSalt();
  //way-1
  // const hashedPassword=await bcrypt.hash(data.password,salt);
  // data.password=hashedPassword;
  //way-2
  data.M_Password=await bcrypt.hash(data.M_Password,salt);
 
  return this.ManagerRepo.save(data);
}
async addPolice(police: PRegistrationEntity): Promise<PRegistrationEntity> {
  return this.PoliceRepo.save(police);
}
async AddVictim(victim: VictimEntity): Promise<VictimEntity> {
  return this.VictimRepo.save(victim);
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

// getpolice profile by username
// async getPoliceProfilebyusername(user:string): Promise<PoliceEntity[]> {
//   const policeProfiles = await this.PoliceRepo.find({
//     where: { Username: user },
//     relations: ['policeProfile'],
//   });
//   if (!policeProfiles || policeProfiles.length === 0) {
//     throw new NotFoundException('Police profile not found');
//   }
//   // Dehash the password
//   policeProfiles.forEach(police => {
//     police.Password = undefined;
//   });
//   return policeProfiles;
// }
async getPoliceInfoByUsername(username: string): Promise<PRegistrationEntity> {
  const police = await this.PoliceRepo.findOneBy({ username: username });
  if (!police) {
    throw new NotFoundException('Police user not found');
  }
  return police;
}
async getVictimById(id: number): Promise<VictimEntity> {
  const victim = await this.VictimRepo.findOneBy({ id: id });
  if (!victim) {
    throw new NotFoundException('Victim user not found');
  }
  return victim;
}

//delete police account using username and also delete many to many relation table also
async deletePoliceAccount(username: string): Promise<PRegistrationEntity> {
  const police = await this.PoliceRepo.findOneBy({ username: username });
  if (!police) {
    throw new NotFoundException('Police user not found');
  }
  
  return this.PoliceRepo.remove(police);

}
async deletevictimbyid(id: number): Promise<VictimEntity> {
  const victim = await this.VictimRepo.findOneBy({ id: id });
  if (!victim) {
    throw new NotFoundException('Victim user not found');
  }
  
  return this.VictimRepo.remove(victim);

}

//update police account using username 
async updatePoliceAccount(username: string, data: PRegistrationDTO): Promise<PRegistrationEntity> {
  const police = await this.PoliceRepo.findOneBy({ username: username });
  if (!police) {
    throw new NotFoundException('Police user not found');
  }
  const updateResult = await this.PoliceRepo.update(police.username, data);
  if (updateResult.affected > 0) {
    'Police user updated successfully' ;
  } else {
    'Update operation failed' ;
  }
  return police;
}

async updatevictimbyid(id: number, data: VicDTO): Promise<VictimEntity> {
  const victim = await this.VictimRepo.findOneBy({id:id});
  if (!victim) {
    throw new NotFoundException('Victim user not found');
  }
  await this.VictimRepo.update(victim.id, data);
  return victim;
}

async signin(session,data) {

       
  if(session.AdminId){
    return 0;
  }
  const mydata = await this.adminRepo.findOneBy({ AdminId: data.AdminId });
const match =  bcrypt.compare(data.password,mydata.password);
  if(mydata && match){
    return 1;
  }
  return 0;
}





// async changeManagerPassword(managerId: number, newPassword: string): Promise<void> {
//   const manager = await this.ManagerRepo.findOneBy({ManagerID:managerId});
//   if (!manager) {
//     throw new NotFoundException('Manager not found');
//   }
// }

async changeVictimPassword(id: number, newPassword: string): Promise<VictimEntity> {
  const victim = await this.VictimRepo.findOneBy({id:id});
  if (!victim) {
    throw new NotFoundException('Victim not found');
  }

  victim.Vicpassword = newPassword;
  victim.Confirm_Vicpassword = newPassword;
  return this.VictimRepo.save(victim);
}
async changePolicePassword(username:string, newPassword: string): Promise<PRegistrationEntity> {
  const police = await this.PoliceRepo.findOneBy({username:username});
  if (!police) {
    throw new NotFoundException('Police not found');
  }

  police.password = newPassword;
  return this.PoliceRepo.save(police);
}
//change admin password using id
async changeAdminPassword(AdminId: number, newPassword: string): Promise<AdminEntity> {
  const admin = await this.adminRepo.findOneBy({AdminId:AdminId});
  if (!admin) {
    throw new NotFoundException('Admin not found');
  }

  admin.password = newPassword;
  return this.adminRepo.save(admin);
  }
  async sendEmailToVictimById(victimId: number, newPassword: string): Promise<VictimEntity> {
    try {
      const victim = await this.VictimRepo.findOneBy({ id: victimId });

      if (!victim) {
        throw new NotFoundException('Victim not found');
      }

      // Update the victim's password in the database
      await this.changeVictimPassword(victimId, newPassword);

      // Send the email with the new password
      await this.mailerService.sendMail({
        to: victim.VicEmail,
        subject: 'Change Password Issue',
        text: `Your New Password is: ${newPassword}`,
      });

      return victim;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
  async sendEmailToPoliceByUser(userName: string, newPassword: string): Promise<PRegistrationEntity> {
    try {
      const police = await this.PoliceRepo.findOneBy({ username: userName });

      if (!police) {
        throw new NotFoundException('Police not found');
      }

      // Update the victim's password in the database
      await this.changePolicePassword(userName, newPassword);

      // Send the email with the new password
      await this.mailerService.sendMail({
        to: police.email,
        subject: 'Change Password Issue',
        text: `Your New Password is: ${newPassword}`,
      });

      return police;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  


  
 
 

  
 
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
  