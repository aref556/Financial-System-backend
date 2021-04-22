import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "src/interfaces/user.interface";

@Injectable()
export class UserService {
    constructor(@InjectModel('App') private UserCollectionL: Model<UserDocument>) { }

    // สร้างฟอร์มตามประเภท

    // ลบฟอร์ม

    // แก้ไขฟอร์ม

    // โหลดฟอร์ม

    // เคลียร์รายการการชำระเงินที่ receipted

}