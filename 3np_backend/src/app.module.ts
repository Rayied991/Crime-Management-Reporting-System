import { Module } from '@nestjs/common';
import { VicModule } from './Victim/victim.module';

//import { UserController } from './user.controller';
//import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { AdminModule } from './admin/adminmodule.module';
//import { ManagerModule } from './manager/manager.module';

@Module({
  imports: [VicModule, TypeOrmModule.forRoot(
    { type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'CMRS',//Change to your database name
    autoLoadEntities: true,
    synchronize: true,
    } ),
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
