/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PoliceController } from './police.controller';
import { PoliceService } from './police.service';

@Module({
    imports: [],
    controllers: [PoliceController],
    providers: [PoliceService],
})
export class PoliceModule {}
