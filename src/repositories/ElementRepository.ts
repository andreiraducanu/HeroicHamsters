import ICrudRepository from './ICrudRepository';
import { ElementModel, Element } from '../models/Element.model';

import StationModel from '../models/Station.model';
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

    public async getElements(stationId: string): Promise<any[]> {
        let ret: any = {};

        const station = await StationModel.findById(stationId).exec();

        ret.station = {};
        ret.station.id = station._id;
        ret.station.companyName = station.companyName;
        ret.station.levelIndex = station.levelIndex;
        ret.station.roomIndex = station.roomIndex;
        ret.elements = await this.recursiveElements(null, stationId);

        return ret;
    }

    private async recursiveElements(parentId: string, stationId: string): Promise<any[]> {
        let ret = new Array<any>();

        const elements = await ElementModel.find({ parentId: parentId }).exec();

        for (let i = 0; i < elements.length; i++) {
            let element: any = {};

            element.id = elements[i]._id;
            element.type = elements[i].type;
            element.name = elements[i].name;
            element.parentId = parentId;
            element.image = elements[i].image;

            if (element.type == 'category') {
                element.elements = await this.recursiveElements(elements[i]._id, stationId);
                if (element.elements.length == 0) element.elements = undefined;
            }

            if (element.type == 'item') {
                const messages = await MessageModel.find({ itemId: element.id, stationId: stationId }).exec();

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
