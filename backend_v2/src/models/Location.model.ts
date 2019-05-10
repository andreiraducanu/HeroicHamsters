import { prop, Typegoose } from 'typegoose';
import * as mongoose from 'mongoose';

export class Location extends Typegoose {
    @prop({ required: true })
    name: string;
}

export const LocationModel = new Location().getModelForClass(Location, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'locations' },
});

export default LocationModel;
