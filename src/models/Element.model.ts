import * as mongoose from 'mongoose';
import { pre, prop, Typegoose, Ref, arrayProp, instanceMethod, InstanceType } from 'typegoose';
import { ElementType } from '../utils/Enums';

@pre<Element>('findOne', function(next) {
    this.populate('elements');
    next();
})
@pre<Element>('find', function(next) {
    this.populate('elements');
    next();
})
export class Element extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    image: string;

    @prop({ required: true, enum: ElementType })
    type: ElementType;

    @arrayProp({ itemsRef: Element })
    elements: Ref<Element>[];

    @instanceMethod
    addChild(this: InstanceType<Element>, child: InstanceType<Element>) {
        this.elements.push(child);

        return this.save();
    }
}

export const ElementModel = new Element().getModelForClass(Element, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'elements' },
});

export default ElementModel;
