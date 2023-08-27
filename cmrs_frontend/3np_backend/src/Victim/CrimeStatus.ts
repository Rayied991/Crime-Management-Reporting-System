import { VictimEntity } from "src/Victim/victim.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";

@Entity("CrimeStatus")
export class CrimeStatusEntity{
  
    @PrimaryColumn()
    PostId:number;
   
    @Column()
    Status:string;
   
    @OneToOne(()=> VictimEntity)
    police:VictimEntity;

}