import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controller';
import { JwtAuthenService, JwtAuthenStrategy } from './services/jwt-authen.service';
import { accountSchema } from './schemas/account.schema';
import { UserService } from './services/user.service';
import { documentSchema } from './schemas/document.schema';
import { DocumentController } from './controllers/document.controller';
import { DocumentService } from './services/document.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/psu_financial_system_db'),
    MongooseModule.forFeature([
      { name: 'accounts', schema: accountSchema },
      { name: 'documents', schema: documentSchema},
    ]),
  ],
  controllers: [
    AccountController,
    UserController,
    DocumentController,
  ],
  providers: [
    UserService,
    AccountService,
    DocumentService,
    JwtAuthenService,
    JwtAuthenStrategy,
  ],
})
export class AppModule { }
