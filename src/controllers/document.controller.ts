import { Controller, Delete, Get, UseGuards, Query, Param, Put, Body, Post, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InFinancialDocument } from "src/interfaces/app.interface";
import { DeliveryModel } from "src/models/delivery.model";
import { ParamDocumentModel } from "src/models/document.model";
import { InvoiceDocumentModel } from "src/models/invoice-document.model";
import { InvoiceModel } from "src/models/invoice.model";
import { MessageMemosModel } from "src/models/message-memos.model";
import { SearchModel } from "src/models/search.model";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { DocumentService } from "src/services/document.service";
import { Request } from 'express';

@Controller('api/document')
@UseGuards(AuthGuard('jwt'))
export class DocumentController {
    constructor(
        private service: DocumentService,
    ) { }
    // สร้างเอกสารการเงิน
    @Post('create-documents')
    createFinancialDocument(@Body(new ValidationPipe) body: InFinancialDocument, @Req() req: Request) {
        console.log('Method: Post');
        console.log('path: api/document/create-documents');
        console.log('function: createFinancialDocument');
        // console.log(body);
        // console.log(req.user);
        // console.log(req.user['username']);
        body.created_by = req.user['firstname'];
        return this.service.onCreateDocument(body);
    }

    //สร้างใบแจ้งหนี้
    @Post('create-invioce')
    createInvioce(@Body(new ValidationPipe) body: InvoiceModel, @Req() req: Request) {
        console.log('Method: Post');
        console.log('path: api/document/create-invioce');
        console.log('function: createInvoice');
        // console.log(body);
        // console.log(req.user);
        // console.log(req.user['username']);
        return this.service.onCreateInvoice(body, req.user['firstname']);
    }

    //สร้างใบส่งของ
    @Post('create-delivery')
    createDelivery(@Body(new ValidationPipe) body: DeliveryModel, @Req() req: Request) {
        console.log('Method: Post');
        console.log('path: api/document/create-delivery');
        console.log('function: createDelivery');
        // console.log(body);
        // console.log(req.user);
        // console.log(req.user['username']);
        return this.service.onCreateDelivery(body, req.user['firstname']);
    }

    // สร้างเอกสารแจ้งหนี้
    @Post('create-invioce-document')
    createInvioceDocument(@Body(new ValidationPipe) body: InvoiceDocumentModel, @Req() req: Request) {
        console.log('Method: Post');
        console.log('path: api/document/create-invioce-document');
        console.log('function: createInvoiceDocument');
        // console.log(body);
        // console.log(req.user);
        // console.log(req.user['username']);
        return this.service.onCreateInvoiceDocument(body, req.user['firstname']);
    }

    // สร้างบันทึกข้อความ
    @Post('create-message-memos')
    createMessageMemos(@Body(new ValidationPipe) body: MessageMemosModel, @Req() req: Request) {
        console.log('Method: Post');
        console.log('path: api/document/create-message-memos');
        console.log('function: createMessageMemos');
        // console.log(body);
        // console.log(req.user);
        // console.log(req.user['username']);
        return this.service.onCreateMessageMemos(body, req.user['firstname']);
    }

    //แสดงข้อมูลรายการเอกสาร
    @Get()
    showDocument(@Query(new ValidationPipe()) query: SearchModel) {
        console.log('Method: Get');
        console.log('path: api/document');
        console.log('function: showDocument');
        query.startPage = parseInt(query.startPage as any);
        query.limitPage = parseInt(query.limitPage as any);
        return this.service.getDocumentItems(query);
    }

    @Get(`:id`)
    showDocumentById(@Param(new ValidationPipe()) param: ParamDocumentModel) {
        console.log('Method: Get');
        console.log('path: api/document/:id');
        console.log('function: showDocumentById');
        return this.service.getDocumentItem(param.id);
    }

    @Delete(`:id`)
    deleteDocument(@Param(new ValidationPipe()) param: ParamDocumentModel) {
        console.log('Method: Delete');
        console.log('path: api/document/:id');
        console.log('function: deleteDocument');
        return this.service.deleteDocumentItem(param.id);
    }

    @Put(`handle-status/:id`)
    updateFlagStatus(@Param(new ValidationPipe()) param: ParamDocumentModel) {
        console.log('Method: Post');
        console.log('path: api/document/handle-status/:id');
        console.log('function: updateFlagStatus');
        return this.service.updateFlagStatus(param.id);
    }

    

}