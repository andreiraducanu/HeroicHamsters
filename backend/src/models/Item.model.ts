import * as mongoose from 'mongoose';
import { pre, prop, Typegoose, Ref } from 'typegoose';

import { Category } from './Category.model';

@pre<Item>('save', function(next) {
    if (parent == undefined) throw 'ItemModel: parent not set';

    next();
})
export class Item extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    urlImage: string;

    @prop({ required: true })
    description: string;

    @prop({ required: true, ref: Category })
    parent: Ref<Category>;
}

export const ItemModel = new Item().getModelForClass(Item, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'items' },
});

export default ItemModel;
