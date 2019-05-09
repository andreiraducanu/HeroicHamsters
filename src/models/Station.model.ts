import { prop, Typegoose } from 'typegoose';
import * as mongoose from 'mongoose';

export class Station extends Typegoose {
    @prop({ required: true, minlength: 2 })
    companyName: string;

    @prop({ required: true })
    levelIndex: number;

    @prop({ required: true, min: 0 })
    roomIndex: number;
}

export const StationModel = new Station().getModelForClass(Station, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'stations' },
});

export default StationModel;
