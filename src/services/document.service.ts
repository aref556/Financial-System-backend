import { BadRequestException, Injectable } from "@nestjs/common";
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
        console.log('onCreateDocument');
        let model: InFinancialDocument = body;
        try {
            const modelItem = await this.DocCollection.create(model);
            modelItem.id = modelItem._id;
            const modelItem2 = await this.DocCollection.create(modelItem);
            return modelItem2;

        } catch (err) {
            throw new BadRequestException(err.message);
        }


    }
    // สร้างใบส่งของ
    async onCreateDelivery(body: InDelivery, created_by: string) {
        console.log('onCreateDelivery');
        const model: InDelivery = body;

        try {
            const modelItem = await this.DocCollection.create(model);
            modelItem.id = modelItem._id;
            modelItem.created_by = created_by;
            modelItem.flag_status = 1;
            const modelItem2 = await this.DocCollection.create(modelItem);
            return modelItem2;

        } catch (err) {
            throw new BadRequestException(err.Message);
        }

    }

    // สร้างใบแจ้งหนี้
    async onCreateInvoice(body: InInvoice, created_by: string) {
        console.log('onCreateInvoice');
        const model: InInvoice = body;

        try {
            const modelItem = await this.DocCollection.create(model);
            modelItem.id = modelItem._id;
            modelItem.created_by = created_by;
            modelItem.flag_status = 1;
            const modelItem2 = await this.DocCollection.create(modelItem);
            return modelItem2;
        } catch (err) {
            throw new BadRequestException(err.Message);
        }

    }

    // สร้างเอกสารแจ้งหนี้
    async onCreateInvoiceDocument(body: InInvoiceDocument, created_by: string) {
        console.log('onCreateInvoiceDocument');
        const model: InInvoiceDocument = body;

        try {
            const modelItem = await this.DocCollection.create(model);
            modelItem.id = modelItem._id;
            modelItem.created_by = created_by;
            modelItem.flag_status = 1;
            const modelItem2 = await this.DocCollection.create(modelItem);
            return modelItem2;

        } catch (err) {
            throw new BadRequestException(err.Message);

        }

    }

    // สร้างเอกสารบันทึกข้อความ
    async onCreateMessageMemos(body: InMessageMemos, created_by: string) {
        console.log('onCreateMessageMemos');
        const model: InMessageMemos = body;

        try {
            const modelItem = await this.DocCollection.create(model);
            modelItem.id = modelItem._id;
            modelItem.created_by = created_by;
            modelItem.flag_status = 1;
            const modelItem2 = await this.DocCollection.create(modelItem);
            return modelItem2;
        } catch (err) {
            throw new BadRequestException(err.Message);
        }


    }

    // แสดงข้อมูลเอกสาร
    async getDocumentItems(searchOption: InDocumentSearch): Promise<InDocumentList> {
        console.log('getDocumentItems');
        try {
            let queryItemFunction = () => this.DocCollection.find({}, { _id: false });

            //ส่วนของการค้นหา
            if (searchOption.searchText && searchOption.searchType) {
                const text = searchOption.searchText;
                const type = searchOption.searchType;
                const conditions = {};
                switch (type) {
                    case 'type':
                        conditions[type] = `${text}`;
                        queryItemFunction = () => this.DocCollection.find(conditions, { _id: false });
                        break;
                    case 'updated':
                        queryItemFunction = () => this.DocCollection.find({
                            updated: {
                                $gt: text['from'],
                                $lt: text['to']
                            },
                            type: 1,
                        }, { _id: false });
                        break;
                    default:
                        conditions[type] = new RegExp(text, 'i');
                        queryItemFunction = () => this.DocCollection.find(conditions);
                        break;
                }
            }

            // แบ่งหน้าเพจ
            const items = await queryItemFunction()
                .sort({ updated: -1 })
                .skip((searchOption.startPage - 1) * searchOption.limitPage)
                .limit(searchOption.limitPage);
            //ผลรวมของรายการเอกสารทั้งหมด
            const totalItems = await queryItemFunction().countDocuments({});

            return { items, totalItems };
        } catch (err) {
            throw new BadRequestException(err.Message);

        }

    }

    //แสดงข้อมูลเอกสารเดี่ยว
    async getDocumentItem(documentID: any) {
        console.log('getDocumentItem');
        try {
            const documentItem = await this.DocCollection.findById(documentID);
            return documentItem;
        } catch (err) {
            throw new BadRequestException(err.Message);
        }
    }

    //ลบข้อมูลรายการเอกสาร
    async deleteDocumentItem(documentID: any) {
        console.log('deleteDocumentItem');
        try {
            // console.log( 'type: '+ typeof documentID + ' value:' +  documentID)
            return await this.DocCollection.deleteOne({ id: documentID });

        } catch (err) {
            throw new BadRequestException(err.Message);

        }

    }

    async updateFlagStatus(documentID: any) {
        const documentUpdate = await this.DocCollection.findById(documentID);
        if (!documentUpdate) throw new BadRequestException('ไม่มีข้อมูลนี้ในระบบ');
        try {
            return await this.DocCollection.updateOne({ id: documentID }, { flag_status: 2 });
        } catch (err) {
            throw new BadRequestException(err.message);
        }

    }



}