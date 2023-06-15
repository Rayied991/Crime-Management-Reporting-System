/*
https://docs.nestjs.com/controllers#controllers
*/
import { Body, Controller,  Get, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';

import { RegistrationDTO } from './police.dto';
import { PoliceService } from './police.service';

@Controller('police')
export class PoliceController
{
   
    
    constructor(private readonly policeService: PoliceService){
        // Empty Constructor
    }
    @Post('/registration')
    @UsePipes(new ValidationPipe())
    AddRegistration (@Body () registration:RegistrationDTO ): object {
   
        return this.policeService.AddRegistration(registration);
    }

}