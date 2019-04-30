import { prop, Typegoose, Ref, pre } from 'typegoose';
import * as mongoose from 'mongoose';

import { Location } from './Location.model';
import { Item } from './Item.model';

import { MessageType, Status } from '../utils/Enums';

@pre<Message>('save', function(next) {
    if (this.location == undefined) throw 'MessageModel: location not set';
    if (this.creationTime == undefined) this.creationTime = new Date(Date.now()).toLocaleString('en-GB');
    if (this.type == undefined) this.type = MessageType.ADMIN;
    if (this.status == undefined) this.status = Status.OPEN;

    next();
})
export class Message extends Typegoose {
    @prop({ enum: MessageType })
    type: MessageType;

    @prop({ required: true, ref: Location })
    location: Ref<Location>;

    @prop({ required: true, minlength: 5 })
    description: string;

    @prop({ ref: Item })
    item?: Ref<Item>;

    @prop()
    creationTime: string;

    @prop({ enum: Status })
    status: Status;
}

export const MessageModel = new Message().getModelForClass(Message, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'messages' },
});

export default MessageModel;
