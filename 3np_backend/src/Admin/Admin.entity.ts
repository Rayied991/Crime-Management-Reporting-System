
import { VictimEntity } from "src/Victim/victim.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("Admin")
export class AdminEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({name:"Fullname",type:"varchar",length:150})
    name:string;

    @Column({type:"varchar",length:150})
    email:string;

    @Column()
    Location:string;

    @OneToMany(()=> VictimEntity,victim => victim.admin)
    victims:VictimEntity[];
    
}


