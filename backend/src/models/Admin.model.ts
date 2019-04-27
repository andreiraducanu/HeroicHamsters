import { prop, Typegoose } from 'typegoose';
import * as mongoose from 'mongoose';

export class Admin extends Typegoose {
    @prop({ required: true, unique: true, trim: true, default: 'admin', minlength: 2 })
    username: string;

    @prop({ required: true, trim: true, default: 'admin', minlength: 5 })
    password: string;

    @prop({ required: true, trim: true, default: 'admin', minlength: 2 })
    name: string;
}

export const AdminModel = new Admin().getModelForClass(Admin, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'admins' },
});

export default AdminModel;
