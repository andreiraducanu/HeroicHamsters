import { pre, prop, Typegoose, Ref } from 'typegoose';
import * as mongoose from 'mongoose';

import { Item } from './Item.model';
import { Admin } from './Admin.model';
import { Location } from './Location.model';

type Status = 'open' | 'closed';
const StatusType = {
    OPEN: 'open' as Status,
    CLOSED: 'closed' as Status,
};

@pre<Notification>('save', function(next) {
    if (this.creationTime === undefined)
        this.creationTime = new Date(Date.now()).toLocaleString('en-GB', { timeZone: 'UTC' });
    next();
})
export class Notification extends Typegoose {
    @prop({ required: true, ref: Item })
    itemId: Ref<Item>;

    @prop({ required: true, default: undefined })
    creationTime: string;

    @prop({ required: true, ref: Location })
    location: Ref<Location>;

    @prop({ required: true, unique: true, min: 1 })
    managerId: Ref<Admin>;

    @prop({ required: true, enum: Object.values(StatusType) })
    status: Status;
}

export const NotificationModel = new Notification().getModelForClass(Notification, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'notifications' },
});

export default NotificationModel;
