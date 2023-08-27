/*
https://docs.nestjs.com/controllers#controllers
*/
import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Request, Res,Session,  UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';

import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";

import { Add1_Wanted_List_DTO,  AddFIRDTO, Change_Pass, CrimeDetails_DTO,  CrimeStatusDTO,   PRegistrationDTO } from './police.dto';
import { PoliceService } from './police.service';
import { BadRequestException, ForbiddenException, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common/exceptions';
import session = require("express-session");
import { SessionGuard } from "./session.gaurd";
import { Wantedlist1Entity, Wantedlist2Entity,PRegistrationEntity } from './police.entity';

@Controller('police')
export class PoliceController
{
   
    
    
    constructor(private readonly policeService: PoliceService){
        // Empty Constructor
    }


    /* 
    
    @Post('/registration')
    @UsePipes(new ValidationPipe())
    
    AddRegistration (@Body () registration:PRegistrationDTO ): any {
        //registration.profile_image = myfileobj.filename;
        
        return this.policeService.AddRegistration(registration);
    }
    
*/
@Get('/index')
   /* @UseGuards(SessionGuard)*/
   
    getIndex(): any {
        return "Police Relax!  is Alive."
    }

 

@Post('/registration')

    @UsePipes(new ValidationPipe())

    @UseInterceptors(FileInterceptor('mypicfile',

    {

        fileFilter: (req, file, cb) => {

            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))

                cb(null, true);

            else {

                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);

            }

        },

        limits: { fileSize: 39000000 }, // 39 MB

        storage:diskStorage({

            destination: './assets/profile_images',

            filename: function (req, file, cb) {

                cb(null,Date.now()+file.originalname)

            },

        })

    }

))

    AddRegistration (@Body () registration:PRegistrationDTO , @UploadedFile() myfileobj: Express.Multer.File): any {

        registration.profile_image = myfileobj.filename;

       
        return this.policeService.AddRegistration(registration);
        
        
    }
    
    @Get('/policeviewprofile/:username')
  // @UseGuards(SessionGuard)
    ViewProfilePolice(/*@Session() session*/@Param('username') username: string):  any {
     return  this.policeService.ViewProfilePolice(/*session.username*/username);
      
    }
    
    
/*
    @Put('/updatepoliceproinfo/:username')
    @UseGuards(SessionGuard)
//@UsePipes(new ValidationPipe())
UpdatePoliceM(@Param('username') username:string, @Body() update_police:PRegistrationDTO,  @Session() session ): any{
    
    console.log(update_police)
    return this.policeService.UpdatePoliceM(username,update_police);
}
*/



@Put('/updatepoliceproinfo/:username')
//@UseGuards(SessionGuard)
//@UsePipes(new ValidationPipe())
@UseInterceptors(FileInterceptor('mypicfile',

{

    fileFilter: (req, file, cb) => {

        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))

            cb(null, true);

        else {

            cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);

        }

    },


    limits: { fileSize: 39000000 }, // 39 MB

    storage:diskStorage({

        destination: './assets/profile_images',

        filename: function (req, file, cb) {

            cb(null,Date.now()+file.originalname)

        },

    })

    
}

))

UpdatePoliceM(/*@Session() session,*/@Param('username') username: string,@Body() update_police: PRegistrationDTO , @UploadedFile()myfileobj: Express.Multer.File ): any{
    update_police.profile_image = myfileobj.filename;
  return this.policeService.UpdatePoliceM(/*session.username,*/username, update_police);
  

}










@Post('/addwantedlist1')
/*@UseGuards(SessionGuard)*/
//@UsePipes(new ValidationPipe())
AddWantedList1(/*@Session() session,*/@Body() wanted_list_add1:Add1_Wanted_List_DTO ):any{
    console.log(wanted_list_add1);
return this.policeService.AddWantedList1(wanted_list_add1);
}






@Post('/crimedetails')
//@UseGuards(SessionGuard)
AddCrimeDetails(/*@Session() session,*/@Body() wanted_list_add2:CrimeDetails_DTO ):any{
    console.log(wanted_list_add2);
return this.policeService.AddCrimeDetails(wanted_list_add2);
}
/*
@Get('/wantedlist/:username')
SearchWantedList(@Param('username') username:string): any{
    return this.policeService.SearchWantedList(username);
}

*/

@Get('/wantedlist/:username')
/*@UseGuards(SessionGuard)*/
SearchWantedList(/*@Session() session*/@Param('username') username: number):  any{
    return this.policeService.SearchWantedList(/*session.username*/username);
}

/*
@Get('/scrimedetails/:c_id')

 // @UseGuards(SessionGuard)
  async searchCrimeDetails(@Param('c_id', ParseIntPipe) username: number): Promise<Wantedlist1Entity[]> {
    
      const det= await this.policeService.SearchCrimeDetails(username);

    /* 
     if (det!== null) {
        console.log(det)
        return det;

    }*/
   /*
    if(det.length>0){
        return det;
    }
    else {
        throw new NotFoundException({
            status: HttpStatus.NOT_FOUND,
            message: " This id's criminal details is not found, it's not exist"
        });
    }
    

    
    
} */


@Get('/scrimedetails/:c_id')

 // @UseGuards(SessionGuard)
   searchCrimeDetails(@Param('c_id', ParseIntPipe) username: number): any {
    return this.policeService.SearchCrimeDetails(username);

    /* 
     if (det!== null) {
        console.log(det)
        return det;

    }*/
    /*
   
    if(det.length>0){
        return det;
    }
    else {
        throw new NotFoundException({
            status: HttpStatus.NOT_FOUND,
            message: " This id's criminal details is not found, it's not exist"
        });
    }
    

    */
    
} 


/*
@Get('/scrimedetails/:username')

  //@UseGuards(SessionGuard)
  async searchCrimeDetails(@Param('username', ParseIntPipe) username: number): Promise<Wantedlist1Entity[]> {
    
      const det= await this.policeService.SearchCrimeDetails(username);

    if (det!== null) {
        console.log(det);
        return det;
    }
    else {
        throw new NotFoundException({
            status: HttpStatus.NOT_FOUND,
            message: " This Criminal details is not found"
        });
    }
    
}
  */



@Get('/spostcom/:id')
@UseGuards(SessionGuard)
SearchPostComplain(@Param('id',ParseIntPipe) id:number): any{
    return this.policeService.SearchPostComplain(id);
   

}
@Put('/updatewantedlist1/:c_no')
//@UseGuards(SessionGuard)
//@UsePipes(new ValidationPipe())
UpdateWantedList1(@Param('c_no',ParseIntPipe) criminal_no:number, @Body() update_wanted_list1:Add1_Wanted_List_DTO):any{
   
    console.log(update_wanted_list1);
   return this.policeService.UpdateWantedList1(criminal_no,update_wanted_list1);
    
    
   
    
}

@Put('/updatecrimedetails/:criminal_no')
//@UseGuards(SessionGuard)
UpdateCrimeDetails(@Param('criminal_no',ParseIntPipe) criminal_no:number, @Body() update_wanted_list2:CrimeDetails_DTO): any{
    
    console.log(update_wanted_list2)
    return this.policeService. UpdateCrimeDetails(criminal_no,update_wanted_list2);
   
    }



@Delete('delete_crimedetails/:c_no')

//@UseGuards(SessionGuard)
DeleteCrimeDetails(@Param('c_no') c_no:number,/*@Session() session*/): object{
   
    return this.policeService. DeleteCrimeDetails(c_no);
}




@Delete('/delete_wantedlist1/:c_no')
/*@UseGuards(SessionGuard)*/
DeleteWantedlist1(@Param('c_no') c_no:number ): object{
        return this.policeService.DeleteWantedlist1(c_no);
    }















    @Delete('/delete/:username')
    //@UseGuards(SessionGuard)
    //@UsePipes(new ValidationPipe())
    DeletePoliceProfileM(@Session() session,@Param('username') username: string): Promise<PRegistrationDTO>{
        session.destroy();
        return this.policeService.DeletePoliceProfileM(/*session.username*/username);
    }

@Post('/crimestatus/')
//@UseGuards(SessionGuard)
AddCrimeStatus(@Session() session,@Body() crimestatus:CrimeStatusDTO):any{
    console.log(crimestatus);
return this.policeService.AddCrimeStatus(session.username,crimestatus);
}











@Get('/scrimestatus/:username')
//@UseGuards(SessionGuard)
SearchCrimeStatus(/*@Session() session*/@Param('username') username: number): any{
    return this.policeService.SearchCrimeStatus(/*session.username*/username );
}





@Put('/updatecrimestatus/:postno')
/*@UseGuards(SessionGuard) */
UpdateCrimeStatus(@Param('postno',ParseIntPipe) postno:number, @Body() update_CrimeStatus:CrimeStatusDTO): any{
    
    console.log(update_CrimeStatus)
    return this.policeService.UpdateCrimeStatus(postno,update_CrimeStatus);
}














/*

@Post('/pchangepass')
//@UsePipes(new ValidationPipe())
PoliceChangePass(@Body() pass_info:Change_Pass ):object{
    console.log(pass_info);
return this.policeService.PoliceChangePass(pass_info);
}

*/

@Post('/plogin')
 //@UsePipes(new ValidationPipe())
 async PLogIn(@Body() data:PRegistrationDTO, @Session() session)
{
   const res = await this.policeService.PLogIn(data)
   if(res == true)
    {
        session.username = data.username;
          return {
              username: session.username,
              message:"Logged in"
          };
        }
    else{
        throw new UnauthorizedException({message: "Wrong password or username"});
    }
}






@Get('/plogout')
PLogOut(@Session() session)
{
  if (session.username) {
    
    session.destroy();
    return { message: "You are logged out successfully" };
  } else {
    throw new UnauthorizedException("Can't log out");
  }
}
  




/*

  
@Post(('/profile/update_profile_info/upload_profile_image'))
@UseInterceptors(FileInterceptor('mypicfile',
    { 
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 39000000 }, // 39 MB
        storage:diskStorage({
            destination: './assets/profile_images',
            filename: function (req, file, cb) {
                cb(null,Date.now()+file.originalname)
            },
        })
    }

))
UploadPoliceImage(@UploadedFile() file: Express.Multer.File):object
{
    console.log(file) // We can find the file name here
    return this.policeService. UploadPoliceImage(file.filename);
}

@Get('/profile/profile_image/:name')
getPoliceImage(@Param('name') name, @Res() res) : any {
    return this.policeService.getPoliceImage(name,res);
}
*/


@Post('/sendpoliceemail')
@UseGuards(SessionGuard)
SendPoliceFIR(@Body() mydata){
return this.policeService.SendPoliceFIR(mydata);
}


@Post('/sendpassmail')

SendPolicePassRequest(@Body() mydata){
return this.policeService. SendPolicePassRequest(mydata);
}
}