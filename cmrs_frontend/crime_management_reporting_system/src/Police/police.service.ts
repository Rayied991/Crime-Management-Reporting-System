
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { Add1_Wanted_List_DTO,  Change_Pass,   CrimeDetails_DTO,    CrimeStatusDTO,     GetForgertPassDTO,     PRegistrationDTO, Police_Profile_Login_DTO, SendFIRDto} from './police.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrimeStatusEntity, PRegistrationEntity, Wantedlist1Entity, Wantedlist2Entity } from './police.entity';
import { MailerService } from "@nestjs-modules/mailer/dist";
import * as bcrypt from 'bcrypt';
import { PostComplain } from './Postcom.entity';

@Injectable()
export class PoliceService {
    constructor(
        @InjectRepository( PRegistrationEntity) private registrationRepository: Repository< PRegistrationEntity>,
        
    @InjectRepository( Wantedlist1Entity ) private addwantedlist1Repository: Repository<Wantedlist1Entity >,
    @InjectRepository( Wantedlist2Entity) private addwantedlist2Repository: Repository<Wantedlist2Entity>,
    @InjectRepository( CrimeStatusEntity) private crimestatusRepo: Repository<CrimeStatusEntity>,
    @InjectRepository( PostComplain) private pcomplainRepo: Repository<PostComplain>,
    private mailerService: MailerService
        //  Add More Here
        ){}
    

        profileInfo:PRegistrationDTO
        wantedListInfo1:Add1_Wanted_List_DTO
        wantedListInfo2:CrimeDetails_DTO
        async AddRegistration(registration: PRegistrationDTO) : Promise<PRegistrationEntity> {
           
            //registration.profile_image = "temp.png";
            const salt = await bcrypt.genSalt();
            registration.password = await bcrypt.hash(registration.password, salt);
            return this.registrationRepository.save(registration);
        }
   
     


   async  ViewProfilePolice(username:string):  Promise<PRegistrationEntity>{
        return this.registrationRepository.findOneBy({
           username });


           
    }
    async SearchPostComplain(id:number): Promise<PostComplain>{
        return this.pcomplainRepo.findOneBy({
            id });
    
    }
     
    async UpdatePoliceM(username:string,update_police:PRegistrationDTO): Promise<PRegistrationEntity>
    {
       //update_police.profile_image = "temp.png";
        const salt = await bcrypt.genSalt();
          update_police.password = await bcrypt.hash(update_police.password, salt);
        await this.registrationRepository.update({username:username}, update_police); // Where to Update , Updated Data
        return this.registrationRepository.findOneBy({username: username});
    }



    DeletePoliceProfileM(username: string): any{
        this.registrationRepository.delete({username:username});
        return {"Success":"Delete Your Profile Successfully"};
       
    }

    
 
async AddWantedList1(wanted_list_add1: Add1_Wanted_List_DTO):  Promise<Wantedlist2Entity >
{
    return this.addwantedlist2Repository.save(wanted_list_add1);
}
async AddCrimeDetails(wanted_list_add2:CrimeDetails_DTO):  Promise<Wantedlist1Entity>
{
    return this.addwantedlist1Repository.save(wanted_list_add2);
}
/*
async SearchWantedList(username): Promise<PRegistrationEntity[]> {
    return this.registrationRepository.find({
        where: { username: username },
        relations: {
            wantedlist2: true

        }
        });

        
}*/
async SearchWantedList(username:number): Promise<Wantedlist2Entity> {
    return this.addwantedlist2Repository.findOne({
       where:{wanted_criminal_no:username},
        

        
      });
    }

/*
  async SearchCrimeDetails(c_id:number): Promise<Wantedlist1Entity[]> {
    const res = await this.addwantedlist1Repository.find({
        where: { wantedlist2: { wanted_criminal_no:c_id}} ,
        relations: 
            //wantedlist2: true
            ['wantedlist2']
        
        });

        
        console.log(res);
        
        if(res!==undefined){
            return res;

        }
        else{
            return null;
        }
        
        /*
        if(res.length>0){
            return res;
        }
        else{
            throw new NotFoundException("Request not found, This Criminal details is not found");
        }
    }
        */
     
  async SearchCrimeDetails(c_id:number): Promise<Wantedlist1Entity> {
    return this.addwantedlist1Repository.findOne({
        where: { wantedlist2: { wanted_criminal_no:c_id}} ,
       
        
        });


        
       /* console.log(res);
        
        if(res!==undefined){
            return res;

        }
        else{
            return null;
        }
        
        /*
        if(res.length>0){
            return res;
        }
        else{
            throw new NotFoundException("Request not found, This Criminal details is not found");
        }*/
    }
   

num:Wantedlist1Entity 
/*
async UpdateCrimeDetails(criminal_no:number,upwlist: CrimeDetails_DTO): Promise<Wantedlist1Entity>

    {
       
        await this.addwantedlist1Repository.update({ wantedlist2: { wanted_criminal_no:criminal_no } }, upwlist); // Where to Update , Updated Data
        return this.addwantedlist1Repository.findOneBy({ wantedlist2: { wanted_criminal_no: criminal_no} });
    }

*/
async UpdateCrimeDetails(criminal_no:number,upwlist: CrimeDetails_DTO): Promise<Wantedlist1Entity>

    {
       
        await this.addwantedlist1Repository.update({ wantedlist2: { wanted_criminal_no:criminal_no } }, upwlist); // Where to Update , Updated Data
        return this.addwantedlist1Repository.findOneBy({ wantedlist2: { wanted_criminal_no: criminal_no} });
    }
    async UpdateWantedList1(criminal_no:number,upwlist: Add1_Wanted_List_DTO): Promise<Wantedlist2Entity>
    {
        
         
        await this.addwantedlist2Repository.update(criminal_no, upwlist); // Where to Update , Updated Data
        return this.addwantedlist2Repository.findOneBy({wanted_criminal_no: criminal_no});
    }


    DeleteWantedlist1(c_no: number): any{
        this.addwantedlist2Repository.delete({wanted_criminal_no:c_no});
        
        return {"Success":"Wantedlist Deleted Successfully"};
    }

    

    
    

/* DeleteWantedlist2(username: string): any{
        this.addwantedlist2Repository.delete(username);
        return {"Success":"Book Deleted Successfully"};
       
    }
    */

    DeleteCrimeDetails(c_no: number): any {
        // ! Use Session Here
        this.addwantedlist1Repository.delete({ wantedlist2: { wanted_criminal_no: c_no } });
        return {"Success":"CrimeDetails Deleted Successfully"};
    }








async AddCrimeStatus(username:string,crimestatus:CrimeStatusDTO):  Promise<CrimeStatusEntity>
{
    return this.crimestatusRepo.save(crimestatus);
}


/*
async SearchCrimeStatus(username): Promise<PRegistrationEntity[]> {
    return this.registrationRepository.find({
        where: { username: username },
        relations: {
            CrimeStatus: true

        }
        });
      
}

*/
async SearchCrimeStatus(username:number): Promise<CrimeStatusEntity> {
    return this.crimestatusRepo.findOne({
        where: { PostId: username },
       
       

    

        
        });
      
}


    async UpdateCrimeStatus( postno:number,update_CrimeStatus: CrimeStatusDTO):  Promise<CrimeStatusEntity>
    {
        
         
        await this.crimestatusRepo.update( postno,update_CrimeStatus); // Where to Update , Updated Data
        return this.crimestatusRepo.findOneBy({PostId:  postno});
    }

    

   



    async PLogIn(data) {
        if (data.username != null && data.password != null) {
        const userdata= await this.registrationRepository.findOneBy({username:data.username});
    const match= await bcrypt.compare(data.password, userdata.password);
    //return match;
    if (match) {
        //return "WElCOME YOUR ACCOUNT";
        return true;
    }
    else {
       // return "Username and Password is not match";
       return false;
    }
} else {
   // return "Please enter usearname and password ";
   return false;
}
    
    }
    
/*
    async PLogIn(session,data) {

       
        if(session.username){
          return 0;
        }
        const mydata = await this.registrationRepository.findOneBy({ username:data.username});
        if (!mydata) {
          return 0;
        }
        if(data.password== mydata.password) 
        {
          return 1;
        }
        return "Please enter usearname and password ";
      }
      */





    LogoutPoliceProfile(username:string):any
    {
        if(this.profileInfo.username==username){
            
            return "logout profile";
      
        }else{
            return "can't logout";
        }

    }


      
      


      async SendPoliceFIR(sendFIRDto: SendFIRDto) {
        const emailText = `
                                               FIR



VictimID: ${sendFIRDto.VictimID}
PostID: ${sendFIRDto.PostID}
FIR Report: ${sendFIRDto.FIRReport}

          This case is investigated by: ${sendFIRDto.InvestigatedBy}
        `;
    
        return await this.mailerService.sendMail({
          to: sendFIRDto.To,
          subject: sendFIRDto.Subject,
          text: emailText,
        });
    
       
      }
    
          
      async SendPolicePassRequest(sendReqto: GetForgertPassDTO) {
        const emailText = `
                                              


PoliceUsername: ${sendReqto.PoliceUsername}
Request: ${sendReqto.Text}

        


                          `;
    
        return await this.mailerService.sendMail({
          to: sendReqto.To,
          subject: sendReqto.Subject,
          text: emailText,
        });
    
       
      }
    
      

    UploadPoliceImage(image:string): any {
        if(this. profileInfo!= null && image != null){
            this.profileInfo.profile_image = image;
            return this.profileInfo;
        }else{
            return "File isn't uploaded";
        }
    }
/*
    getPoliceImage(name: string, res: any): any {
        //if(this.profileInfo != null && name != null){
            res.sendFile(name,{ root: './assets/profile_images' })
        //}
    }
        
    PoliceChangePass(pass_info:Change_Pass): any {
       
        if(pass_info.new_password!=pass_info.confirm_password){
          
            
        return "Passward isn't updated, please enter new password and confirm password acuurately";
        }
       
    else{
        if(!pass_info.new_password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)){
        
        return  "Password must be more than 8 letters and upper case and lower case Format with at least one numerical character";
        }
        else{
            this.profileInfo.password=pass_info.new_password;
            return "Your account new password is "+ this.profileInfo.password;
        }
    }


}
*/
    
}