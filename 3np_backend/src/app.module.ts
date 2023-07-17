import { Module } from '@nestjs/common';
import { AdminModule } from './Admin/Admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerModule } from './Manager/manager.module';
import { VicModule } from './Victim/victim.module';
import { PoliceModule } from './Police/police.module';


@Module({
  imports: [AdminModule,ManagerModule,VicModule,PoliceModule,TypeOrmModule.forRoot({ 
    type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '13042000',
  database: 'CMRS',
  autoLoadEntities: true,
  synchronize: true,
  } ),],
  controllers: [],
  providers: [],
})
export class AppModule {}
