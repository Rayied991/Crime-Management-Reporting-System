import {IsEmail, IsEmpty, IsNotEmpty,  IsNumber,  IsString,  Matches, MaxLength, Min, MinLength} from'class-validator';

export class RegistrationDTO{

 @IsString({message:"invalid first name"})
   @IsNotEmpty({message:"Please enter first name"})
   @Matches( /^[a-zA-Z]+$/, {message:"First Name should not contain numbers and symbol"})
    fname: string;

@IsString({message:"invalid last name"})
    @IsNotEmpty({message:"Please enter last name"})
    @Matches( /^[a-zA-Z]+$/, {message:"Last Name should not contain numbers and symbol"})
     lname: string;

     @IsString({message:"invalid  username"})
     @IsNotEmpty({message:"Please enter username"})
    
     @MaxLength(12, {message:"User name less than 6 character"})
      username: string;

      @IsString({message:"invalid location name"})
    @IsNotEmpty({message:"Please enter location name"})
    @Matches( /^[a-zA-Z]+$/, {message:"Location name should not contain numbers and symbol"})
     location: string;

    @IsEmail({}, {message:"invalid email"})
    email: string;

    @IsNumber({},{message:"Phone Numbers is can only be Numbers"})
    @Min(0,{message:"Phone number can not be negative"})
   phoneNum : number = -1;


   //is not working
    @IsString({message:"invalid  password"})
    @IsNotEmpty({message:"Please enter paassword"})
   // @Matches(/^(?=.*\d)(?=[a-zA-Z\s-:]*[a-zA-Z])[a-zA-Z\s-:]+$/, { message: "Password must be more than 8 letters and upper case and lower case Format with at least one numerical character" })
    @MinLength(8)
    password: string;
    nid: string;

 
}
