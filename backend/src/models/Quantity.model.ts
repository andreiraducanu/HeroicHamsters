import { prop, Typegoose } from 'typegoose';
import * as mongoose from 'mongoose';

import { Location } from './Location.model';
import { Item } from './Item.model';

export class Quantity extends Typegoose {
    @prop({ required: true })
    location: Location;

    @prop({ required: true })
    item: Item;
}

export const QuantityModel = new Quantity().getModelForClass(Quantity, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'quantities' },
});

export default QuantityModel;