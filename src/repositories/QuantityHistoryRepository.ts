import { QuantityHistoryModel, QuantityHistory } from '../models/QuantityHistory.model';
import ICrudRepository from './ICrudRepository';
import { InstanceType } from 'typegoose';

class QuantityHistoryRepository extends ICrudRepository<QuantityHistory> {
    private static instance: QuantityHistoryRepository;

    private constructor() {
        super();
    }

    public static getInstance(): QuantityHistoryRepository {
        if (!this.instance) QuantityHistoryRepository.instance = new QuantityHistoryRepository();

        return QuantityHistoryRepository.instance;
    }

    public getAll(): Promise<InstanceType<QuantityHistory>[]> {
        return QuantityHistoryModel.find().exec();
    }

    public getById(id: string): Promise<InstanceType<QuantityHistory>> {
        return QuantityHistoryModel.findById(id).exec();
    }

    public add(document: QuantityHistory): Promise<InstanceType<QuantityHistory>> {
        let newQuantityHistory = new QuantityHistoryModel(document);
        return newQuantityHistory.save();
    }

    public update(id: string, document: any): Promise<InstanceType<QuantityHistory>> {
        return QuantityHistoryModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public deleteAll(): Promise<any> {
        return QuantityHistoryModel.deleteMany({}).exec();
    }

    public deleteById(id: string): Promise<InstanceType<QuantityHistory>> {
        return QuantityHistoryModel.findByIdAndRemove(id).exec();
    }
}

export default QuantityHistoryRepository;
