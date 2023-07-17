import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { emit } from "process";
import { PostComplain } from "src/PostComplain/Postcom.entity";
import { Repository } from "typeorm";
import { PostComDTO, UpdateCom, UpEvidenceDTO, VicDTO, VicLoginDTO, VicUpdateDTO } from "./victim.dto";
import { vicEntity } from "./victim.entity";
//import { AdminEntity } from "./victim.entity";
import { UpEvidence } from "src/UploadEvidence/UploadEvi";
import * as bcrypt from 'bcrypt';
//import MailerService from nodemail modules
import { MailerService } from "@nestjs-modules/mailer/dist";
import { PassThrough } from "stream";
import { CrimeStatusEntity } from "src/CrimeStatus/CrimeStatus";
@Injectable()
export class VicService{
   
    //1. see profile
    constructor(@InjectRepository(vicEntity)
    private vicRepo: Repository<vicEntity> ,
    @InjectRepository(PostComplain)
    private postRepo: Repository<PostComplain>,
    @InjectRepository(UpEvidence)
    private EviRepo: Repository<UpEvidence>,
    @InjectRepository(CrimeStatusEntity)
    private CrimeRepo: Repository<CrimeStatusEntity>,
    

    private mailerService: MailerService

) { }
    
    // getProfile(): object{
    //     return ({"victim":"Romona","id":2,"casefile/report":"report","email ":"romona@gmail.com"})
    // }

    // //2. see safety posts
    // getNews():object{
    //     return ({"post1" : "Have CC_Tv cameras" , "post 2" : "Avoid discussing your holiday plans", "post 3": "get at least three quotes and specialist advice from alarm companies"})
    // }
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
    // Evidence_Up(data:VicDTO):object{
    // return data; //admin entityr sathe match thakte hobe
    //no validation
    // async Evidence_Up(data){
    //    if(data.VicEmail )
    //    {
    //        const emailmatch = await this.EviRepo.findOneBy({VicEmail: data.VicEmail});
    //        const match = await bcrypt.compare(data.VicEmail,emailmatch.VicEmail);
    //        if(match)
    //        {
    //        return  this.EviRepo.save(data);
    //        }
    //        else
    //        {
    //        return {message:"Cannot Upload Evidence "}
    //        }
    //    }
    //  else{
    //      return {message : "Cannot Upload Evidence"}
    //  }
    // }
   async Evidence_Up(data:UpEvidenceDTO):Promise<UpEvidence>{
       return await this.EviRepo.save(data);

 }
    
//  async updateReg(VicEmail:string,data: VicUpdateDTO): Promise<vicEntity> {
//     await this.vicRepo.update({VicEmail:VicEmail}, data);
//     return this.vicRepo.findOneBy({ id: data.id});
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
async SearchCrimeStatus(PostId:number):Promise<CrimeStatusEntity>{
    const CrimeSta= await this.CrimeRepo.findOneBy({PostId:PostId});
    if(!CrimeSta)
    {
        throw new NotFoundException("Status not Found");
    }
    return CrimeSta;
}

// async getComById(id: number): Promise<vicEntity> {
      
//     return this.vicRepo.findOneBy({ id });

// }


// async addManager(manager): Promise<ManagerEntity> {
//     return this.managerRepo.save(manager);
// }
// updateUserbyid(mydto:AdminFormUpdate,id):any {
//     return this.adminRepo.update(id,mydto);
//        }

//5. update vic account info
 updateVicById(mydata:VicUpdateDTO,id): any {

    return this.vicRepo.update(id,mydata);
    //return this.vicRepo.findOneBy({id});
}
updateComByID(data: UpdateCom,id):any{
    return this.postRepo.update(id,data);
    
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
async changePass(data){
   return  await this.mailerService.sendMail({
           to: 'hussainrayied9@gmail.com',
           subject: 'change Password permission',
           text: 'I have forgottan my password. Give me a OTP to change my password.  Thank yo', 
         });
   
   }
}


