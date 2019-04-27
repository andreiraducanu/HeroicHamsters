import * as mongoose from 'mongoose';
import { prop, Typegoose, Ref } from 'typegoose';

import { Location } from './Location.model';

enum Status {
    OPEN = 'open',
    CLOSED = 'closed',
}

export class Request extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    description: string;

    @prop({ required: true })
    bagde: string;

    @prop({ required: true, ref: Location, default: undefined })
    location: Ref<Location>;

    @prop({ required: true, enum: Status, default: Status.OPEN })
    status: Status;
}

export const RequestModel = new Request().getModelForClass(Request, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'requests' },
});

export default RequestModel;
