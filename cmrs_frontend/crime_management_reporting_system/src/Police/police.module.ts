/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PoliceController } from './police.controller';
import { PoliceService } from './police.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrimeStatusEntity, PRegistrationEntity, Wantedlist1Entity, Wantedlist2Entity } from './police.entity';
import { MailerModule } from "@nestjs-modules/mailer";
import { PostComplain } from './Postcom.entity';

@Module({
    imports: [
            MailerModule.forRoot({
                transport: {
                  host: 'smtp.gmail.com',
                           port: 465,
                           ignoreTLS: true,
                           secure: true,
                           auth: {
                               user: 'Enter Your email',
                               pass: 'Enter Your Passward'
                           },
                          }
              }),
              TypeOrmModule.forFeature([PRegistrationEntity,Wantedlist1Entity,Wantedlist2Entity,CrimeStatusEntity,PostComplain]),],
    controllers: [PoliceController],
    providers: [PoliceService],
})
export class PoliceModule {}
