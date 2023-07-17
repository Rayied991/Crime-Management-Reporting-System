import { doc } from "prettier";
import { vicEntity } from "src/Victim/victim.entity";
import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("Upload_Evidence")
export class UpEvidence{

// @PrimaryGeneratedColumn()
// EvidenceNo : number;

@PrimaryColumn({type: "varchar",length: 150})
VicEmail: string;

@Column()
Evidence_File: string;


@OneToOne(() => vicEntity, upload => upload.victimfile)
    //@JoinColumn({name:"AdminId"})
    upload: "vicEntity";


}