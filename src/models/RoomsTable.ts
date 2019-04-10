import {prop,Typegoose,ModelType,InstanceType} from 'typegoose';


export class RoomsTable extends Typegoose{
       @prop()
       name: string|undefined;

       @prop()
       floor: number|undefined;
}

export const RoomsModel=new RoomsTable().getModelForClass(RoomsTable);