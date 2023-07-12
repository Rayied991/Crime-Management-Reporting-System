import { Doc } from "prettier";
import { PostComplain } from "src/PostComplain/Postcom.entity";

//import { PoliceEntity } from "src/PostComplain/Postcom.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

 
@Entity("Victim")
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
@OneToMany(()=>PostComplain,postCom=>postCom.victim)
postcom: PostComplain[];

    // @Column({name:"Fullname",type:"varchar",length:150})
    // name:string;

    // @Column({type:"varchar",length:150})
    // email:string;


}

// @Entity("AdminProfile")
// export class AdminProfile{
//     @PrimaryGeneratedColumn()
//     id:number

//     @Column()
//     name:string;

//     @Column({type:"varchar",length:150})
//     photo:string;
// }
