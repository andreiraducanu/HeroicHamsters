import { prop, Typegoose } from 'typegoose';

export class Food extends Typegoose {
    @prop({required: true})
    name: string;

    @prop({required: true})
    amount: Number;

    @prop({required: true})
    type: string;

    @prop({default: Date.now})
    expirationDate: Date;
}