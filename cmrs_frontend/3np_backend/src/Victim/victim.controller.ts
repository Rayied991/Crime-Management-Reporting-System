import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Session, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, UseGuards, UnauthorizedException, NotFoundException, HttpStatus } from "@nestjs/common";
import { PostComDTO, UpdateCom, UpEvidenceDTO, VicDTO, VicLoginDTO, VicUpdateDTO } from "./victim.dto";
import { VicService } from "./victim.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";

import { VictimEntity } from "./victim.entity";
import { response } from "express";
import { SessionGuard } from "src/Admin/session.guard";
import { PostComplain } from "./Postcom.entity";
import { CrimeStatusEntity } from "./CrimeStatus";


@Controller("victim")
export class VicController{
    constructor(private readonly vicservice : VicService){}

//feature --1
 @Post("/regvic")
 @UseInterceptors(FileInterceptor('image',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
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
@UsePipes(new ValidationPipe())
 addVic1(@Body() data:VicDTO, @UploadedFile() imageobj:Express.Multer.File):object{
     console.log(data);
     console.log(imageobj.filename);
     data.Insertfile_NID= imageobj.filename;
     return this.vicservice.addVic(data);
 }
 

 //feature--2
 @Post("/signin")

 async signin(@Body() data:VicDTO, @Session() session)
{
   const res = await this.vicservice.signin(data)
   if(res == true)
    {
        session.VicEmail = data.VicEmail;
          return {
              VictimEmail: session.VicEmail,
              message:"Logged in"
          };
        }
    else{
        throw new UnauthorizedException({message: "Wrong password or email."});
    }
// return this.vicservice.signin(data);
}
//feature--3
@Get('/search/:Vicid')
@UseGuards(SessionGuard)
 getComById(@Param('Vicid',ParseIntPipe) Vicid:number):object{
     return this.vicservice.getComById(Vicid);

 }
//feature--4
// @Get('/signout')
// logout(@Session() session)
// {

//   if(session.AdminId)
//   {

//     session.destroy();
//     return {message:"you are logged out successfully"};
//   }
//   else
//   {
//     throw new UnauthorizedException("Can't log out");
//   }
// }
@Get("/signout")
signout (@Session() session)
{
if(session.VicEmail)
{
    session.destroy();
    return { 
      message: "You are logged out"};
    //response.clearCookie('connect.sid');
}
else{
    throw new UnauthorizedException( "Invalid Actions");
}

}
//response.clearCookie('connect.sid')
//Feature--5
 @Post("/postComplain")
 @UsePipes(new ValidationPipe())
 postcom(@Body() data:PostComDTO):object{
     console.log(data);
     return this.vicservice.postcom(data);
 }
 //Feature--6
 @Get("/searchComplain/:id")
 //@UseGuards(SessionGuard)
 async searchComById(@Param('id',ParseIntPipe) id:number):Promise<PostComplain>{
      const res = await this.vicservice.searchComById(id)
      if(res !== null)
      {
        console.log(res);
        return res;
      }
      else{
        throw new NotFoundException({
            status: HttpStatus.NOT_FOUND,
            message : "Not found complain"
                      });
      }

  }
    ////feature--7
    @Delete('/deleteCom/:id')
    deleteCombyID(@Param('id') id:number ):object
    {
        return this.vicservice.deleteCombyID(id);
    }
    ////feature--8
    
  @Put("/updatecomplain/:id")
  //@UsePipes(new ValidationPipe())
  updateComByID(@Param('id' , ParseIntPipe) id:number,
  @Body() mydata :UpdateCom) : any{
     
      return this.vicservice.updateComByID(mydata,id);
  }
  //feature--9
  @Put("/updatereg/:id")
//@UsePipes(new ValidationPipe())
updateVicById(@Param('id' , ParseIntPipe) id:number,
@Body() mydata :VicUpdateDTO) : any{
   
    return this.vicservice.updateVicById(mydata,id);
}
//feature--10
@Post('/ChangePassWithMailer')
 changePass(@Body() data){
 return this.vicservice.changePass(data);
 }
 //feature--11
 @Post('/systemFeedback')
 sendEmail(@Body() data){
 return this.vicservice.sendEmail(data);
 }
 //feature--13
  @Get("/crimestatus/:id")
  async SearchCrimeStatus(@Param('id') id:number ) :Promise<CrimeStatusEntity>{
      return this.vicservice.SearchCrimeStatus(id);
  }
//feature--12
  @Post("/UploadEvidence")
  @UseInterceptors(FileInterceptor('Evidence',
         {
             fileFilter: (req, file, cb) => {
                 if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg|pdf|txt})$/))
                     cb(null, true);
                 else {
                     cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'Evidence'), false);
                 }
             },
             limits: { fileSize: 600000 },
             storage: diskStorage({
                 destination: './Documents_Evidence',
                 filename: function (req, file, cb) {
                     cb(null, Date.now() + file.originalname)
                 },
             })
         }
     ))
 //@UsePipes(new ValidationPipe())
  Evidence_Up(@Body() data:UpEvidenceDTO, @UploadedFile() fileobj:Express.Multer.File):object{
      //console.log(data);
      console.log(fileobj.filename);
      data.Evidence_File= fileobj.filename;
      return this.vicservice.Evidence_Up(data);
  }

//   @Put('/update/:id')
//   update(
      
//       @Body() updateuserdto: UpdateUserDto,
//       @Param('id', ParseIntPipe) id: number){
//       return this.userservice.update(updateuserdto, id);
//   }


// @Put('/updateadmin')
// @UseGuards(SessionGuard)
// //@UsePipes(new ValidationPipe())
// updateAdmin(@Body() data: AdminUpdateDTO, @Session() session): object {
//     console.log(session.email);
//     return this.adminService.updateAdmin(session.email, data);
// }
//guards
// @Put("/updateReg")
// @UseGuards(SessionGuard)
// //@UsePipes(new ValidationPipe())
// updateReg(@Session() session, @Body() data:VicUpdateDTO):object{
// console.log(session.VicEmail);
// return this.vicservice.updateReg(session.VicEmail,data);
// }



/////// 8. upload evidence
// @Post(('/uploadEvidence'))
// @UseInterceptors(FileInterceptor('myfileevi',
// { fileFilter: (req, file, cb) => {
//     if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg|pdf|docx)$/))
//      cb(null, true);
//     else {
//     cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
//     }
//     },
//     limits: { fileSize: 300000 },
//     storage:diskStorage({
//     destination: './uploadEvidence',
//     filename: function (req, file, cb) {
//     cb(null,Date.now()+file.originalname)
//     },
//     })
//     }
// ))
// uploadFile(@UploadedFile() myfileobj: Express.Multer.File):object
// {
//  console.log(myfileobj)   
// return ({message:"file uploaded"});
// }

// @Get('/getimage/:name')
// getImages(@Param('name') name, @Res() res) {
//  res.sendFile(name,{ root: './uploads' })
//  }




//     @Get("/proinfo") //route
//     getProfile():any{
//     return this.vicservice.getProfile();
// }
// @Get("/getnews")
// getNews():any{
//     return this.vicservice.getNews();
// }
//part-1
    // @Get("search")
    // getAdminbyName(@Query() name:object, @Query() id:number):object{
    //     return this.adminservice.getAdminbyName(name);
    //     // return {name:name};
    // }
    //Part-2
    // @Get("search")
    // getAdminbyName(@Query() qry:any):object{
    //     // return this.adminservice.getAdminbyName(qry);
    //     // return {name:name};
    //     // return {Name:qry.name, Id:qry.id};
    //     return qry;
    // }
// @Get("searchNews/:id")
// getnews(@Param() id:number):string{
//     return this.vicservice.getnews(id);
// // }
// @Get("searchNews")
// getnews(@Query() qry1 : VicDTO):object{
//     return this.vicservice.getnews(qry1);
// }

//dto
//search criminal names
// @Get("searchNames/:id") //qry--> variable
// getvicbyName(@Query() qry : VicDTO) : string{
//     return this.vicservice.getvicbyName(qry);
// }
//original 
// @Post("/addadmin")
// addadmin(@Body() data:object):object{
//     return this.adminservice.addAdmin(data);
// }

//Now using dto --> string - 1 data can be passed
//--> object --> all data can be passes
// @Post("addadmin")
// addadmin(@Body() data:AdminDTO):string{
//     return this.adminservice.addAdmin(data);
// }

}