import { PoliceService } from './Police/police.service';
import { PoliceModule } from './Police/police.module';
import { PoliceController } from './Police/police.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PoliceModule,],
  controllers: [AppController
    ],
  providers: [
     AppService],
})
export class AppModule { }
