import { pre, prop, Typegoose, Ref } from 'typegoose';
import * as mongoose from 'mongoose';

import { Quantity } from './Quantity.model';

enum Status {
    OPEN = 'open',
    CLOSED = 'closed',
}

@pre<Notification>('save', function(next) {
    if (this.creationTime === undefined)
        this.creationTime = new Date(Date.now()).toLocaleString('en-GB', { timeZone: 'UTC' });
    next();
})
export class Notification extends Typegoose {
    @prop({ required: true, ref: Quantity })
    quantity: Ref<Quantity>;

    @prop({ required: true, default: undefined })
    creationTime: string;

    @prop({ required: true, enum: Status, default: Status.OPEN })
    status: Status;
}

export const NotificationModel = new Notification().getModelForClass(Notification, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'notifications' },
});

export default NotificationModel;
