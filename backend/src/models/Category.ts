import { prop, Typegoose, Ref } from 'typegoose';

class Category extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true, ref: Category, default: undefined })
    parent: Ref<Category>;
}

export default Category;
