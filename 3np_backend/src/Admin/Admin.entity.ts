

import { ManagerEntity } from "src/Manager/manager.entity";
import { PoliceEntity } from "src/Police/police.entity";
import { VictimEntity } from "src/Victim/victim.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


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
 
    @OneToOne(() => Adminprofile, adminProfile => adminProfile.admin)
  adminProfile: "Adminprofile";
    @OneToOne(() => PoliceEntity, police => police.admin)
  police: "PoliceEntity";
  @OneToOne(() => VictimEntity, victim => victim.admin)
  victim: "VictimEntity";

  @OneToMany(()=>ManagerEntity,manager=>manager.admin)
  managers:ManagerEntity[];

    
    
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

    @OneToOne(() => AdminEntity, admin => admin.adminProfile)
    @JoinColumn({name:"AdminId"})
    admin: "AdminEntity";



}


