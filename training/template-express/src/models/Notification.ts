 
import { prop, Typegoose } from 'typegoose';

class Notification extends Typegoose {
    @prop({ required: true })
    id: number;

    @prop({ required: true })
    quantity: number;
}

export default Notification;