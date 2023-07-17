import { AdminEntity } from "src/Admin/Admin.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


 
@Entity("Victim")

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

    

    @ManyToMany(()=>AdminEntity,admin=>admin.victims)
    admins:AdminEntity[];



   
 

}


