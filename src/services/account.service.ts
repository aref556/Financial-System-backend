import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "src/interfaces/user.interface";
import { InAccount } from '../interfaces/app.interface';
import { JwtAuthenService } from "./jwt-authen.service";
import { generate, verify } from 'password-hash'

@Injectable()
export class AccountService {
    constructor(
        private authenService: JwtAuthenService,
        @InjectModel('accounts') private UserCollection: Model<UserDocument>
    ) { }

    // เข้าสู่ระบบ
    async onLogin(body: InAccount) {
        const user = await this.UserCollection.findOne({ username: body.username });
        // console.log(user);
        if (!user) throw new BadRequestException('ไม่มีข้อมูลบัญชีผู้ใช้นี้ในระบบ');
        if (verify(body.password, user.password)) {
            const accessTokenGenerate = await this.authenService.generateAccessToken(user);
            // console.log(accessTokenGenerate);
            return { accessToken: accessTokenGenerate };
        }
        throw new BadRequestException('บัญชีผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }

    //ลงทะเบียน
    async onRegister(body: InAccount) {
        const count = await this.UserCollection.countDocuments({ username: body.username });
        if (count > 0) throw new BadRequestException('บัญชีนี้มีในระบบแล้ว');

        let model: InAccount = body;
        model.username = body.username;
        model.password = generate(model.password);
        model.firstname = '';
        model.lastname = '';
        model.phone_number = '';
        model.role = 1;

        const modelItem = await this.UserCollection.create(model);
        modelItem.password = '';
        return modelItem;

    }

}