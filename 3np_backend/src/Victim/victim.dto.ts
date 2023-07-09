import { IsAlphanumeric, IsEmail, IsEmpty, isNotEmpty, IsNotEmpty, IsNumber, isNumber, IsString, IsStrongPassword, Length, Matches, MaxLength, Min, MinLength } from "class-validator";

export class VicDTO{
    // @IsString({message:"invalid 1st name"})
    // @IsNotEmpty({message: "Please enter first name"})
    // @Matches(/^[A-Za-z]+$/, {message:"Enter a proper name"})
    // @Length(10)
    // @MinLength(4)
    // @MaxLength(10)
    
     Victim_FName: string;
    // @IsString({message:"invalid 1st name"})
    // @IsNotEmpty({message: "Please enter first name"})
    // @Matches(/^[A-Za-z]+$/, {message:"Enter a proper name"})
    // @Length(10)
    // @MinLength(4)
    // @MaxLength(10)

    Victim_LName: string;
    
    
    // @IsEmail({},{message:"Invalid Email"})
    // @IsNotEmpty({message: "please enter your email."})
    
    VicEmail: string;

    // @IsNumber()
    // @IsNotEmpty({message: "please enter your ID."})
    
    // VicID : number;
    
   // @IsNotEmpty()
    //@IsStrongPassword() //num,big,small
   // @IsString()
   // @IsAlphanumeric()
   
   Vicpassword: string;

    //@IsNotEmpty()
    //@IsStrongPassword() //num,big,small
   // @IsString()
   // @IsAlphanumeric()
    Confirm_Vicpassword: string;

   // @IsNotEmpty()
    //@IsNumber({},{message: "please enter number"})
   // @Length(9)
    NID_No : number;
    Phone: number;
    Insertfile_NID: string;

     //id:number
    // name:string;
    // email:string;
}
//parameterized constructor has 2 objects so 
export class VicUpdateDTO
{
    @IsNumber({},{message: "Only will be number"})
    @IsNotEmpty({message: "Name cannot be empty"})
   
    VicID : number;
    @IsString()
    @IsNotEmpty({message: "Name cannot be empty"})
    @Matches(/^[A-Za-z]+$/, {message:"Enter a proper name"})
    @Length(10)
    @MinLength(6)
    @MaxLength(20)
    VictimName : string;
      
       //@IsEmail({},{message:"Invalid Email"})
       @IsNotEmpty()
       VicEmail : string;
      
       @IsNotEmpty()
       //@IsStrongPassword()
       Vicpassword: string;
}
export  class PostComDTO{

    @IsString()
    @IsNotEmpty()
    @Length(2000)
    @MinLength(5,{message:"Cannot be less than 5 characters"})
    @MaxLength(20000,{message:"cannot be more than 20000characters"})
    PostCom : string;
    @IsNotEmpty()
    Eventdate : string;
    //Upload_file : Document;
    @IsString()
    @IsNotEmpty()
    Witness : string;
}
