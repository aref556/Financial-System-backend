import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { InDelivery, InFinancialDocument, InInvoice, InInvoiceDocument, InMessageMemos } from "src/interfaces/app.interface";
import { InDocuments } from "src/interfaces/document.interface";
import { InUserDocument } from "src/interfaces/user.interface";


@Injectable()
export class UserService {
    constructor(
        @InjectModel('accounts') private UserCollection: Model<InUserDocument>,
        @InjectModel('documents') private DocCollection: Model<InDocuments>,
        // private service: PdfService,
    ) { }

    // ลบฟอร์ม

    // แก้ไขฟอร์ม

    // โหลดฟอร์ม

    // เคลียร์รายการการชำระเงินที่ receipted

    // สร้างเอกสารทางการเงิน
    async onCreateDocument(body: InFinancialDocument) {
        let model: InFinancialDocument = body;
        const modelItem = await this.DocCollection.create(model);
        modelItem.id = modelItem._id;
        const modelItem2 = await this.DocCollection.create(modelItem);
        return modelItem2;

    }
    // สร้างใบส่งของ
    async onCreateDelivery(body: InDelivery, created_by: string) {
        const model: InDelivery = body;
        const modelItem = await this.DocCollection.create(model);
        modelItem.id = modelItem._id;
        modelItem.created_by = created_by;
        modelItem.flag_status = 1;
        const modelItem2 = await this.DocCollection.create(modelItem);
        return modelItem2;
    }

    // สร้างใบแจ้งหนี้
    async onCreateInvoice(body: InInvoice, created_by: string) {
        const model: InInvoice = body;
        const modelItem = await this.DocCollection.create(model);
        modelItem.id = modelItem._id;
        modelItem.created_by = created_by;
        modelItem.flag_status = 1;
        const modelItem2 = await this.DocCollection.create(modelItem);
        return modelItem2;
    }

    // สร้างเอกสารแจ้งหนี้
    async onCreateInvoiceDocument(body: InInvoiceDocument, created_by: string) {
        const model: InInvoiceDocument = body;
        const modelItem = await this.DocCollection.create(model);
        modelItem.id = modelItem._id;
        modelItem.created_by = created_by;
        modelItem.flag_status = 1;
        const modelItem2 = await this.DocCollection.create(modelItem);
        return modelItem2;
    }

    // สร้างเอกสารบันทึกข้อความ
    async onCreateMessageMemos(body: InMessageMemos, created_by: string) {
        const model: InMessageMemos = body;
        const modelItem = await this.DocCollection.create(model);
        modelItem.id = modelItem._id;
        modelItem.created_by = created_by;
        modelItem.flag_status = 1;
        const modelItem2 = await this.DocCollection.create(modelItem);
        return modelItem2;

    }

}