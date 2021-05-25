import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { InFinancialDocument, InDelivery, InInvoice, InInvoiceDocument, InMessageMemos, InDocumentSearch, InDocumentList } from "src/interfaces/app.interface";
import { InDocuments } from "src/interfaces/document.interface";

@Injectable()
export class DocumentService {
    constructor(
        @InjectModel('documents') private DocCollection: Model<InDocuments>,
    ) { }

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

    // แสดงข้อมูลเอกสาร
    async getDocumentItems(searchOption: InDocumentSearch): Promise<InDocumentList> {
        let queryItemFunction = () => this.DocCollection.find({}, {_id: false});
        
        //ส่วนของการค้นหา
        if (searchOption.searchText && searchOption.searchType) {
            const text = searchOption.searchText;
            const type = searchOption.searchType;
            const conditions = {};
            switch (type) {
                case 'type': 
                    conditions[type] = `${text}`;
                    queryItemFunction = () => this.DocCollection.find(conditions, { _id: false});
                    break;
                case 'updated':
                    queryItemFunction = () => this.DocCollection.find({
                        updated: {
                            $gt: text['from'],
                            $lt: text['to']
                        },
                        type: 1,
                    }, {_id: false});
                    break;
                default:
                    conditions[type] = new RegExp(text, 'i');
                    queryItemFunction = () => this.DocCollection.find(conditions);
                    break;
            }
        }

        // แบ่งหน้าเพจ
        const items = await queryItemFunction()
            .sort({updated: -1})
            .skip((searchOption.startPage -1) * searchOption.limitPage)
            .limit(searchOption.limitPage);
        //ผลรวมของรายการเอกสารทั้งหมด
        const totalItems = await queryItemFunction().countDocuments({});

        return { items, totalItems};
    }

    //แสดงขู้อมูลเอกสารเดี่ยว
    async getDocumentItem( documentID: any) {
        const documentItem = await this.DocCollection.findById(documentID);
        return documentItem;
    }

    //ลบข้อมูลรายการเอกสาร
    async deleteDocumentItem(documentID: any) {
        // console.log( 'type: '+ typeof documentID + ' value:' +  documentID)
        return await this.DocCollection.deleteOne({id: documentID});
    }

    

}