import * as mongoose from 'mongoose';
import { pre, prop, Typegoose, Ref } from 'typegoose';
import { Status } from '../utils/Enums';

import { Location } from './Location.model';

@pre<Request>('save', function(next) {
    if (this.creationTime == undefined) this.creationTime = new Date(Date.now()).toLocaleString('en-GB');
    if (this.locationId == undefined) throw 'RequestModel: stationId not set';
    if (this.status == undefined) this.status = Status.OPEN;

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
    creationTime: string;

    @prop({ enum: Status })
    status: Status;

    @prop({ required: true, ref: Location })
    locationId: Ref<Location>;
}

export const RequestModel = new Request().getModelForClass(Request, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'requests' },
});

export default RequestModel;