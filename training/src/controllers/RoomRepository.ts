import { Room } from "../models/RoomModel";
import { Provides } from "typescript-ioc";
import { IControllerRepository } from "../controllers/IControllerRepository";

@Provides(IControllerRepository)
export class RoomRepository implements IControllerRepository<Room> {
    
    private RoomModel;

    constructor() {
        this.RoomModel = new Room().getModelForClass(Room);
    }

    public getAll(): Promise<Room[]> {
        return this.RoomModel.find().exec();
    }    
    
    public getById(id: string): Promise<Room> {
        return this.RoomModel.findById(id).exec();
    }

    public add(document: Room): Promise<Room> {
        let newFood = new this.RoomModel(document);
        return newFood.save();
    }

    public update(id: string, document: any): Promise<Room> {
        return this.RoomModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public delete(id: string): Promise<Room> {
        return this.RoomModel.findByIdAndRemove(id).exec();
    }

}