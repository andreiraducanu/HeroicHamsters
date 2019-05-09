import ICrudRepository from './ICrudRepository';
import { ElementModel, Element } from '../models/Element.model';
import MessageModel from '../models/Message.model';

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

    public getElements(): Promise<any[]> {
        return this.recursiveElements(null);
    }

    private async recursiveElements(parentId: string): Promise<any[]> {
        let ret = new Array<any>();

        const elements = await ElementModel.find({ parent: parentId }).exec();

        for (let i = 0; i < elements.length; i++) {
            let element: any = {};

            element.id = elements[i]._id;
            element.type = elements[i].type;
            element.name = elements[i].name;
            element.parentId = parentId;
            element.image = elements[i].image;

            if (element.type == 'category') {
                element.elements = await this.recursiveElements(elements[i]._id);
                if (element.elements.length == 0) element.elements = undefined;
            }

            if (element.type == 'item') {
                const messages = await MessageModel.find({ item: element.id }).exec();

                let notifications = new Array<any>();
                for (let j = 0; j < messages.length; j++) {
                    let notification: any = {};

                    notification.id = messages[j]._id;
                    notification.type = messages[j].type;
                    notification.content = messages[j].content;
                    notification.itemId = messages[j].itemId;
                    notification.createdAt = messages[j].createdAt;

                    notifications.push(notification);
                }

                if (notifications.length != 0) element.notifications = notifications;
            }

            if (element.parentId == null) element.parentId = undefined;

            ret.push(element);
        }

        return ret;
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
