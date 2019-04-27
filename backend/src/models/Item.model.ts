import * as mongoose from 'mongoose';
import { prop, Typegoose, Ref } from 'typegoose';

import { Category } from './Category.model';

export class Item extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    urlImage: string;

    @prop({ required: true })
    description: string;

    @prop({ required: true, ref: Category, default: undefined })
    parent: Ref<Category>;
}

export const ItemModel = new Item().getModelForClass(Item, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'items' },
});

export default ItemModel;
