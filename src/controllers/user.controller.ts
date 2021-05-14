import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { InInvoiceDocument } from "src/interfaces/app.interface";
import { InUserDocument } from "src/interfaces/user.interface";
import { UserService } from "src/services/user.service";
import { Request } from 'express';
import { AuthGuard } from "@nestjs/passport";

@Controller(`api/user`)
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(
        private service: UserService,
    ){ }
    // แสดงข้อมูลรายการการชำระเงิน

    // สร้างเอกสารการเงิน
    // เข้่าสู่ระบบ
    @Post('create-financial-document')
    createFinancialDocument(@Body() body: InInvoiceDocument) {
        // console.log(body);
        return this.service.onCreateFinancialDocument(body);
    }

    //เก็บข้อมูล
    @Get('data')
    getUserLogin(@Req() req: Request) {
        const userLogin: InUserDocument = req.user as any;
        // console.log(req);
        userLogin.password = '';
        return userLogin;
        // return req;

    }

    // @Get('data2')
    // getTest(@Req() req: Request){
    //     console.log(req.user);
    //     return "555";
    // }
    
    

}
