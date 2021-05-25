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
    AppController,
    AccountController,
    UserController,
    DocumentController,
  ],
  providers: [
    AppService,
    UserService,
    PdfService,
    AccountService,
    DocumentService,
    JwtAuthenService,
    JwtAuthenStrategy,
  ],
})
export class AppModule { }
