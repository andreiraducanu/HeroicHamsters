import * as mongoose from 'mongoose';
import { pre, prop, Typegoose, Ref } from 'typegoose';
import { ElementType } from '../utils/Enums';

@pre<Element>('save', function(next) {
    if (this.parentId == undefined) throw 'ElementModel: parentId not set';

    next();
})
export class Element extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    image: string;

    @prop({ required: true, enum: ElementType })
    type: ElementType;

    @prop({ required: true, ref: Element })
    parentId: Ref<Element>;
}

export const ElementModel = new Element().getModelForClass(Element, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'elements' },
});

export default ElementModel;
