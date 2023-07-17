

import { ManagerEntity } from "src/Manager/manager.entity";
import { PoliceEntity } from "src/Police/police.entity";
import { VictimEntity } from "src/Victim/victim.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity("Admin")
@Unique(['email'])
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

    @ManyToMany(() => PoliceEntity, police => police.admins)
    @JoinTable({name:"admin_police_relation"})
   
  polices: PoliceEntity[];


  @ManyToMany(()=>VictimEntity,victim =>victim.admins)
  @JoinTable({name:"admin_victim_relation"})
  victims:VictimEntity[];

  // @OneToOne(() => VictimEntity, victim => victim.admin)
  // victim: "VictimEntity";

  @OneToMany(()=>ManagerEntity,manager=>manager.admin)
  managers:ManagerEntity[];

 

    
    
}

@Entity("Adminprofile")
export class Adminprofile{
    @PrimaryGeneratedColumn()
    profileId:number;

    @Column()
    Location:string;

    

    @OneToOne(() => AdminEntity, admin => admin.adminProfile)
    @JoinColumn({name:"AdminId"})
    admin: "AdminEntity";

   



}




