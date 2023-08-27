//import { vicEntity } from "src/Victim/victim.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("PostComplain")
export class PostComplain{
    @PrimaryGeneratedColumn()
    id:number

    @Column({name:'fname',type: "varchar",length: 150})
    Victim_FName: string;

    @Column({type: "varchar",length: 150})
    VicEmail: string;

    @Column({type:"varchar",length:550})
    PostCom : string;

    @Column()
    Eventdate : string;


    @Column({type:"varchar",length:150})
    Witness : string;

    @Column()
    FileUpload : string;
    


//    @ManyToOne(()=> vicEntity)
//    victim: vicEntity;
    /*@ManyToOne(()=> vicEntity,victim=>victim.postcom)
    victim: vicEntity;
    */
}