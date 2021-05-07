import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { InInvoiceDocument } from "src/interfaces/app.interface";
import { InUserDocument } from "src/interfaces/user.interface";
// import { PdfService } from "./pdf.service";

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class UserService {
    constructor(
        @InjectModel('accounts') private UserCollectionL: Model<InUserDocument>,
        // private service: PdfService,
        ) { }

    // ลบฟอร์ม

    // แก้ไขฟอร์ม

    // โหลดฟอร์ม

    // เคลียร์รายการการชำระเงินที่ receipted

    // สร้างเอกสารทางการเงิน
    async onCreateFinancialDocument(body: InInvoiceDocument) {
        // this.service.generateInvoiceDocs(body);
    }

}