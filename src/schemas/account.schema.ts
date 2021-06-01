import { Schema } from "mongoose";

export const accountSchema = new Schema({
    //หมายเลขของ mongo
    id: String,

    //ส่วนของบัญชีผู้ใช้งาน
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    phone_number: String,
    role: Number,
    created_time: {
        type: Date,
        default: Date.now
    },
    position: String,

})