import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class ManagerDto{
    
    ManagerID:number;

    @IsString()
    @IsNotEmpty()
    
    M_Name:string;

    @IsNotEmpty()
    @IsEmail()
   
    M_Email:string;

    @IsNotEmpty()
  @MinLength(10)
    M_Password:string;
}

export class NoticePostDTO{

    NP_NO: number;
    NP: string;

}

export class SafetyPostDTO{

    SP_NO: number;
    SP: string;

}
export class InvestigationTeamDTO {

   IT_ID: number;
   IT_Member:string;


}
export class ManagerProfile{
    ManagerID:number;
    //M_Email:string;
}  