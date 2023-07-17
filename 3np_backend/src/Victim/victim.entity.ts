import { Doc } from "prettier";
import { CrimeStatusEntity } from "src/CrimeStatus/CrimeStatus";
import { PostComplain } from "src/PostComplain/Postcom.entity";
import { UpEvidence } from "src/UploadEvidence/UploadEvi";

//import { PoliceEntity } from "src/PostComplain/Postcom.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

 
@Entity("victimReg")
// @Entity("Admin")//no name by default created by this class name AdminEntity
export class vicEntity{
    @PrimaryGeneratedColumn()//victimId
    id:number
    
    @Column({name:'fname',type: "varchar",length: 150})
    Victim_FName: string;

    @Column({name:'lname',type: "varchar",length: 150})
    Victim_LName: string;

    @Column({type: "varchar",length: 150})
    VicEmail: string;

    @Column()
    Vicpassword: string;

    @Column()
    Confirm_Vicpassword: string;

    @Column()
    NID_No : number;
    @Column()
    Phone: number;
    @Column()
    Insertfile_NID: string;
  //  polices: any;

@OneToOne(()=>UpEvidence,victimfile=>victimfile.upload)
victimfile: "UpEvidence";

@OneToMany(()=>PostComplain,postCom=>postCom.victim)
postcom: PostComplain[];


@OneToOne(()=>CrimeStatusEntity,CrimeStatus=>CrimeStatus.police)
CrimeStatus: CrimeStatusEntity;

    // @Column({name:"Fullname",type:"varchar",length:150})
    // name:string;

    // @Column({type:"varchar",length:150})
    // email:string;


}


