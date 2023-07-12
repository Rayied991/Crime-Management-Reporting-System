import { Module } from "@nestjs/common";
// import { AdminService } from "./Admin.service";
// import { AdminController } from "./Admin.controller";
import { AdminEntity, Adminprofile } from "./Admin.entity";
import { VictimEntity } from "src/Victim/victim.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagerEntity } from "src/Manager/manager.entity";
import { PoliceEntity } from "src/Police/police.entity";

@Module({
    imports:[TypeOrmModule.forFeature([AdminEntity,Adminprofile,ManagerEntity,VictimEntity,PoliceEntity]),],
    // controllers:[AdminController],
    // providers:[AdminService]
})
export class AdminModule{}