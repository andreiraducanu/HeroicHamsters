import { pre, prop, Typegoose, Ref } from 'typegoose';
import * as mongoose from 'mongoose';

import { Station } from './Station.model';
import { Element } from './Element.model';

@pre<Quantity>('save', function(next) {
    if (this.itemId == undefined) throw 'QuantityModel: itemId not set';
    if (this.stationId == undefined) throw 'QuantityModel: stationId not set';
    if (this.expirationDate == undefined) this.expirationDate = new Date(Date.now());

    next();
})
export class Quantity extends Typegoose {
    @prop({ required: true, ref: Element })
    itemId: Ref<Element>;

    @prop({ required: true, ref: Station })
    stationId: Ref<Station>;

    @prop({ required: true, min: 0 })
    quantity: number;

    @prop({ required: true })
    expirationDate: Date;
}

export const QuantityModel = new Quantity().getModelForClass(Quantity, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'quantities' },
});

export default QuantityModel;
