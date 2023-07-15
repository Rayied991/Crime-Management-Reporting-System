import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Query, Res, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./Admin.service";
import { AdminDTO } from "./Admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { AdminEntity } from "./Admin.entity";
import * as bcrypt from 'bcrypt';
import { SessionGuard } from "./session.guard";
import { ManagerDTO } from "src/Manager/Manager.dto";
import { ManagerEntity } from "src/Manager/manager.entity";
import { PoliceEntity } from "src/Police/police.entity";
import { VictimEntity } from "src/Victim/victim.entity";
import { PRegistrationDTO } from "src/Police/police.dto";

@Controller("admin")
export class AdminController{
    constructor(private readonly adminservice:AdminService){}
    //add new admin user
//   @Post('/addadmin')
//   @UsePipes(new ValidationPipe())
//   async create(@Body() mydto:AdminDTO) {
//     const result = this.adminservice.create(mydto);
//     if(await result === 0) {
//       return "email already signed up";
//     } else {
     
//       return "account created";
//     }
//   }
// }
//1. pass:Abc123
//2.pass:Abcd12345
@Post("/addadmin")
@UsePipes(new ValidationPipe())
async addadmin(@Body() data: AdminDTO): Promise<string> {
  const salt = await bcrypt.genSalt();
  data.password = await bcrypt.hash(data.password, salt);

  const result = await this.adminservice.create(data);
  if (result) {
    return "Signed up";
  } else {
    return "Account already exists";
  }
}

//updateadminbyid
@Put('/updateadmin/:AdminId')
@UseGuards(SessionGuard)
@UsePipes(new ValidationPipe())
updateAdminbyID(@Param('AdminId') AdminId: number, @Body() data: AdminDTO): object {
    return this.adminservice.updateAdminById(AdminId, data);
}





@Post("/addmanager")
@UseGuards(SessionGuard)
@UsePipes(new ValidationPipe())
async addManager(@Session() session,@Body() manager):Promise<ManagerEntity> {
  return this.adminservice.addManager(manager);
}


//getpolice using username
@Get("/getpolice/:username")
@UseGuards(SessionGuard)
  async getPoliceInfoByUsername(@Param('username') username: string): Promise<PoliceEntity> {
    return this.adminservice.getPoliceInfoByUsername(username);
  }

// @Post("/addvictim")
// // @UseGuards(SessionGuard)
// // @UsePipes(new ValidationPipe())
// async addVictim(@Session() session,@Body() victim):Promise<VictimEntity> {
//   return this.adminservice.addVictim(victim);
// }

@Post('/addpolice')
@UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  async addPolice(@Session() session, @Body() police: PoliceEntity): Promise<PoliceEntity> {
    const admin = await this.adminservice.getAdminById(session.adminId); // Assuming you have the AdminId stored in the session as "adminId"
    police.admins = [admin];

    return this.adminservice.addPolice(police);
  }
  //delete police account using username and also delete many to many relation table also
  @Delete('/deletepolice/:username')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  async deletePolice(@Param('username') username: string): Promise<PoliceEntity> {
    return this.adminservice.deletePoliceAccount(username);
  }
  //update police account using username 
  @Put('/updatepolice/:username')
  @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updatePolice(@Param('username') username: string, @Body() data: PRegistrationDTO): object {
    return this.adminservice.updatePoliceAccount(username, data);
  }



// @Post("/addmanager/:id")
// // @UseGuards(SessionGuard)
// async addmanager(@Param('id',ParseIntPipe) id: number,@Body() data: ManagerDTO):Promise<ManagerEntity> {
//    return await this.adminservice.addmanager(id,data);
// }


@Get("/adminprofile/:id")
@UseGuards(SessionGuard)
async getAdminProfile(@Param('id',ParseIntPipe) id: number) {
  return this.adminservice.getAdminProfilebyid(id);
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


   //logout

@Get('/signout')
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


    
   
//      @Put("/VictimUpdate/:id")
//      @UsePipes(new ValidationPipe())
//      updatevictimbyid(@Param('id') id:number, @Body() data:VicDTO):object{
//         return this.adminservice.updateVictimbyid(id,data);
//      }
   
//      @Delete("/VicDelete/:id")
//      deleteadmin(@Param('id') id:number):string{
//        return this.adminservice.DeleteVictimBYID(id);
//      }
   
//      //   @Post("/addadmin/:id")
//      //   @UsePipes(new ValidationPipe())
//      //    addadminbyid(@Param() id:number, @Body() data:AdminDTO):object{
//      //      debugger;
//      //     return this.adminservice.save(id,data);
//      // }
//      @Get("/search/:id")
//      getVictimbyId(@Param('id',ParseIntPipe) id:number):object{
//          return this.adminservice.getVictimById(id);
   
//      }
//      @Get("/Searchadmin/:id")
//      getadminbyId(@Param('id',ParseIntPipe) id:number):object{
//          return this.adminservice.getAdminbyid(id);
   
//      }
   
//    //   @Post("/addvictim/:id")
//    //  @UsePipes(new ValidationPipe())
//    //   addVictim( @Param() id:number, @Body() victim:VicDTO){
//    //     debugger
//    //     return this.adminservice.addVictim(id,victim);
//    // }
//    @Post('/addvictim/:id')
//    @UsePipes(new ValidationPipe())
//    async addVictim(@Param('id') id: number, @Body() victim: VicDTO): Promise<VictimEntity> {
//      return this.adminservice.addVictim(id, victim);
//    }
   
   
   
//        //Feature-1
//        @Post("login")
//        @UsePipes(new ValidationPipe())
//        login(@Query() qry:loginDTO):object{
//         return this.adminservice.login(qry);
//         }
   
     
//        //Feature-2
//        @Get("profile")
//        getAdminProfile(@Query() qry:AdminDTO):object{
//            return this.adminservice.getAdminProfile(qry);
           
//        }
       
   
//        //Feature-3
//        @Put("/adminupdateProfile")
//        updateadmin(@Query() data:AdminDTO):object{
//           return this.adminservice.updateadmin(data);
//        }
   
   
      
//        //Feature-4
//        @Get("Policeprofile")
//        getPoliceProfilebyName(@Param() username:string,  @Body() qry:RegistrationDTO):object{
//            return this.adminservice.getPoliceProfile(qry);
           
//        }
      
   
//        //Feature-5
//            @Put("/policeupdate/:email")
//            @UsePipes(new ValidationPipe())
//            updatePolicebyemail(@Param('email') email: string, @Body() data: RegistrationDTO): object {
//            return this.adminservice.updatePolicebyemail(email, data);
//        }
      
      
//        //Feature-6
//        @Get("/Victimprofile")
//        getVictimProfilebyName(@Query() qry:VicDTO):object{
//            return this.adminservice.getVictimProfilebyName(qry);
           
//        }
       
//        //Feature-7
//        @Put("/victimupdate/:VicID")
//        @UsePipes(new ValidationPipe())
//        updateVictimbyid(@Param() VicID: number, @Body() data: VicDTO): object {
//        return this.adminservice.updateVictimbyid(VicID, data);
//    }
       
   
//        //Feature-8
//        @Delete('/Victimdelete/:VicID')
//        @UsePipes(new ValidationPipe())
//        deleteVictimbyid(@Param() VicID: number, data:VicDTO): object {
//        return this.adminservice.deleteVictimbyid(VicID,data);
//        }
   
//        @Post(('/uploadProfile'))
//        @UseInterceptors(FileInterceptor('myfile',
//          {
//            fileFilter: (req, file, cb) => {
//              if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg|jfif|docx)$/)) {
//                cb(null, true);
//              } else {
//                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
//              }
//            },
//            limits: { fileSize: 30000 },
//            storage: diskStorage({
//              destination: './uploads',
//              filename: function (req, file, cb) {
//                cb(null, Date.now() + file.originalname);
//              },
//            }),
//          }
//        ))
//        uploadFile(@UploadedFile() myfileprof: Express.Multer.File): object {
//          if (myfileprof) {
         
//            console.log(myfileprof);
        
       
//            return { message: "File uploaded successfully " };
//          } else {
//            return { message: "No file uploaded" };
//          }
//        }
       
   


// }

// // @Delete('/policedelete')
// //     @UsePipes(new ValidationPipe())
// //     deletePoliceByEmail(@Body() data:RegistrationDTO): object {
// //     return this.adminservice.deletePoliceByEmail(data);
// //     }