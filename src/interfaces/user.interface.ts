import { Document } from "mongoose";
import { InAccount} from './app.interface'

export interface UserDocument extends InAccount, Document {

}