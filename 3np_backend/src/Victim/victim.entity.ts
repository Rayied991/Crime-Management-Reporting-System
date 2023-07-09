import { AdminEntity } from "src/Admin/Admin.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


 
@Entity("victimReg")
// @Entity("Admin")//no name by default created by this class name AdminEntity
export class VictimEntity{
    @PrimaryGeneratedColumn()
    id:number;

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



    @ManyToOne(()=> AdminEntity,admin => admin.victims)
    admin:AdminEntity;
 

}


