import { prop, Typegoose } from 'typegoose';
import * as mongoose from 'mongoose';

export class Location extends Typegoose {
    @prop({ required: true, minlength: 2 })
    companyName: string;

    @prop({ required: true })
    levelIndex: number;

    @prop({ required: true, min: 0 })
    tableIndex: number;
}

export const LocationModel = new Location().getModelForClass(Location, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'locations' },
});

export default LocationModel;
