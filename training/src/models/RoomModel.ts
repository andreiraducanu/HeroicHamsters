import { prop, Typegoose } from 'typegoose';

export class Room extends Typegoose {
    @prop({required: true})
    name: string;

    @prop({required: true})
    floor: Number;
}
