import * as mongoose from 'mongoose';
import { pre, prop, Typegoose, Ref } from 'typegoose';
import { ElementType } from '../utils/Enums';
import { Station } from './Station.model';

@pre<Element>('save', function(next) {
    if (this.parentId == undefined) this.parentId = null;
    if (this.stationId == undefined) throw 'ElementModel: stationId not set';

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

    @prop({ required: true, ref: Station })
    stationId: Ref<Station>;
}

export const ElementModel = new Element().getModelForClass(Element, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'elements' },
});

export default ElementModel;
