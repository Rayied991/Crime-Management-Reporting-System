

import { ManagerEntity } from "src/Manager/manager.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("Admin")
export class AdminEntity{

    @PrimaryGeneratedColumn()
    AdminId:number;

    @Column({name:"Fullname",type:"varchar",length:150})
    name:string;

    @Column({type:"varchar",length:150})
    email:string;

    @Column()
    phone:number;

    @Column()
    password:string;

    // @OneToOne(()=>Adminprofile,profile =>profile.adminprof)
    // Admin:Adminprofile;

    // @OneToMany(()=>ManagerEntity,manager =>manager.admin)
    // managers:ManagerEntity[];

    
    
}

@Entity("Adminprofile")
export class Adminprofile{
    @PrimaryGeneratedColumn()
    profileId:number;

    @Column({name:"Fullname",type:"varchar",length:150})
    name:string;

    @Column({type:"varchar",length:150})
    email:string;

    @Column()
    phone:number;

    @Column()
    Address:string;

    // @OneToOne(()=> AdminEntity,admin => admin.Admin)
    // adminprof:AdminEntity;



}


