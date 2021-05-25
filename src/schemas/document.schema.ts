import { Schema } from "mongoose";

export const documentSchema = new Schema({
    id: String,
    type: Number,
    address: String,
    payment_due: String,
    guarantee: Number,
    product_detail_1: String,
    product_number_1: Number,
    product_prize_1: Number,
    product_detail_2: String,
    product_number_2: Number,
    product_prize_2: Number,
    product_total_prize: Number,
    date: String,
    forwarder: String,
    forwarder_position: String,

    id_doc: String,
    title: String,
    title_to: String,
    message: String,
    guarantor: String,
    guarantor_position: String,

    prize_stand: Number,

    created_by: String,
    created_time: {
        type: Date,
        default: Date.now
    },
    success_time: Date,
    flag_status: Number,


})