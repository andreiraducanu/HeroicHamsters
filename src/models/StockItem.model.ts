import * as mongoose from 'mongoose';
import { prop, Typegoose, Ref } from 'typegoose';
import { Station } from './Station.model';
import { Element } from './Element.model';

export class StockItem extends Typegoose {
    @prop({ required: true, ref: Station })
    stationId: Ref<Station>;

    @prop({ required: true, ref: Element })
    elementId: Ref<Element>;

    @prop({ required: true })
    quantity: number;

    @prop({ required: true })
    expirationDate: Date;
}

export const StockItemModel = new StockItem().getModelForClass(StockItem, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'stock' },
});

export default StockItemModel;
