/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { RegistrationDTO } from './police.dto';


@Injectable()
export class PoliceService {
    AddRegistration(registration: RegistrationDTO): object {
       
return registration;


    }

 
}