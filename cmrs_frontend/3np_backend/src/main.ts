import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.use(
     session({
     secret: 'my-secret',
     resave: false,
     saveUninitialized: false,
   
     cookie:{
      secure:false,
      httpOnly:false,
      maxAge:60000
     }
     }),
    );
    app.enableCors({
      origin:true,
      methods:'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials:true ///if its false request rejected
    });
  await app.listen(3000);
}
bootstrap();

