import { Module } from "@nestjs/common";
import { AdminService } from "./Admin.service";
import { VictimEntity } from "src/Victim/victim.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagerEntity } from "src/Manager/manager.entity";
import { AdminController } from "./Admin.controller";
import { MailerModule } from "@nestjs-modules/mailer";
import { PRegistrationEntity } from "src/Police/police.entity";
import { AdminEntity, OTPEntity } from "./Admin.entity";


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
            pass: 'rsgqaqbjikwesfnt'
            },
            }}),
        
        TypeOrmModule.forFeature([AdminEntity,OTPEntity,ManagerEntity,VictimEntity,PRegistrationEntity]),],
    controllers:[AdminController],
    providers:[AdminService]
})
export class AdminModule{}
