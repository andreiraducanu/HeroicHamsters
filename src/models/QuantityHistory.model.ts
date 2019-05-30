import { Ref, prop, Typegoose } from 'typegoose';
import * as mongoose from 'mongoose';
import { Element } from './Element.model';

export class QuantityHistory extends Typegoose {
    @prop({ required: true, ref: Element })
    elementId: Ref<Element>;

    @prop({ required: true, min: 0 })
    quantity: number;

    @prop({ required: true })
    date: Date;
}

export const QuantityHistoryModel = new QuantityHistory().getModelForClass(QuantityHistory, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'quantityHistory' },
});

export default QuantityHistoryModel;
