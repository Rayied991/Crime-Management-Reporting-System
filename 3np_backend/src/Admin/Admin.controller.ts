import { Controller, Get,Put,Post, UsePipes, ValidationPipe, Param, Body, Query, Delete, UseInterceptors, UploadedFile } from "@nestjs/common";
import { AdminService } from "./Admin.service";
import { AdminDTO, loginDTO } from "./Admin.dto";
import { RegistrationDTO } from "src/Police/police.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError , diskStorage} from "multer";
import { VicDTO } from "src/Victim/victim.dto";

@Controller("admin")
export class AdminController{
    constructor(private readonly adminservice:AdminService){}
    //Feature-1
    @Post("login")
    @UsePipes(new ValidationPipe())
    login(@Query() qry:loginDTO):object{
     return this.adminservice.login(qry);
     }

  
    //Feature-2
    @Get("profile")
    getAdminProfile(@Query() qry:AdminDTO):object{
        return this.adminservice.getAdminProfile(qry);
        
    }
    

    //Feature-3
    @Put("/adminupdateProfile")
    updateadmin(@Query() data:AdminDTO):object{
       return this.adminservice.updateadmin(data);
    }


   
    //Feature-4
    @Get("Policeprofile")
    getPoliceProfilebyName(@Param() username:string,  @Body() qry:RegistrationDTO):object{
        return this.adminservice.getPoliceProfile(qry);
        
    }
   

    //Feature-5
        @Put("/policeupdate/:email")
        @UsePipes(new ValidationPipe())
        updatePolicebyemail(@Param('email') email: string, @Body() data: RegistrationDTO): object {
        return this.adminservice.updatePolicebyemail(email, data);
    }
   
   
    //Feature-6
    @Get("/Victimprofile")
    getVictimProfilebyName(@Query() qry:VicDTO):object{
        return this.adminservice.getVictimProfilebyName(qry);
        
    }
    
    //Feature-7
    @Put("/victimupdate/:VicID")
    @UsePipes(new ValidationPipe())
    updateVictimbyid(@Param() VicID: number, @Body() data: VicDTO): object {
    return this.adminservice.updateVictimbyid(VicID, data);
}
    

    //Feature-8
    @Delete('/Victimdelete/:VicID')
    @UsePipes(new ValidationPipe())
    deleteVictimbyid(@Param() VicID: number, data:VicDTO): object {
    return this.adminservice.deleteVictimbyid(VicID,data);
    }

    @Post(('/uploadProfile'))
    @UseInterceptors(FileInterceptor('myfile',
      {
        fileFilter: (req, file, cb) => {
          if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg|jfif|docx)$/)) {
            cb(null, true);
          } else {
            cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
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
    


}

// @Delete('/policedelete')
//     @UsePipes(new ValidationPipe())
//     deletePoliceByEmail(@Body() data:RegistrationDTO): object {
//     return this.adminservice.deletePoliceByEmail(data);
//     }