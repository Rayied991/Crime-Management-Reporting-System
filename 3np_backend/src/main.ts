import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.use(
     session({
     secret: 'my-secret',//The secret is used to sign the session ID cookie
     resave: false,//Enabling the resave option forces the session to be saved back to the session store.
     saveUninitialized: false,//Enabling the saveUninitialized option Forces a session that is "uninitialized" to be saved to the store.
    //session is uninitialized when it is new but not modified.
    //False is set for implementing login sessions, reducing server storage usage
     cookie:{
      maxAge:10000
     }
     }),
    );
    app.enableCors();
  await app.listen(3000);//can change the port to start the server 
}
bootstrap();//called and start from main function
