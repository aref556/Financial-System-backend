import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { AppController } from './controllers/app.controller';
import { AccountService } from './services/account.service';
import { AppService } from './services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controller';
import { JwtAuthenService, JwtAuthenStrategy } from './services/jwt-authen.service';
import { accountSchema } from './schemas/account.schema';
import { UserService } from './services/user.service';
import { PdfService } from './services/pdf.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/psu_financial_system_db'),
    MongooseModule.forFeature([
      { name: 'accounts', schema: accountSchema },
    ]),
  ],
  controllers: [
    AppController,
    AccountController,
    UserController,
  ],
  providers: [
    AppService,
    UserService,
    PdfService,
    AccountService,
    JwtAuthenService,
    JwtAuthenStrategy,
  ],
})
export class AppModule { }
