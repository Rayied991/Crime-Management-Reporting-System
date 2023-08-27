import { PoliceService } from './Police/police.service';
import { PoliceModule } from './Police/police.module';
import { PoliceController } from './Police/police.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PoliceModule,TypeOrmModule.forRoot(
      { type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'marmita', //Change to your Password
      database: 'CMRS',
      autoLoadEntities: true,
      synchronize: true,
      } )],
  controllers: [AppController
    ],
  providers: [
     AppService],
})
export class AppModule { }
