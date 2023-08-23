import { doc } from "prettier";
import { VictimEntity } from "src/Victim/victim.entity";
import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("Upload_Evidence")
export class UpEvidence{

// @PrimaryGeneratedColumn()
// EvidenceNo : number;

@PrimaryColumn({type: "varchar",length: 150})
VicEmail: string;

@Column()
Evidence_File: string;


@OneToOne(() => VictimEntity, upload => upload.victimfile)
    //@JoinColumn({name:"AdminId"})
    upload: "VictimEntity";


}