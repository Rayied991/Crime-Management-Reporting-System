import { Module } from '@nestjs/common';
import { AdminModule } from './Admin/Admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [AdminModule,TypeOrmModule.forRoot({ 
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
