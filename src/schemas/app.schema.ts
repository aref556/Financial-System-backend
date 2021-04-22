import { Schema } from "mongoose";

export const appSchema = new Schema({
    //หมายเลขของ mongo
    id: String,

    //ส่วนของบัญชีผู้ใช้งาน
    username: String,
    password: String,

    //ส่วนของเอกสาร
    id_document: String,
    name_document: String,
    flag_status: Number,
    date_create: Date,
    date_receipted: Date,
    genarated_by: String,



})