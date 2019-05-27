import { Ref, prop, Typegoose, arrayProp, instanceMethod, InstanceType } from 'typegoose';
import * as mongoose from 'mongoose';
import { Element } from './Element.model';

export class Station extends Typegoose {
    @prop({ required: true })
    floor: number;

    @prop({ required: true })
    name: string;

    @prop({ required: true })
    description: string;

    @prop({ required: true })
    image: string;

    @arrayProp({ itemsRef: Element })
    elements: Ref<Element>[];

    @instanceMethod
    addElement(this: InstanceType<Station>, element: InstanceType<Element>) {
        this.elements.push(element);

        return this.save();
    }
}

export const StationModel = new Station().getModelForClass(Station, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'stations' },
});

export default StationModel;
