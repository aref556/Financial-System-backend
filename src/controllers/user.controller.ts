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
    // แสดงข้อมูลรายการการชำระเงิน

    // สร้างเอกสารการเงิน
    @Post('create-documents')
    createFinancialDocument(@Body(new ValidationPipe) body: InFinancialDocument, @Req() req:Request) {
        // console.log(body);
        // console.log(req.user);
        // console.log(req.user['username']);
        body.created_by = req.user['username'];
        return this.service.onCreateDocument(body);
    }

    //สร้างใบแจ้งหนี้
    @Post('create-invioce')
    createInvioce(@Body(new ValidationPipe) body: InvoiceModel, @Req() req:Request) {
        // console.log(body);
        // console.log(req.user);
        // console.log(req.user['username']);
        return this.service.onCreateInvoice(body, req.user['username']);
    }

    //สร้างใบส่งของ
    @Post('create-delivery')
    createDelivery(@Body(new ValidationPipe) body: DeliveryModel, @Req() req:Request) {
        // console.log(body);
        // console.log(req.user);
        // console.log(req.user['username']);
        return this.service.onCreateDelivery(body, req.user['username']);
    }

    // สร้างเอกสารแจ้งหนี้
    @Post('create-invioce-document')
    createInvioceDocument(@Body(new ValidationPipe) body: InvoiceDocumentModel, @Req() req:Request) {
        // console.log(body);
        // console.log(req.user);
        // console.log(req.user['username']);
        return this.service.onCreateInvoiceDocument(body, req.user['username']);
    }

    // สร้างบันทึกข้อความ
    @Post('create-message-memos')
    createMessageMemos(@Body(new ValidationPipe) body: MessageMemosModel, @Req() req:Request) {
        // console.log(body);
        // console.log(req.user);
        // console.log(req.user['username']);
        return this.service.onCreateMessageMemos(body, req.user['username']);
    }

    //เก็บข้อมูล
    @Get('data')
    getUserLogin(@Req() req: Request) {
        const userLogin: InUserDocument = req.user as any;
        // console.log(req);
        userLogin.password = '';
        return userLogin;
        // return req;

    }



}
