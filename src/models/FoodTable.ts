import { prop,Typegoose } from 'typegoose';


export class FoodTable extends Typegoose{

    @prop()
    name: string|undefined;

    @prop()
    amount: number|undefined;

    @prop()
    type: string|undefined;

    @prop()
    expirationDate: string|undefined;

}

export const FoodModel=new FoodTable().getModelForClass(FoodTable);

