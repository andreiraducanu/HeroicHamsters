import { Food } from "../models/FoodModel";
import { Provides } from "typescript-ioc";
import { IControllerRepository } from "../controllers/IControllerRepository";

@Provides(IControllerRepository)
export class FoodRepository implements IControllerRepository<Food> {
    
    private FoodModel;

    constructor() {
        this.FoodModel = new Food().getModelForClass(Food);
    }

    public getAll(): Promise<Food[]> {
        return this.FoodModel.find().exec();
    }    
    
    public getById(id: string): Promise<Food> {
        return this.FoodModel.findById(id).exec();
    }

    public add(document: Food): Promise<Food> {
        let newFood = new this.FoodModel(document);
        return newFood.save();
    }


    public update(id: string, document: any): Promise<Food> {
        return this.FoodModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public delete(id: string): Promise<Food> {
        return this.FoodModel.findByIdAndRemove(id).exec();
    }
}