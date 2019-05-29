import { StockItemModel, StockItem } from '../models/StockItem.model';
import { InstanceType } from 'typegoose';
import ICrudRepository from './ICrudRepository';

class StockItemRepository extends ICrudRepository<StockItem> {
    private static instance: StockItemRepository;

    private constructor() {
        super();
    }

    public static getInstance(): StockItemRepository {
        if (!this.instance) StockItemRepository.instance = new StockItemRepository();

        return StockItemRepository.instance;
    }

    public getAll(): Promise<InstanceType<StockItem>[]> {
        return StockItemModel.find().exec();
    }

    public getById(id: string): Promise<InstanceType<StockItem>> {
        return StockItemModel.findById(id).exec();
    }

    public add(document: StockItem): Promise<InstanceType<StockItem>> {
        let newStockItem = new StockItemModel(document);
        return newStockItem.save();
    }

    public update(id: string, document: any): Promise<InstanceType<StockItem>> {
        return StockItemModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public deleteAll(): Promise<any> {
        return StockItemModel.deleteMany({}).exec();
    }

    public deleteExpiredStockItems(): Promise<any> {
        let currentDate = new Date(Date.now());
        return StockItemModel.deleteMany({ expirationDate: { $lt: currentDate } }).exec();
    }

    public deleteById(id: string): Promise<InstanceType<StockItem>> {
        return StockItemModel.findByIdAndRemove(id).exec();
    }
}

export default StockItemRepository;
