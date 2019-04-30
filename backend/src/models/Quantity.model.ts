import { pre, prop, Typegoose, Ref } from 'typegoose';
import * as mongoose from 'mongoose';

import { Location } from './Location.model';
import { Item } from './Item.model';

@pre<Quantity>('save', function(next) {
    if (this.item == undefined) throw 'QuantityModel: item not set';
    if (this.location == undefined) throw 'QuantityModel: location not set';

    next();
})
export class Quantity extends Typegoose {
    @prop({ required: true, ref: Item })
    item: Ref<Item>;

    @prop({ required: true, ref: Location })
    location: Ref<Location>;

    @prop({ required: true, min: 0 })
    quantity: number;
}

export const QuantityModel = new Quantity().getModelForClass(Quantity, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'quantities' },
});

export default QuantityModel;
