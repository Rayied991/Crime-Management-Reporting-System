import { Module } from '@nestjs/common';
import { AdminModule } from './Admin/Admin.module';


@Module({
  imports: [AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
