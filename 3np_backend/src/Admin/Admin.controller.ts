import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Query, Res, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./Admin.service";
import { AdminDTO } from "./Admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { AdminEntity } from "./Admin.entity";
import * as bcrypt from 'bcrypt';
import { SessionGuard } from "./session.guard";
import { ManagerDto } from "src/Manager/manager.dto";
import { ManagerEntity } from "src/Manager/manager.entity";
import { PRegistrationEntity } from "src/Police/police.entity";
import { VictimEntity } from "src/Victim/victim.entity";
import { PRegistrationDTO } from "src/Police/police.dto";
import { VicDTO } from "src/Victim/victim.dto";
import session from "express-session";
import { PoliceService } from "src/Police/police.service";

@Controller("admin")
export class AdminController{
    constructor(private readonly adminservice:AdminService){}
    
    @Get('/index')
    //@UseGuards(SessionGuard)
    //@UsePipes(new ValidationPipe())
    getIndex(): any {
        return "Admin is Good";
    }
//1. pass:Abc123
//2.pass:Abcd12345
@Post("/addadmin")
@UsePipes(new ValidationPipe())
async addadmin(@Body() data: AdminDTO): Promise<string> {
  // const salt = await bcrypt.genSalt();
  // data.password = await bcrypt.hash(data.password, salt);

  const result = await this.adminservice.create(data);
  if (result) {
    return "Signed up";
  } else {
    return "Account already exists";
  }
}
@Post('/sendemailtovictim/:id')
  async sendEmailToVictim(@Param('id') id: number): Promise<VictimEntity> {
    return this.adminservice.sendEmailToVictim(id);
  }
  @Post('/sendemailtopolice/:username')
  async sendemailtopolice(@Param('username') username: string): Promise<PRegistrationEntity> {
    return this.adminservice.sendEmailToPolice(username);
  }
@Post("/addmanager")
@UsePipes(new ValidationPipe())
async addmanager(@Body() data: ManagerDto): Promise<string> {
  const salt = await bcrypt.genSalt();
  data.M_Password = await bcrypt.hash(data.M_Password, salt);

  const result = await this.adminservice.addManager(data);
  if (result) {
    return "Signed up";
  } else {
    return "Account already exists";
  }
}
// @Post('/addpolice')
// // @UseGuards(SessionGuard)
//   // @UsePipes(new ValidationPipe())
//   async addPolice(@Session() session, @Body() police: PRegistrationEntity): Promise<PRegistrationEntity> {
//     const admin = await this.adminservice.getAdminById(session.adminId); // Assuming you have the AdminId stored in the session as "adminId"
//     police.admins = [admin];

//     return  this.adminservice.addPolice(police);
   
//   }

@Post('/addpolice/:adminid')
// @UsePipes(new ValidationPipe())

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
  // @UseGuards(SessionGuard)
  async addpolice(@Param("adminid") adminid:number,@UploadedFile() myfileobj: Express.Multer.File, @Body() police: PRegistrationEntity): Promise<{ message: string }> {
    // const adminId = session.adminId; // Assuming you have the AdminId stored in the session as "adminId"
    
    // console.log('Retrieved Admin ID from session:', adminId);
    // console.log('Session data:', session.id);

    police.profile_image = myfileobj.filename;
    const addedpolice = await this.adminservice.addPoliceWithAdmin( adminid,police);
    
    if (addedpolice) {
      return { message: 'Police added successfully.' };
    } else {
      return { message: 'Failed to add Police.' };
    }
  }
  // @Post('/addVictim')
  // // @UseGuards(SessionGuard)
  //   // @UsePipes(new ValidationPipe())
  //   async addVictim(@Session() session, @Body() victim: VictimEntity): Promise<VictimEntity> {
  //     const admin = await this.adminservice.getAdminById(session.adminId); // Assuming you have the AdminId stored in the session as "adminId"
  //     victim.admins = [admin];
  
  //     return this.adminservice.AddVictim(victim);
    // }
  @Post('/addVictim/:adminid')
  @UseInterceptors(FileInterceptor('image',
  {
      fileFilter: (req, file, cb) => {
          if (file.originalname.match(/^.*.(jpg|webp|png|jpeg)$/))
              cb(null, true);
          else {
              cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
          }
      },
      limits: { fileSize: 6000000 },
      storage: diskStorage({
          destination: './uploads',
          filename: function (req, file, cb) {
              cb(null, Date.now() + file.originalname)
          },
      })
  }
))

  // @UseGuards(SessionGuard)
  async addVictim(@Param("adminid") adminid:number, @UploadedFile() imageobj:Express.Multer.File, @Body() victim: VictimEntity): Promise<{ message: string }> {
    // const adminId = session.adminId; // Assuming you have the AdminId stored in the session as "adminId"
    
    // console.log('Retrieved Admin ID from session:', adminId);
    // console.log('Session data:', session.id);

    console.log(imageobj.filename);
    victim.Insertfile_NID= imageobj.filename;
    const addedVictim = await this.adminservice.addVictimWithAdmin( adminid,victim);
    
    if (addedVictim) {
      return { message: 'Victim added successfully.' };
    } else {
      return { message: 'Failed to add victim.' };
    }
  }
//   @Post('/addVictim')
// // @UseGuards(SessionGuard)
// async addVictim(
//   @Session() session,
//   @Body() victim: VictimEntity
// ): Promise<{ message: string }> {
//   const adminId = session.adminId; // Assuming you have the AdminId stored in the session as "adminId"
  
//   console.log('Retrieved Admin ID from session:', adminId);
//   console.log('Session data:', session);

//   if (adminId) {
//     const admin = await this.adminservice.getAdminById(adminId);
//     if (admin) {
//       victim.admins = [admin];
//       await this.adminservice.addVictimWithAdmin(adminId,victim);
//       return { message: 'Victim added successfully.' };
//     } else {
//       return { message: 'Failed to add victim. Admin not found.' };
//     }
//   } else {
//     return { message: 'Failed to add victim. Admin ID not found in session.' };
//   }
// }
 



@Put('/updateadmin/:AdminId')
// @UseGuards(SessionGuard)
// @UsePipes(new ValidationPipe())
updateAdminbyID(@Param('AdminId') AdminId: number, @Body() data: AdminDTO): Promise<AdminEntity> {
  return this.adminservice.updateAdminById(AdminId, data);
}
@Get("/adminprofile/:id")
// @UseGuards(SessionGuard)
async getAdminProfile(@Param('id',ParseIntPipe) id: number) {
  return this.adminservice.getAdminProfilebyid(id);
}
// postcom(@Body() data:AdminDTO):object{
  
//   return this.adminservice.getAdminProfilebyid(data);
// }






//getpolice using username
@Get("/getpolice/:username")
// @UseGuards(SessionGuard)
  async getPoliceInfoByUsername(@Param('username') username: string): Promise<PRegistrationEntity> {
    return this.adminservice.getPoliceInfoByUsername(username);
  }


  //delete police account using username 
  @Delete('/deletepolice/:username')
  // @UseGuards(SessionGuard)
  // @UsePipes(new ValidationPipe())
  async deletePolice(@Param('username') username: string): Promise<PRegistrationEntity> {
    return this.adminservice.deletePoliceAccount(username);
  }
  //update police account using username 
  @Put('/updatepolice/:username')
  // @UseGuards(SessionGuard)
  // @UsePipes(new ValidationPipe())
  updatePolice(@Param('username') username: string, @Body() data: PRegistrationDTO): Promise<PRegistrationEntity> {
    return this.adminservice.updatePoliceAccount(username, data);
  }

  @Get("/getVictim/:id")
// @UseGuards(SessionGuard)
  async getVictimById(@Param('id') id: number): Promise<VictimEntity> {
    return this.adminservice.getVictimById(id);
  }
  @Put('/updatevictim/:id')
  // @UseGuards(SessionGuard)
  // @UsePipes(new ValidationPipe())
  updatevictimbyid(@Param('id') id: number, @Body() data: VicDTO): Promise<VictimEntity> {
    return this.adminservice.updatevictimbyid(id, data);
  }

  @Delete('/deletevictim/:id')
  // @UseGuards(SessionGuard)
  // @UsePipes(new ValidationPipe())
  async deletevictimbyid(@Param('id') id: number): Promise<VictimEntity> {
    return this.adminservice.deletevictimbyid(id);
  }

  
  @Put('/changeVictimPassword/:id')
async changeVictimPassword(@Param('id', ParseIntPipe) id: number,@Body('newPassword') newPassword: string): Promise<VictimEntity> {
  return this.adminservice.changeVictimPassword(id, newPassword);
}
  @Put('/changePolicePassword/:Username')
async changePolicePassword(@Param('Username') Username: string,@Body('newPassword') newPassword: string): Promise<PRegistrationEntity> {
  return this.adminservice.changePolicePassword(Username, newPassword);
}
//change admin password by id
@Put('/changeAdminPassword/:AdminId')
async changeAdminPassword(@Param('AdminId', ParseIntPipe) AdminId: number,@Body('newPassword') newPassword: string): Promise<AdminEntity> {
  return this.adminservice.changeAdminPassword(AdminId, newPassword);
}



@Post("/signin")
     async signin(@Session() session,@Body() data:AdminDTO){
       const ismatch=await this.adminservice.signin(session,data);
        if( ismatch==1){
            session.AdminId=data.AdminId;
            return {message: "Logged in"};
        }
        else{
          throw new UnauthorizedException ({mesage: "Something is wrong"});
        }
    }
    @Post(('/UploadRules'))
       @UseInterceptors(FileInterceptor('myfile',
         {
           fileFilter: (req, file, cb) => {
             if (file.originalname.match(/^.*\.(docx|pdf)$/)) {
               cb(null, true);
             } else {
               cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'myfile'), false);
             }
           },
           limits: { fileSize: 30000 },
           storage: diskStorage({
             destination: './uploads',
             filename: function (req, file, cb) {
               cb(null, Date.now() + file.originalname);
             },
           }),
         }
       ))
       uploadFile(@UploadedFile() myfileprof: Express.Multer.File): object {
         if (myfileprof) {
         
           console.log(myfileprof);
        
       
           return { message: "File uploaded successfully " };
         } else {
           return { message: "No file uploaded" };
         }
       }



   //logout

@Post('/signout')
logout(@Session() session)
{
  
  if(session.AdminId)
  {
    
    session.destroy();
    return {message:"you are logged out successfully"};
  }
  else
  {
    throw new UnauthorizedException("Can't log out");
  }
}
















}


    