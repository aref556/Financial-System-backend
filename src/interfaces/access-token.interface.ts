import { Document } from 'mongoose';

export interface AccessTokenDocument extends Document {
    userID: any;
    accessToken: string;
    exprise: Date;
    created: Date;
}