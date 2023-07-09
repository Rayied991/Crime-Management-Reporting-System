import { Module } from "@nestjs/common";
import { AdminService } from "./Admin.service";
import { AdminController } from "./Admin.controller";
import { AdminEntity } from "./Admin.entity";
import { VictimEntity } from "src/Victim/victim.entity";

@Module({
    imports:[TypeOrmModule.forFeature([AdminEntity,VictimEntity]),],
    controllers:[AdminController],
    providers:[AdminService]
})
export class AdminModule{}