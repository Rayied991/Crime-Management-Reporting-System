import { Body, Controller, Get, Param, ParseIntPipe, Post, Session, UnauthorizedException, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./Admin.service";
import { AdminDTO } from "./Admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { AdminEntity } from "./Admin.entity";
import * as bcrypt from 'bcrypt';

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
@Post("/addadmin")
async addadmin(@Body() data: AdminDTO): Promise<string> {
  // Default salt generation
  const salt = await bcrypt.genSalt();
  data.password = await bcrypt.hash(data.password, salt);

  const result = await this.adminservice.create(data);
  if (result) {
    return "Signed up";
  } else {
    return "Account already exists";
  }
}

@Get("/adminprofile/:id")
async getAdminProfile(@Param('id',ParseIntPipe) id: number) {
  return this.adminservice.getAdminProfilebyid(id);
}
@Post("/signin")
     async signin(@Session() session,@Body() data:AdminDTO){
       const ismatch=await this.adminservice.signin(session,data);
        if(await ismatch==1){
            session.AdminId=data.AdminId;
            return {message: "Logged in"};
        }
        else{
            return {mesage: "Something is wrong"};
        }
    }
    //logout
@Get('/signout')
logout(@Session() session)
{
  
  if(session.AdminId)
  {
    session.destroy()
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