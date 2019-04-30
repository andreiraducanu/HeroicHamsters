import { ItemModel, Item } from '../models/Item.model';
import ICrudRepository from './ICrudRepository';

class ItemRepository extends ICrudRepository<Item> {
    private static instance: ItemRepository;

    private constructor() {
        super();
    }

    public static getInstance(): ItemRepository {
        if (!this.instance) ItemRepository.instance = new ItemRepository();

        return ItemRepository.instance;
    }

    public getAll(): Promise<Item[]> {
        return ItemModel.find().exec();
    }

    public getById(id: string): Promise<Item> {
        return ItemModel.findById(id).exec();
    }

    public getByParent(parentId: string): Promise<Item[]> {
        return ItemModel.find({ parent: parentId }).exec();
    }

    public add(document: Item): Promise<Item> {
        let newItem = new ItemModel(document);
        return newItem.save();
    }

    public update(id: string, document: any): Promise<Item> {
        return ItemModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public deleteAll(): Promise<any> {
        return ItemModel.collection.deleteMany({});
    }

    public deleteById(id: string): Promise<Item> {
        return ItemModel.findByIdAndRemove(id).exec();
    }

    public search(query: string): Promise<Item[]> {
        return ItemModel.find({ name: { $regex: new RegExp(query), $options: 'i' } }).exec();
    }
}

export default ItemRepository;
