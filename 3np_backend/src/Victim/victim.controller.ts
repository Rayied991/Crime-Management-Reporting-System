import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, Session, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, UseGuards, UnauthorizedException, NotFoundException, HttpStatus } from "@nestjs/common";
import { PostComDTO, VicDTO, VicLoginDTO } from "./victim.dto";
import { VicService } from "./victim.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import session = require("express-session");
import { SessionGuard } from "./session.guard";
import { vicEntity } from "./victim.entity";
import { PostComplain } from "src/PostComplain/Postcom.entity";
import { response } from "express";

@Controller("victim")
export class VicController{
    constructor(private readonly vicservice : VicService){}

    @Get("/proinfo") //route
    getProfile():any{
    return this.vicservice.getProfile();
}
@Get("/getnews")
getNews():any{
    return this.vicservice.getNews();
}
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
//  @Post("/signin")
//  //@UsePipes(new validation)
//  signin(@Body() data:VicDTO, @Session() session)
// {
//     if(this.vicservice.signin(data))
//     {
//         session.VicEmail = data.VicEmail;
//         return {message:"you have logged in"};
//       }
//     else{
//         return false;
//     }
// // return this.vicservice.signin(data);
// }
 @Post("/signin")
 //@UsePipes(new ValidationPipe())
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


@Get("/signout")
async signout (@Session() session){
if(session.destroy())
{
    
    return { 
      message: "You are logged out"};
    //response.clearCookie('connect.sid');
}
else{
    throw new UnauthorizedException({message: "Invalid Actions"});
}

}
//response.clearCookie('connect.sid')
 @Post("/postComplain")
// @UsePipes(new ValidationPipe())
 postcom(@Body() data:PostComDTO):object{
     console.log(data);
     return this.vicservice.postcom(data);
 }
 //search complain 
 @Get("/searchComplain/:id")
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

 @Get("/search/:id")
  getComById(@Param('id',ParseIntPipe) id:number):object{
      return this.vicservice.getComById(id);

  }





@Put("/updatereg/:id")
@UsePipes(new ValidationPipe())
updateVicById(@Param('id') id:number,@Body() data:VicDTO) : object{
    //console.log(data);
    return this.vicservice.updateVicById(id,data);
}


@Delete('/deleteCom/:id')
deleteCombyID(@Param('id') id:number ):object
{
    return this.vicservice.deleteCombyID(id);
}

/////// 8. upload evidence
@Post(('/uploadEvidence'))
@UseInterceptors(FileInterceptor('myfileevi',
{ fileFilter: (req, file, cb) => {
    if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg|pdf|docx)$/))
     cb(null, true);
    else {
    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    }
    },
    limits: { fileSize: 300000 },
    storage:diskStorage({
    destination: './uploadEvidence',
    filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
    },
    })
    }
))
uploadFile(@UploadedFile() myfileobj: Express.Multer.File):object
{
 console.log(myfileobj)   
return ({message:"file uploaded"});
}

@Get('/getimage/:name')
getImages(@Param('name') name, @Res() res) {
 res.sendFile(name,{ root: './uploads' })
 }

 @Post('/systemFeedback')
 sendEmail(@Body() data){
 return this.vicservice.sendEmail(data);
 }




}