import { pre, prop, Typegoose, Ref } from 'typegoose';
import * as mongoose from 'mongoose';

import { Station } from './Station.model';
import { Element } from './Element.model';

@pre<Notification>('save', function(next) {
    if (this.createdAt == undefined) this.createdAt = new Date(Date.now());

    next();
})
export class Notification extends Typegoose {
    @prop({ required: true, ref: Element })
    elementId: Ref<Element>;

    @prop({ required: true, ref: Station })
    stationId: Ref<Station>;

    @prop({ required: true, min: 0 })
    quantity: number;

    @prop()
    createdAt: Date;
}
export const NotificationModel = new Notification().getModelForClass(Notification, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'notifications' },
});

export default NotificationModel;
