import * as mongoose from 'mongoose';
import { prop, Typegoose, Ref } from 'typegoose';

export class Category extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true, ref: Category, default: undefined })
    parent: Ref<Category>;
}

export const CategoryModel = new Category().getModelForClass(Category, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'categories' },
});

export default CategoryModel;
