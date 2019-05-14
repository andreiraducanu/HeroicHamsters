import ICrudRepository from './ICrudRepository';
import { ElementModel, Element } from '../models/Element.model';

class ElementRepository extends ICrudRepository<Element> {
    private static instance: ElementRepository;

    private constructor() {
        super();
    }

    public static getInstance(): ElementRepository {
        if (!this.instance) ElementRepository.instance = new ElementRepository();

        return ElementRepository.instance;
    }

    public getAll(): Promise<Element[]> {
        return ElementModel.find().exec();
    }

    public getById(id: string): Promise<Element> {
        return ElementModel.findById(id).exec();
    }

    public add(document: Element): Promise<Element> {
        let newElement = new ElementModel(document);
        return newElement.save();
    }

    public update(id: string, document: any): Promise<Element> {
        return ElementModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public deleteAll(): Promise<any> {
        return ElementModel.collection.deleteMany({});
    }

    public deleteById(id: string): Promise<Element> {
        return ElementModel.findByIdAndRemove(id).exec();
    }
}

export default ElementRepository;
