import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostComplain } from "src/PostComplain/Postcom.entity";

//import { PoliceEntity } from "src/PostComplain/Postcom.entity";
import { VicController } from "./victim.controller";
import {  vicEntity } from "./victim.entity";
//import { AdminEntity } from "./victim.entity";
import { VicService } from "./victim.service";
import { MailerModule } from "@nestjs-modules/mailer";



@Module({
    imports: [  MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
                 port: 465,
                 ignoreTLS: true,
                 secure: true,
                 auth: {
                     user: 'sarkarmagdalene3@gmail.com',
                     pass: 'fdojjuxwwqdumtzr'
                 },
                }
    }),
      TypeOrmModule.forFeature([vicEntity,PostComplain]),],
    controllers: [VicController],
    providers: [VicService],
  })
  export class VicModule {}

  //scrincronization development server production server 