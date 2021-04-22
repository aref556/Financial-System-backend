import { Controller, Post } from "@nestjs/common";
import { LoginModel } from "src/models/login.model";
import { AccountService } from "src/services/account.service";

@Controller('api/account')
export class AccountController {
    constructor(
        private service: AccountService,
    ) { }

    // เข้่าสู่ระบบ
    @Post('login')
    login( body: LoginModel) {
        return this.service.onLogin(body)    
    }

}