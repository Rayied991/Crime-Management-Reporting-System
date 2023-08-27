import {IsEmail, IsString,IsNotEmpty, IsStrongPassword, Matches, Length, MinLength, MaxLength, IsUrl, IsNotEmptyObject, IsPhoneNumber, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, Validate} from 'class-validator'
import { Unique } from 'typeorm';

export class AdminDTO{
    AdminId:number;
    
     @IsString()
     @IsNotEmpty()
   
    name:string;
    @IsNotEmpty()
    @IsEmail()
   
   
    email:string;
    @IsNotEmpty()
 

    phone:number;
    @IsNotEmpty()
  @MinLength(10)

    password:string;

   
  

    
    
}
export class OTPDTO{
  generatedotp:string;
}

