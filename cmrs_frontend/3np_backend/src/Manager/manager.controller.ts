//import { Body, Controller, Get, Post, Put, Query, UsePipes, ValidationPipe,  } from "@nestjs/common";
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Request, Res, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ManagerService } from "./manager.service";
import { query } from "express";
import { InvestigationTeamDTO, ManagerDto, NoticePostDTO, SafetyPostDTO } from "./manager.dto";
import { SessionGuard } from "./session.guard";
import { InvestigationTeamEntity, ManagerEntity, NoticePostEntity, SafetyPostEntity } from "./manager.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import * as bcrypt from 'bcrypt';

@Controller("manager")
export class ManagerController{
    constructor(private readonly ManagerService:ManagerService){}


@Post("/signup")
@UsePipes(new ValidationPipe())
async signup(@Body() data: ManagerDto): Promise<string> {
  // const salt = await bcrypt.genSalt();
  // data.M_Password = await bcrypt.hash(data.M_Password, salt);

  const result = await this.ManagerService.create(data);
  if (result) {
    return "Signed up";
  } else {
    return "Account already exists";
  }
}



@Get("/managerProfile/:id")
//@UseGuards(SessionGuard)
async getManagerProfile(@Param('id',ParseIntPipe) id: number) {
return this.ManagerService.getManagerProfilebyid(id);
}    


@Put('/updatemanager/:ManagerID')
//@UseGuards(SessionGuard)
@UsePipes(new ValidationPipe())
updateManagerbyID(@Param('ManagerID') ManagerID: number, @Body() data: ManagerDto): object {
    return this.ManagerService.updateManagerById(ManagerID, data);
}

@Post("/addnotice")
@UsePipes(new ValidationPipe())
async AddNoticePost(@Body() data: NoticePostDTO): Promise<string> {
  const result = await this.ManagerService.AddNoticePost(data);
  if (result) {
    return "Notice post added";
  } else {
    return "error";
  }
}





@Post('/addsafetypost')
//@UseGuards(SessionGuard)
@UsePipes(new ValidationPipe())
async AddSafetyPost(@Body() sp):Promise<SafetyPostEntity>{
 return this.ManagerService.AddSafetyPost(sp);
}

@Post('/addinvteam')
//@UseGuards(SessionGuard)
@UsePipes(new ValidationPipe())
async AddInvestigationTeam(@Body() itteam):Promise<InvestigationTeamEntity>{
 return this.ManagerService.AddInvestigationTeam(itteam);
}

// @Post("/signin")
//      async signin(@Session() session,@Body() data:ManagerDto){
//        const ismatch=await this.ManagerService.signin(session,data);
//         if( ismatch==1){
//             session.ManagerID=data.ManagerID;
//             return {message: "Logged in"};
//         }
//         else{
//           throw new UnauthorizedException ({mesage: "Something is wrong"});
//         }
//     }

  @Post("/signin")
    async signin(@Session() session,@Body() data:ManagerDto){
      const ismatch=await this.ManagerService.signin(session,data);
       if( ismatch==1){
           session.ManagerID=data.ManagerID;
           return {message: "Logged in"};
       }
       else{
         throw new UnauthorizedException ({mesage: "Something is wrong"});
       }
   }




@Get('/signout')
    logout(@Session() session)
    {
      
      if(session.ManagerID)
      {
        
        session.destroy();
        return {message:"you are logged out successfully"};
      }
      else
      {
        throw new UnauthorizedException("Can't log out");
      }
    }    
    // @Post('/contactadmin')
    // sendEmail(@Body() data){
    // return this.ManagerService.sendEmail(data);
    // }

    @Post('/contactadmin')
    sendEmail(@Body() data){
    return this.ManagerService.sendEmail(data);
    }

    @Put('/changePassword/:ManagerID')
async changePassword(@Param('ManagerID', ParseIntPipe) ManagerID: number,@Body('newPassword') newPassword: string): Promise<ManagerEntity> {
  return this.ManagerService.changePassword(ManagerID, newPassword);
}

}
      




