import Category from './Category';
import { prop, Typegoose, Ref } from 'typegoose';

class Item extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    urlImage: string;

    @prop({ required: true })
    description: string;

    @prop({ required: true, ref: Category, default: undefined })
    parent: Ref<Category>;
}

export default Item;