import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
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




}