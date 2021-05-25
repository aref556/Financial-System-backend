import { Controller, Delete, Get, UseGuards, Query, Param, Headers } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ParamDocumentModel } from "src/models/document.model";
import { SearchModel } from "src/models/search.model";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { DocumentService } from "src/services/document.service";

@Controller('api/document')
@UseGuards(AuthGuard('jwt'))
export class DocumentController {
    constructor(
        private service: DocumentService,
    ){ }
    
    //แสดงข้อมูลรายการเอกสาร
    @Get()
    showDocument(@Query(new ValidationPipe()) query: SearchModel) {
        query.startPage = parseInt(query.startPage as any);
        query.limitPage = parseInt(query.limitPage as any);
        return this.service.getDocumentItems(query);
    }

    @Get(`:id`)
    showDocumentById(@Param(new ValidationPipe()) param: ParamDocumentModel) {
        return this.service.getDocumentItem(param.id);
    }

    @Delete(`:id`)
    deleteDocument(@Param(new ValidationPipe()) param: ParamDocumentModel) {

        return this.service.deleteDocumentItem(param.id);
    }

}