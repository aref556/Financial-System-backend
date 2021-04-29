// ข้อมูลผู้ใช้งาน
export interface InAccount {
    username: string;
    password: string;
    // ข้อมูลส่วนตัวควรเก็บด้วยไหม
    firstname: string;
    lastname: string;
    phone_number: string;
    role: RoleAccount;
}

// ข้อมูลเอกสารทั้งใบแจ้งหนี้และใบเสร็จ
export interface InFinancialDocument {
    id_mongo: string;
    id_document: string;
    name_document: string;
    flag_status: FlagStatus;
    role: RoleDocument; 
    date_created: Date;
    date_receipted: Date;
    generate_by: string;
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
 