import { AdminEntity } from "src/Admin/Admin.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("Manager")
export class ManagerEntity{
    @PrimaryGeneratedColumn()
    ManagerID:number;

    @Column()
    M_Name:string;

    @Column()
    M_Email:string;

    @Column()
    M_Password:string;

    // @ManyToOne(()=> AdminEntity,admin => admin.managers)
    // admin:AdminEntity;
}