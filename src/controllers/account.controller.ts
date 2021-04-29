import { Body, Controller, Post } from "@nestjs/common";
import { AccountModel } from "src/models/account.model";
import { AccountService } from "src/services/account.service";

@Controller('api/account')
export class AccountController {
    constructor(
        private service: AccountService,
    ) { }

    // เข้่าสู่ระบบ
    @Post('login')
    login(@Body() body: AccountModel) {
        return this.service.onLogin(body);
    }

    //ลงทะเบียน
    @Post('register')
    register(@Body() body: AccountModel) {
        return this.service.onRegister(body);
    }

}