 
 import { prop, Typegoose } from 'typegoose';

class Request extends Typegoose {
    @prop({ required: true })
    id: number;

    @prop({ required: true })
    name: string;

    @prop({ required: true })
    description: string;
}

export default Request;