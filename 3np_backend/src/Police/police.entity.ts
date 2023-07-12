import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("Police")
export class PoliceEntity{
    @PrimaryColumn()
    Username:string;

    @Column()
    Fname:string;
    @Column()
    Lname:string;
    @Column()
    Location:string;
    @Column()
    email:string;
    @Column()
    phonNum:number;
    @Column()
    Password:string;

    @Column()
    Profile_image:string;
}