import ICrudRepository from './ICrudRepository';
import { ElementModel, Element } from '../models/Element.model';
import { InstanceType } from 'typegoose';

class ElementRepository extends ICrudRepository<Element> {
    private static instance: ElementRepository;

    private constructor() {
        super();
    }

    public static getInstance(): ElementRepository {
        if (!this.instance) ElementRepository.instance = new ElementRepository();

        return ElementRepository.instance;
    }

    public getAll(): Promise<InstanceType<Element>[]> {
        return ElementModel.find({}).exec();
    }

    public getById(id: string): Promise<InstanceType<Element>> {
        return ElementModel.findById(id).exec();
    }

    public add(document: Element): Promise<InstanceType<Element>> {
        let newElement = new ElementModel(document);
        return newElement.save();
    }

    public async addChild(parentId: string, childId: string): Promise<InstanceType<Element>> {
        const parent = await ElementModel.findById(parentId);
        const child = await ElementModel.findById(childId);

        return parent.addChild(child);
    }

    public update(id: string, document: any): Promise<InstanceType<Element>> {
        return ElementModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public deleteAll(): Promise<any> {
        return ElementModel.deleteMany({}).exec();
    }

    public deleteById(id: string): Promise<InstanceType<Element>> {
        return ElementModel.findByIdAndRemove(id).exec();
    }
}

export default ElementRepository;
