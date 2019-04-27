import { prop, Typegoose, Ref, pre } from 'typegoose';
import * as mongoose from 'mongoose';

import { Quantity } from './Quantity.model';

enum Type {
    USER = 'user',
    ADMIN = 'admin',
}

@pre<Message>('save', function(next) {
    if (this.time === undefined) {
        this.time = new Date(Date.now()).toLocaleString('en-GB', { timeZone: 'UTC' });
    }
    next();
})
export class Message extends Typegoose {
    @prop({ required: true, ref: Quantity })
    Quantity: Ref<Quantity>;

    @prop({ required: true, minlength: 5 })
    description: string;

    @prop({ required: true, default: undefined })
    time: string;

    @prop({ required: true, enum: Type, default: Type.USER })
    type: Type;
}

export const MessageModel = new Message().getModelForClass(Message, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'messages' },
});

export default MessageModel;
