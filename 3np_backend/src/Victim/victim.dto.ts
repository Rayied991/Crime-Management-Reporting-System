import { IsAlphanumeric, IsEmail, IsEmpty, isNotEmpty, IsNotEmpty, IsNumber, isNumber, IsString, IsStrongPassword, Length, Matches, MaxLength, Min, MinLength } from "class-validator";
import { Doc } from "prettier";
import { Equal } from "typeorm";


export class VicDTO{
    @IsString({message:"invalid 1st name"})
    @IsNotEmpty({message: "Please enter first name"})
    @Matches(/^[A-Za-z]+$/, {message:"Enter a proper name"})
    //@Length(10)
    @MinLength(4)
    @MaxLength(10)
    
     Victim_FName: string;
    @IsString({message:"invalid 1st name"})
    @IsNotEmpty({message: "Please enter first name"})
    @Matches(/^[A-Za-z]+$/, {message:"Enter a proper name"})
    //@Length(10)
    @MinLength(4)
    @MaxLength(10)

    Victim_LName: string;
    
    
    @IsEmail({},{message:"Invalid Email"})
    @IsNotEmpty({message: "please enter your email."})
    
    VicEmail: string;

    
   @IsNotEmpty({message: "please enter your password."})
    @IsStrongPassword() //num,big,small
   @IsString()
   //@IsAlphanumeric()
   
   Vicpassword: string;

    @IsNotEmpty({message: "please enter your password."})
    @IsStrongPassword() //num,big,small
   @IsString()
   //@Equal()
   //@IsAlphanumeric()
    Confirm_Vicpassword: string;

    @IsNotEmpty({message: "please enter your NID."})
    //@IsNumber({},{message: "please enter NID number"})
    @Length(9)
    NID_No : number;

    @IsNotEmpty({message: "please enter your Phone number."})
   // @IsNumber({},{message: "please enter phone number"})
    Phone: number;

    Insertfile_NID: string;
}
export class VicLoginDTO{
    
    
    @IsEmail({},{message:"Invalid Email"})
    @IsNotEmpty({message: "please enter your email."})
    
    VicEmail: string;

    // @IsNumber()
    // @IsNotEmpty({message: "please enter your ID."})
    
    // VicID : number;
    
   // @IsNotEmpty()
    //@IsStrongPassword() //num,big,small
   // @IsString()
   // @IsAlphanumeric()
   @IsNotEmpty({message: "please enter your password."})
   @IsStrongPassword() //num,big,small
  @IsString()
   Vicpassword: string;

}
//parameterized constructor has 2 objects so 
//export class VicUpdateDTO
//{
    // @IsNumber({},{message: "Only will be number"})
    // @IsNotEmpty({message: "Name cannot be empty"})
   
   // VicID : number;
    // @IsString()
    // @IsNotEmpty({message: "Name cannot be empty"})
    // @Matches(/^[A-Za-z]+$/, {message:"Enter a proper name"})
    // @Length(10)
    // @MinLength(6)
    // @MaxLength(20)
   // VictimName : string;
      
       //@IsEmail({},{message:"Invalid Email"})
    //    @IsNotEmpty()
      // VicEmail : string;
      
    //    @IsNotEmpty()
       //@IsStrongPassword()
      // Vicpassword: string;
//
export  class PostComDTO{

    // @IsString()
    // @IsNotEmpty()
    // @Length(2000)
    // @MinLength(5,{message:"Cannot be less than 5 characters"})
    // @MaxLength(20000,{message:"cannot be more than 20000characters"})
    VicEmail: string;
    PostCom : string;
    // @IsNotEmpty()
    Eventdate : string;
    //Upload_file : Document;
    // @IsString()
    // @IsNotEmpty()
    Witness : string;
    FileUpload : string;

}