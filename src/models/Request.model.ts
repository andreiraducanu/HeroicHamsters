import * as mongoose from 'mongoose';
import { pre, prop, Typegoose, Ref } from 'typegoose';

import { Station } from './Station.model';

@pre<Request>('save', function(next) {
    if (this.createdAt == undefined) this.createdAt = new Date(Date.now());

    next();
})
export class Request extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    description: string;

    @prop({ required: true })
    badge: string;

    @prop()
    createdAt: Date;

    @prop({ required: true, ref: Station })
    stationId: Ref<Station>;
}

export const RequestModel = new Request().getModelForClass(Request, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'requests' },
});

export default RequestModel;
