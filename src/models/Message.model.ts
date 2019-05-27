import { prop, Typegoose, Ref, pre } from 'typegoose';
import * as mongoose from 'mongoose';

import { Element } from './Element.model';
import { Station } from './Station.model';

import { MessageType } from '../utils/Enums';

@pre<Message>('save', function(next) {
    if (this.createdAt == undefined) this.createdAt = new Date(Date.now());

    next();
})
export class Message extends Typegoose {
    @prop({ required: true, ref: Element })
    elementId: Ref<Element>;

    @prop({ required: true, ref: Station })
    stationId: Ref<Station>;

    @prop({ required: true, enum: MessageType })
    type: MessageType;

    @prop({ required: true })
    content: string;

    @prop()
    createdAt: Date;
}

export const MessageModel = new Message().getModelForClass(Message, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'messages' },
});

export default MessageModel;
