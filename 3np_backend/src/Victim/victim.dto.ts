import { IsAlphanumeric, IsEmail, IsEmpty, isNotEmpty, IsNotEmpty, IsNumber, isNumber, IsString, IsStrongPassword, Length, Matches, MaxLength, Min, MinLength } from "class-validator";
export class VicDTO{
    @IsString({message:"invalid 1st name"})
    @IsNotEmpty({message: "Please enter first name"})
    @Matches(/^[A-Za-z]+$/, {message:"Enter a proper name"})
   
    
    Victim_FName: string;
    @IsString({message:"invalid 1st name"})
    @IsNotEmpty({message: "Please enter first name"})
    @Matches(/^[A-Za-z]+$/, {message:"Enter a proper name"})
   
    Victim_LName: string;
    
    
    @IsEmail({},{message:"Invalid Email"})
    @IsNotEmpty({message: "please enter your email."})
    VicEmail: string;

    @IsNumber()
    @IsNotEmpty({message: "please enter your ID."})
    VicID : number;
    
    @IsNotEmpty()
   
    @IsString()
  
    Vicpassword: string;

    @IsNotEmpty()  
    @IsString()
  
    Confirm_Vicpassword: string;

    @IsNotEmpty()
    @IsNumber({},{message: "please enter number"})
 
    NID_No : number;
}

export class VicUpdateDTO
{
    @IsNumber({},{message: "Only will be number"})
    @IsNotEmpty({message: "Name cannot be empty"})
   
    VicID : number;
    @IsString()
    @IsNotEmpty({message: "Name cannot be empty"})
    @Matches(/^[A-Za-z]+$/, {message:"Enter a proper name"})
   
    VictimName : string;
      
      
       @IsNotEmpty()
       VicEmail : string;
      
       @IsNotEmpty()
     
       Vicpassword: string;
}
export  class PostComDTO{

    @IsString()
    @IsNotEmpty()
   
    @MinLength(5,{message:"Cannot be less than 5 characters"})
    @MaxLength(20000,{message:"cannot be more than 20000characters"})
    PostCom : string;
    @IsNotEmpty()
    Eventdate : string;

     @IsString()
    @IsNotEmpty()
    Witness : string;

}