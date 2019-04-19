import { prop, Typegoose } from 'typegoose';

export class Item extends Typegoose {
    @prop({required: true, min: 0})
    ID: Number;

    @prop({required: true})
    name: string;

    @prop({required: true})
    urlImage: string;

    @prop({required: true})
    description: string;

    @prop({required: true, min: 0})
    parrentID: Number;
}