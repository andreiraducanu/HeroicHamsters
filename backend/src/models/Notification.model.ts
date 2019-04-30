import { pre, prop, Typegoose, Ref } from 'typegoose';
import * as mongoose from 'mongoose';
import { Status } from '../utils/Enums';

import { Location } from './Location.model';
import { Item } from './Item.model';

@pre<Notification>('save', function(next) {
    if (this.item == undefined) throw 'NotificationModel: item not set';
    if (this.location == undefined) throw 'NotificationModel: location not set';
    if (this.creationTime == undefined) this.creationTime = new Date(Date.now()).toLocaleString('en-GB');
    if (this.status == undefined) this.status = Status.OPEN;

    next();
})
export class Notification extends Typegoose {
    @prop({ required: true, ref: Item })
    item: Ref<Item>;

    @prop({ required: true, ref: Location })
    location: Ref<Location>;

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
