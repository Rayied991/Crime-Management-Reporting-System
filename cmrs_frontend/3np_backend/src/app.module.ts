import { Module } from '@nestjs/common';
import { ManagerModule } from './Manager/manager.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ManagerModule,TypeOrmModule.forRoot({ 
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'CMRS',
  autoLoadEntities: true,
  synchronize: true,
  } ),],
  controllers: [],
  providers: [],
})
export class AppModule {}

