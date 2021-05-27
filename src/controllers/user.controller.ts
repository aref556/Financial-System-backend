import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { InFinancialDocument, InInvoice } from "src/interfaces/app.interface";
import { InUserDocument } from "src/interfaces/user.interface";
import { UserService } from "src/services/user.service";
import { Request } from 'express';
import { AuthGuard } from "@nestjs/passport";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { InvoiceModel } from "src/models/invoice.model";
import { DeliveryModel } from "src/models/delivery.model";
import { InvoiceDocumentModel } from "src/models/invoice-document.model";
import { MessageMemosModel } from "src/models/message-memos.model";

@Controller(`api/user`)
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(
        private service: UserService,
    ) { }

    //เก็บข้อมูล
    @Get('data')
    getUserLogin(@Req() req: Request) {
        console.log('Method: Post');
        console.log('path: api/document/create-message-memos');
        console.log('function: createMessageMemos');

        return this.service.getUserLogin(req.user as any);

    }



}
