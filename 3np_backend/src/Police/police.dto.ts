import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  isEmpty,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
export class PRegistrationDTO{

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
     
      @MaxLength(12, {message:"User name less than 12 character"})
      username: string;
 
       @IsString({message:"invalid location name"})
     @IsNotEmpty({message:"Please enter location name"})
     @Matches( /^[a-zA-Z]+$/, {message:"Location name should not contain numbers and symbol"})
      location: string;
 
     @IsEmail({}, {message:"invalid email"})
     @IsNotEmpty({message:"Please enter email"})
     email: string;
     //email_password:string;
 
     @IsNumber({},{message:"Phone numbers must be numbers,dont use cherecters"})
     @IsNotEmpty({message:"Please enter phone number"})
     @Min(0,{message:"Phone number can not be negative"})
    phoneNum : number;
 
    //  @IsString({message:"invalid  password"})
    //  @IsNotEmpty({message:"Please enter paassword"})
    //  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: "Password must be more than 8 letters and upper case and lower case Format with at least one numerical character" })
     password: string;
     profile_image: string;
 
  
 }

 export class AddFIRDTO{
 
 police_name:string;
 police_email:string;
 
 police_mobilenumber:string;
 complain_details: string;
 
 complainant_name: string;
 complainant_father_name: string;
 
 complainant_phone_number: string;
 
 
 
 
 }
 export class Add1_Wanted_List_DTO{
 
 
   criminal_name:string;
   criminal_email: string;
   wanted_criminal_no:number;
  // criminal_phonenumber: number;
   criminal_capture_date: string;
   address:string;
 
 
 
 }
 export class CrimeDetails_DTO{
 
 
   
   criminal_phonenumber: number;
   //wanted_criminal_no:number;
   
   Details:string;
 
 
 }
 
 
 export class Police_Profile_Login_DTO {
   
   username: string;
  
   password:string;
 
 
  
 
 
 }
 
 
 
 export class SendFIRDto {
   VictimID: number;
   PostID: number;
   FIRReport: string;
   InvestigatedBy: string;
   To: string;
   Subject: string;
 }
 
 export class GetForgertPassDTO{
   PoliceUsername: string;
   Text:string;
   To: string;
   Subject: string;
 }
 
 
 export class Change_Pass{
  
   @IsString({message:"invalid  password"})
   @IsNotEmpty({message:"Please enter paassword"})
   @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: "Password must be more than 8 letters and upper case and lower case Format with at least one numerical character" })
 new_password:string;
 
 @IsString({message:"invalid  password"})
 @IsNotEmpty({message:"Please enter paassword"})
 @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: "Password must be more than 8 letters and upper case and lower case Format with at least one numerical character" })
 confirm_password:string;
   
 }
   
 /*
 export class Police_Forget{
 email: string;
  email_password:string;
 }
 */
 export class CrimeStatusDTO{
  PostId:number;
  Status:string;
   }