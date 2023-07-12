import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { emit } from "process";
import { PostComplain } from "src/PostComplain/Postcom.entity";
import { Repository } from "typeorm";
import { PostComDTO, VicDTO, VicLoginDTO } from "./victim.dto";
import { vicEntity } from "./victim.entity";
//import { AdminEntity } from "./victim.entity";

import * as bcrypt from 'bcrypt';
//import MailerService from nodemail modules
import { MailerService } from "@nestjs-modules/mailer/dist";
@Injectable()
export class VicService{
    //1. see profile
    constructor(@InjectRepository(vicEntity)
    private vicRepo: Repository<vicEntity> ,
    @InjectRepository(PostComplain)
    private postRepo: Repository<PostComplain>,
    private mailerService: MailerService
) { }
    
    getProfile(): object{
        return ({"victim":"Romona","id":2,"casefile/report":"report","email ":"romona@gmail.com"})
    }

    //2. see safety posts
    getNews():object{
        return ({"post1" : "Have CC_Tv cameras" , "post 2" : "Avoid discussing your holiday plans", "post 3": "get at least three quotes and specialist advice from alarm companies"})
    }
     //part-1
    // getAdminbyName(name:any):object{
    //         return {name:"abc",age:23};
    // }
    //DTO Error
//     getAdminbyName(mydata:object):object{
//         return mydata.name;////error occurs due to DTO; we can overcome this using DTO
// }

// getnews(id:number): any{
//         return ()
//     }
   
    // getvicbyName(mydata:VicDTO):string{
    //     return mydata.VicEmail; 
    // }
    // addAdmin(data:object){
    //     return data;
    // }
 //After applying DTOs(for string ) 
    // addAdmin(data:AdminDTO):string{
    //     return data.email;
    // }
    //after applying dtos(for all data)
    //3. Reg vic
// addVic(data:VicDTO):object{
//     return data; //admin entityr sathe match thakte hobe
    //no validation
    // addVic(data2){
    //  return this.adminRepo.save(data2);
    // }
    //validation 
   async addVic(data:VicDTO):Promise<vicEntity>{
       const salt = await bcrypt.genSalt();
       data.Vicpassword = await bcrypt.hash(data.Vicpassword,salt);
       data.Confirm_Vicpassword = await bcrypt.hash(data.Confirm_Vicpassword,salt);

        return this.vicRepo.save(data);
    }

  async  signin(data)
  {
      if(data.VicEmail != null && data.Vicpassword != null)
      {
        const logindata = await this.vicRepo.findOneBy({VicEmail : data.VicEmail});
        const match = await bcrypt.compare(data.Vicpassword,logindata.Vicpassword);
       if (match)
       {
           return true;
       }
       else{
           return false;
       }  }
       else{
           return false;
       }
}
// async addAdmin(data: AdminDTO): Promise<AdminEntity> 
//     return this.adminRepo.save(data);
//4. Post complain 
 postcom(data:PostComDTO):object{
    return this.postRepo.save(data);
}
 async getComById( id : number):Promise<vicEntity[]> {
    return this.vicRepo.find({
        where: {id:id},

            relations: {
            postcom:true
    }
    });
  }

async searchComById(id:number): Promise<PostComplain>{
 
    return this.postRepo.findOneBy({id});
}

// async getComById(id: number): Promise<vicEntity> {
      
//     return this.vicRepo.findOneBy({ id });

// }


// async addManager(manager): Promise<ManagerEntity> {
//     return this.managerRepo.save(manager);
// }


//5. update vic account info
async updateVicById(id:number,data:VicDTO): Promise<vicEntity> {

    await this.vicRepo.update(id,data);
    return this.vicRepo.findOneBy({id});
   
    
}

// 7. delete vic account
deleteCombyID(id:number):any{
 this.postRepo.delete(id)
 return "Deleted Successfully";
}
async sendEmail(data){
   return  await this.mailerService.sendMail({
           to: 'hussainrayied9@gmail.com',
           subject: 'Feedback Of the system ',
           text: 'Your system is excellent and productive...and I wanna hack your id as you are a beautiful boy.', 
         });
   
   }
}


