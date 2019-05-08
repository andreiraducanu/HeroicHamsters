import { pre, prop, Typegoose, Ref } from 'typegoose';
import * as mongoose from 'mongoose';

import { Station } from './Station.model';
import { Element } from './Element.model';

@pre<Quantity>('save', function(next) {
    if (this.item == undefined) throw 'QuantityModel: item not set';
    if (this.station == undefined) throw 'QuantityModel: station not set';

    next();
})
export class Quantity extends Typegoose {
    @prop({ required: true, ref: Element })
    item: Ref<Element>;

    @prop({ required: true, ref: Station })
    station: Ref<Station>;

    @prop({ required: true, min: 0 })
    quantity: number;
}

export const QuantityModel = new Quantity().getModelForClass(Quantity, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'quantities' },
});

export default QuantityModel;
