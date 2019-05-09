import { prop, Typegoose, Ref, pre } from 'typegoose';
import * as mongoose from 'mongoose';

import { Element } from './Element.model';
import { Station } from './Station.model';

import { MessageType } from '../utils/Enums';

@pre<Message>('save', function(next) {
    if (this.itemId == undefined) throw 'MessageModel: itemId not set';
    if (this.stationId == undefined) throw 'MessageModel: stationId not set';
    if (this.createdAt == undefined) this.createdAt = new Date(Date.now()).toLocaleString('en-GB');

    next();
})
export class Message extends Typegoose {
    @prop({ required: true, ref: Element })
    itemId: Ref<Element>;

    @prop({ required: true, ref: Station })
    stationId: Ref<Station>;

    @prop({ required: true, enum: MessageType })
    type: MessageType;

    @prop({ required: true, minlength: 5 })
    content: string;

    @prop()
    createdAt: string;
}

export const MessageModel = new Message().getModelForClass(Message, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'messages' },
});

export default MessageModel;
