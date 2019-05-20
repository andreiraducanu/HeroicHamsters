import LocationModel from '../models/Location.model';
import StationModel, { Station } from '../models/Station.model';
import ElementModel, { Element } from '../models/Element.model';
import MessageModel from '../models/Message.model';
import NotificationModel from '../models/Notification.model';
import QuantityModel from '../models/Quantity.model';

import data from '../resources/data.json';

import { ElementType, MessageType } from '../utils/Enums';

class HelpRepository {
    private static instance: HelpRepository;

    private constructor() {}

    public static getInstance(): HelpRepository {
        if (!this.instance) HelpRepository.instance = new HelpRepository();

        return HelpRepository.instance;
    }

    public async populate(): Promise<string> {
        let location = new LocationModel({ name: data.location.name });
        location.save();

        let stations = data.stations;
        for (let i = 0; i < stations.length; i++) {
            let station = new StationModel({
                name: stations[i].name,
                description: stations[i].description,
                floor: stations[i].floor,
                image: stations[i].image,
                locationId: location,
            });
            station.save();

            if (stations[i].elements !== undefined) this.recursiveElements(station, stations[i].elements, null);
        }

        return 'values inserted into database';
    }

    private recursiveElements(station: Station, elements: any[], parent: Element): void {
        for (let i = 0; i < elements.length; i++) {
            let element = new ElementModel({
                name: elements[i].name,
                image: elements[i].image,
                type: elements[i].type,
                parentId: parent,
                stationId: station,
            });
            element.save();

            if (elements[i].type == ElementType.CATEGORY) {
                // the element is a category

                if (elements[i].elements !== undefined) {
                    // category has subcategories
                    this.recursiveElements(station, elements[i].elements, element);
                }
            } else if (elements[i].type == ElementType.ITEM) {
                // the element is a item

                if (elements[i].quantity !== undefined) {
                    let quantity = new QuantityModel({
                        itemId: element,
                        stationId: station,
                        quantity: elements[i].quantity,
                    });

                    quantity.save();
                }

                if (elements[i].notifications !== undefined) {
                    // element has notifications
                    let notifications: any[] = elements[i].notifications;
                    for (let j = 0; j < notifications.length; j++) {
                        // if the message is from platform, generate notifications
                        let message = new MessageModel({
                            type: notifications[j].type,
                            content: notifications[j].content,
                            itemId: element,
                            stationId: station,
                        });
                        message.save();

                        if (message.type == MessageType.PLATFORM) {
                            let amount = parseInt(message.content.split(' ', 1)[0]);
                            this.generateNotfications(amount, element, station);
                        }
                    }
                }
            }
        }
    }

    private generateNotfications(amount: number, element: Element, station: Station): void {
        for (let i = 0; i < amount; i++) {
            let quantity = Math.floor(Math.random() * 10);

            let notification = new NotificationModel({
                quantity: quantity,
                itemId: element,
                stationId: station,
            });
            notification.save();
        }
    }

    public async deleteAll(): Promise<string> {
        await LocationModel.deleteMany({}).exec();
        await StationModel.deleteMany({}).exec();
        await ElementModel.deleteMany({}).exec();
        await MessageModel.deleteMany({}).exec();
        await NotificationModel.deleteMany({}).exec();
        await QuantityModel.deleteMany({}).exec();

        return 'database deleted';
    }
}

export default HelpRepository;
