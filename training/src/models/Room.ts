import { prop, Typegoose } from 'typegoose';

class Room extends Typegoose {
    @prop({ required: true })
    name: string;

    @prop({ required: true })
    floor: number;
}

export default Room;
