import { Module } from "@nestjs/common";
import { AdminService } from "./Admin.service";
import { AdminEntity, Adminprofile } from "./Admin.entity";
import { VictimEntity } from "src/Victim/victim.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagerEntity } from "src/Manager/manager.entity";
import { AdminController } from "./Admin.controller";
import { MailerModule } from "@nestjs-modules/mailer";
import { PRegistrationEntity } from "src/Police/police.entity";


@Module({
    imports:[
        MailerModule.forRoot({
            transport: {
            host: 'smtp.gmail.com',
            port: 465,
            ignoreTLS: true,
            secure: true,
            auth: {
            user: 'hussainrayied9@gmail.com',
            pass: 'hidden'
            },
            }}),
        
        TypeOrmModule.forFeature([AdminEntity,Adminprofile,ManagerEntity,VictimEntity,PRegistrationEntity]),],
    controllers:[AdminController],
    providers:[AdminService]
})
export class AdminModule{}