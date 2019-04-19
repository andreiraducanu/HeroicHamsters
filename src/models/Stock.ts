import {prop,Typegoose} from 'typegoose';

export class Stock extends Typegoose{

    @prop({required:true,unique:true,index:true,min:0})
    id!: number;

    @prop({required:true,default:0,min:0})
    cantitate!: number;
}

export const StockModel=new Stock().getModelForClass(Stock);