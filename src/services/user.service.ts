import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { InAccount, InProfile } from "src/interfaces/app.interface";
import { InUserDocument } from "src/interfaces/user.interface";


@Injectable()
export class UserService {
    constructor(
        @InjectModel('accounts') private UserCollection: Model<InUserDocument>,
    ) { }

    //เก็บข้อมูลของผู้ใช้
    async getUserLogin(user: any) {
        console.log('getUserLogin');
        try {
            const userLogin: InUserDocument = user;
            userLogin.password = '';
            return userLogin;

        } catch (err) {
            throw new BadRequestException(err.Message);
        }


    }

    //อัพเดทโปรไฟล์
    async updateUserProfile(userID: string, body: InProfile) {
        console.log('updateUserProfile');
        const updated = await this.UserCollection.updateMany({ _id: userID }, {
            firstname: body.firstname,
            lastname: body.lastname,
            username: body.username,
            position: body.position,
        });
        console.log('updated : ' + updated.nModified);
        if (!updated.nModified)
            throw new BadRequestException('ข้อมูลโปรไฟล์ไม่มีการเปลี่ยนแปลง');
        const userItem = await this.UserCollection.findById(userID, {
            password: false,
            _id: false,
        });

        return userItem;



    }




}