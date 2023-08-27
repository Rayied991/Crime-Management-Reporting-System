import { AdminEntity } from "src/Admin/Admin.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ManagerProfile } from "./manager.dto";

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

    // @ManyToOne(()=> AdminEntity,admin => admin.manager)
    // @JoinColumn({name:"Manager_ID"})
    // admin:AdminEntity;

    @OneToOne(() => managerProfile, managerProfile => managerProfile.manager)
    managerProfile: "managerProfile";
    
    @OneToMany(() =>SafetyPostEntity,safety => safety.ManagerID)
    safetypost:SafetyPostEntity[];
}
@Entity("managerProfile")
export class managerProfile{
    @PrimaryGeneratedColumn()
    ManagerID:number;


    @OneToOne(() => ManagerEntity, manager => manager.managerProfile)
    @JoinColumn({name:"Manager_ID"})
    manager: " ManagerEntity";



}

    @Entity("SafetyPost")
export class SafetyPostEntity{

        @PrimaryGeneratedColumn()
        SP_NO: number;

        @Column()
        SP: string;
     
        @ManyToOne(()=> ManagerEntity,manager=>manager.safetypost)
        @JoinColumn({name:"Manager_ID"})
        ManagerID:ManagerEntity;

   
    
    }

    @Entity("NoticePost")
export class NoticePostEntity{

    @PrimaryGeneratedColumn()
    NP_NO: number;

    @Column()
    NP: string;
 
    


}    
@Entity("InvestigationTeam")
export class InvestigationTeamEntity{

    @PrimaryGeneratedColumn()
    IT_ID: number;

    @Column()
    IT_Member:string;
 


} 


    

  