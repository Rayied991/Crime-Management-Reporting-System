import { Module } from "@nestjs/common";
import { AdminService } from "./Admin.service";
import { AdminController } from "./Admin.controller";


@Module({
    imports:[AdminModule],
    controllers:[AdminController],
    providers:[AdminService]
})
export class AdminModule{}