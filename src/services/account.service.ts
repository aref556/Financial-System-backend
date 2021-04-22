import { Injectable } from "@nestjs/common";
import { Account } from '../interfaces/app.interface';

@Injectable()
export class AccountService {
    constructor() { }

    // เข้าสู่ระบบ
    async onLogin(body: Account) {

    }

    //ลืมรหัสผ่าน
    async onForgotPassword() {

    }

    //ลงทะเบียน


}