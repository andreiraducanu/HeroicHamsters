import * as mongoose from 'mongoose';
import { pre, prop, Typegoose, Ref } from 'typegoose';

@pre<Category>('save', function(next) {
    if (this.parent == undefined) this.parent == null;

    next();
})
export class Category extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true, ref: Category })
    parent: Ref<Category>;
}

export const CategoryModel = new Category().getModelForClass(Category, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'categories' },
});

export default CategoryModel;
