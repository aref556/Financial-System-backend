import { UserDocument } from "./user.interface";

export interface Authenticated {
    generateAccessToken(user: UserDocument): Promise<string>;
    validateUser(accessToken): Promise<UserDocument>;
}