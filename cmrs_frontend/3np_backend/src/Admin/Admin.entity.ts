

import { ManagerEntity } from "src/Manager/manager.entity";
import { PRegistrationEntity } from "src/Police/police.entity";
import { VictimEntity } from "src/Victim/victim.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";


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

   
 
   

    @ManyToMany(() => PRegistrationEntity, police => police.admins)
    @JoinTable({name:"admin_police_relation"})
   
  polices: PRegistrationEntity[];


  @ManyToMany(()=>VictimEntity,victim =>victim.admins)
  @JoinTable({name:"admin_victim_relation"})
  victims:VictimEntity[];



  @OneToMany(()=>ManagerEntity,manager=>manager.admin)
  managers:ManagerEntity[];

 

    
    
}
@Entity("OTP")
export class OTPEntity{
  @PrimaryColumn()
  generatedotp:string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

 
}





