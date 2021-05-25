import { InDocuments } from "./document.interface";

// ข้อมูลผู้ใช้งาน
export interface InAccount {
    username: string;
    password: string;
    // ข้อมูลส่วนตัวควรเก็บด้วยไหม
    firstname: string;
    lastname: string;
    phone_number: string;
    role: RoleAccount;
    id?: any;
}

// ข้อมูลเอกสารทั้งใบแจ้งหนี้และใบเสร็จ อาจจะไม่เอา
export interface InFinancialDocument {
    id_mongo: string;
    id_document: string;
    name_document: string;
    flag_status: FlagStatus;
    role: RoleDocument; 
    date_created: Date;
    date_receipted: Date;
    generate_by: string;

    address_id: string;
    email_1: string;
    email_2: string;
    address_target:string;
    condition_prize: string;
    //เอกสารใบแจ้งหนี้
    address: string;
    payment_due: number;
    guarantee: number;
    product_detail_1: string;
    product_number_1: number;
    product_prize_1: number;
    product_detail_2: string;
    product_number_2: number;
    product_prize_2: number;
    product_total_prize: number;
    date: Date;
    forwarder: string;
    type: RoleDocument;
    created_by: string;
    forwarder_position: string;
}

// ข้อมูลการสร้างไฟล์ทางการเงิน
export interface InInvoiceDocument {
    type: string;
    address: string;
    address_option: string;
    date: string;
    title: string;
    title_to: string;
    message_start: string;
    id_tax: string;
    message_end: string;
    manager_name: string;
    manager_position: string;
    flag_status: FlagStatus;

}

// ข้อมูลการสร้างไฟล์ใบแจ้งหนี้
export interface InInvoice {
    address: string;
    payment_due: number;
    guarantee: number;
    product_detail: string;
    product_number: number;
    product_prize: number;
    product_total_prize: number;
    date: Date;
    type: number;
    forwarder: string;
    forwarder_position: string;
    flag_status: FlagStatus;

}

// ข้อมูลใบส่งของ 
export interface InDelivery {
    date: string;
    address: string;
    payment_due: number;
    prize_stand: number;
    guarantee: number;
    product_detail: string;
    product_number: number;
    product_prize: number;
    type: number;
    forwarder: string;
    forwarder_position: string;
    flag_status: FlagStatus;
}

// ข้อมูลบันทึกข้อความ 
export interface InMessageMemos {
    id_doc: string;
    date: string;
    title: string;
    title_to: string;
    address: string;
    message: string;
    type: number;
    guarantor: string;
    guarantor_position: string;
    flag_status: FlagStatus;
}

// export interface InDocument {
//     id: string;
//     type: RoleDocument;
//     address: string;
//     payment_due: string,
//     guarantee: number;
//     product_detail: string;
//     product_number: number;
//     product_prize: number;
//     product_total_prize: number;
//     date: string;
//     forwarder: string;
//     forwarder_position: string;

//     id_doc: string;
//     title: string;
//     title_to: string;
//     message: string;
//     guarantor: string;
//     guarantor_position: string;

//     prize_stand: number;

//     created_by: string;
//     created_time: string;
//     success_time: string,
//     flag_status: FlagStatus,

// }

export interface InDocumentList {
    items: InDocuments[];
    totalItems: number;
}



export interface InDocumentSearch {
    searchText?: string;
    searchType?: string;

    startPage: number;
    limitPage: number;
}

export interface InDocumentSearchKey {
    key: string;
    value: string;
}



// ข้อมูลการแสดงสภานะการดำเนินงาน
export enum FlagStatus {
    Pending = 1,
    Success = 2,
}

//ข้อมูลประเภทของผู้ใช้
export enum RoleAccount {
    Admin = 1,
    SuperAdmin = 2

}

//ข้อมูลปรเภทของเอกสารแจ้งการชำระเงิน
export enum RoleDocument {
    Invoice = 1,
    InvoiceDocument = 2,
    Delivery = 3,
    MessageMemos = 4,
}


 