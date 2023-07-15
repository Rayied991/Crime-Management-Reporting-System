import { AdminEntity } from "src/Admin/Admin.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity("Police")
export class PoliceEntity{
    @PrimaryColumn()
    Username:string;

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
}