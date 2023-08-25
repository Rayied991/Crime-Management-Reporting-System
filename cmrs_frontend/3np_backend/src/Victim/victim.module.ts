import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";


//import { PoliceEntity } from "src/PostComplain/Postcom.entity";
import { VicController } from "./victim.controller";
import {  VictimEntity } from "./victim.entity";
//import { AdminEntity } from "./victim.entity";
import { VicService } from "./victim.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { PostComplain } from "./Postcom.entity";
import { UpEvidence } from "./UploadEvi";
import { CrimeStatusEntity } from "./CrimeStatus";




@Module({
    imports: [  MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
                 port: 465,
                 ignoreTLS: true,
                 secure: true,
                 auth: {
                     user: 'sarkarmagdalene3@gmail.com',
                     pass: 'hidden'
                 },
                }
    }),
      TypeOrmModule.forFeature([VictimEntity,PostComplain,UpEvidence,CrimeStatusEntity]),],
    controllers: [VicController],
    providers: [VicService],
  })
  export class VicModule {}

  //scrincronization development server production server 