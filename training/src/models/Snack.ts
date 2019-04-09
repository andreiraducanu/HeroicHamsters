import { prop, Typegoose } from 'typegoose';

class Snack extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    type: string;

    @prop({ required: true })
    amount: number;

    @prop({ default: Date.now })
    expirationDate: Date;
}

export default Snack;
