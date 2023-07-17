import { AdminEntity } from "src/Admin/Admin.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity("Police")
export class PRegistrationEntity{
    @PrimaryColumn()
    username:string;

    @Column()
    Fname:string;
    @Column()
    Lname:string;
    @Column()
    Location:string;
    @Column()
    email:string;
    @Column()
    phonNum:number;
    @Column()
    Password:string;

    @Column()
    Profile_image:string;

    @ManyToMany(() => AdminEntity, admin => admin.polices)
   
    admins: AdminEntity[];

    @OneToMany(()=>Wantedlist2Entity, wantedlist2=>wantedlist2.police_username)
    wantedlist2: Wantedlist2Entity[];

    @OneToMany(()=>Wantedlist1Entity, wantedlist1=>wantedlist1.police)
    wantedlist1: Wantedlist1Entity[];

    @OneToMany(()=>CrimeStatusEntity,CrimeStatus=>CrimeStatus.police)
    CrimeStatus: CrimeStatusEntity[];


}


@Entity("WantedList")
export class Wantedlist2Entity{

    
 
    @Column()
    criminal_name:string;
    
   
   
    
    @Column()
    criminal_email: string;

  
    @PrimaryColumn()
    wanted_criminal_no:number;
    
    @Column()
    criminal_capture_date: string;
    @Column()
    address:string;
     
    
    


    @ManyToOne(()=> PRegistrationEntity)
    police_username:PRegistrationEntity;

}


@Entity("CrimeDetails")
export class Wantedlist1Entity{

    
 




    @PrimaryColumn()
   
    criminal_phonenumber: number;

    
   

 
    @Column()
    Details:string;

  
    @ManyToOne(()=> PRegistrationEntity)
    police:PRegistrationEntity;
    
    

    
    @OneToOne(() =>  Wantedlist2Entity)
    @JoinColumn()
    wantedlist2:  Wantedlist2Entity[];
    

}






@Entity("CrimeStatus")
export class CrimeStatusEntity{

    
 
   
   
  
    @PrimaryColumn()
    PostId:number;
   

    @Column()
    Status:string;
   


  
    @ManyToOne(()=> PRegistrationEntity)
    police:PRegistrationEntity[];
    
    

    
    

}
