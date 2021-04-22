// ข้อมูลผู้ใช้งาน
export interface Account {
    username: String;
    password: String;
    // ข้อมูลส่วนตัวควรเก็บด้วยไหม
    // firstname: String;
    // lastname: String;
    // phone_number: String;
    // role: RoleAccount;
}

// ข้อมูลเอกสารทั้งใบแจ้งหนี้และใบเสร็จ
export interface FinancialDocument {
    id_mongo: String;
    id_document: String;
    name_document: String;
    flag_status: FlagStatus;
    role: RoleDocument; 
    date_created: Date;
    date_receipted: Date;
    generate_by: String;
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
    //รอหาพี่เผา
}
 