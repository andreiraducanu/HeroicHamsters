import { pre, Ref, prop, Typegoose } from 'typegoose';
import * as mongoose from 'mongoose';
import { Location } from './Location.model';

@pre<Station>('save', function(next) {
    if (this.locationId == undefined) throw 'StationModel: locationId not set';

    next();
})
export class Station extends Typegoose {
    @prop({ required: true, ref: Location })
    locationId: Ref<Location>;

    @prop({ required: true })
    floor: number;

    @prop({ required: true })
    name: string;

    @prop({ required: true })
    description: string;

    @prop({ required: true })
    image: string;
}

export const StationModel = new Station().getModelForClass(Station, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'stations' },
});

export default StationModel;
