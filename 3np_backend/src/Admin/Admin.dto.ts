import {IsEmail, IsString,IsNotEmpty, IsStrongPassword, Matches, Length, MinLength, MaxLength, IsUrl, IsNotEmptyObject} from 'class-validator'
export class AdminDTO{
    
     // @IsString()
    // @IsNotEmpty({message:"Name Cannot be Empty"})
    // @Matches(/^[A-Za-z]+$/, { message: 'Enter a Specific Name!' })
    // @IsUrl(undefined,{message:"Invalid Url"})
    name:string;
    // @Matches(/^localhost:3000\/admin\/addadmin$/, { message: 'Invalid URL' })
    
    // @IsEmail({},{message:"Invalid Email"}) 
    // @IsNotEmpty({message:"Email Field Cannot be empty"})
    email:string;

    // @IsNotEmpty({message:"Location cannot be empty"})
    // @IsString({message:"Location must be a String"})
    Location:string;

    
    
}

export class loginDTO{
    @IsString({message:"Username must be String"})
    @IsNotEmpty({message:"UserName Cannot be Empty"})
    username: string;

    @IsString()
    @IsStrongPassword({},{message:'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'})
   password: string;


   

}