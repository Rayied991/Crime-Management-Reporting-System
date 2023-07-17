
import { Module } from "@nestjs/common";
import { ManagerService } from "./manager.service";
import { ManagerController } from "./manager.controller";
import { InvestigationTeamEntity, ManagerEntity, NoticePostEntity, SafetyPostEntity, managerProfile } from "./manager.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import{ MailerModule } from "@nestjs-modules/mailer";




@Module({
    imports:[ MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
                   port: 465,
                   ignoreTLS: true,
                   secure: true,
                   auth: {
                       user: 'shahriar.rafi31@gmail.com',
                       pass: 'lpswpowdwluiskac'
                   },
                  }
      }),


    TypeOrmModule.forFeature([ManagerEntity,NoticePostEntity,managerProfile,SafetyPostEntity,InvestigationTeamEntity]),],
    controllers:[ManagerController],
    providers:[ManagerService]
})
export class ManagerModule{}