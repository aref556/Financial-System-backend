import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { AppController } from './controllers/app.controller';
import { AccountService } from './services/account.service';
import { AppService } from './services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { appSchema } from './schemas/app.schema';
import { UserController } from './controllers/user.controller';
import { JwtAuthenService, JwtAuthenStrategy } from './services/jwt-authen.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/app_db'),
    MongooseModule.forFeature([
      { name: 'App', schema: appSchema },
    ]),
  ],
  controllers: [
    AppController,
    AccountController,
    UserController,
  ],
  providers: [
    AppService,
    AccountService,
    JwtAuthenService,
    JwtAuthenStrategy,
  ],
})
export class AppModule { }
