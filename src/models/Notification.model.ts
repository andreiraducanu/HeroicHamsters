import { pre, prop, Typegoose, Ref } from 'typegoose';
import * as mongoose from 'mongoose';
import { Status } from '../utils/Enums';

import { Station } from './Station.model';
import { Element } from './Element.model';

@pre<Notification>('save', function(next) {
    if (this.itemId == undefined) throw 'NotificationModel: itemId not set';
    if (this.stationId == undefined) throw 'NotificationModel: stationId not set';
    if (this.creationTime == undefined) this.creationTime = new Date(Date.now()).toLocaleString('en-GB');
    if (this.status == undefined) this.status = Status.OPEN;

    next();
})
export class Notification extends Typegoose {
    @prop({ required: true, ref: Element })
    itemId: Ref<Element>;

    @prop({ required: true, ref: Station })
    stationId: Ref<Station>;

    @prop({ required: true, min: 0 })
    quantity: number;

    @prop()
    creationTime: string;

    @prop({ enum: Status })
    status: Status;
}

export const NotificationModel = new Notification().getModelForClass(Notification, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'notifications' },
});

export default NotificationModel;
