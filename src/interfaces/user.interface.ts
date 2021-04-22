import { Document } from "mongoose";
import { Account} from './app.interface'

export interface UserDocument extends Account, Document {

}