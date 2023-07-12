import { Controller, Get } from '@nestjs/common';


@Controller('user')
export class UserController {
  
  @Get('index')
  getUsers():string{
    return "User lisT///Romona sarkar s route established ";
}
  }
  

