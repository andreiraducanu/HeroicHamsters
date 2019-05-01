import { QuantityModel, Quantity } from '../models/Quantity.model';
import ICrudRepository from './ICrudRepository';

class QuantityRepository extends ICrudRepository<Quantity> {
    private static instance: QuantityRepository;

    private constructor() {
        super();
    }

    public static getInstance(): QuantityRepository {
        if (!this.instance) QuantityRepository.instance = new QuantityRepository();

        return QuantityRepository.instance;
    }

    public getAll(): Promise<Quantity[]> {
        return QuantityModel.find().exec();
    }

    public getById(id: string): Promise<Quantity> {
        return QuantityModel.findById(id).exec();
    }

    public getByFilters(filters: any): Promise<Quantity[]> {
        return QuantityModel.find(filters).exec();
    }

    public add(document: Quantity): Promise<Quantity> {
        let newQuantity = new QuantityModel(document);
        return newQuantity.save();
    }

    public update(id: string, document: any): Promise<Quantity> {
        return QuantityModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public delete(id: string): Promise<Quantity> {
        return QuantityModel.findByIdAndRemove(id).exec();
    }

    public setQuantity(id: string, amount: number): Promise<Quantity> {
        return QuantityModel.findByIdAndUpdate(id, { quantity: amount }, { new: true }).exec();
    }
}

export default QuantityRepository;
