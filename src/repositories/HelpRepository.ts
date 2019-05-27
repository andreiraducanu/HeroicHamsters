import LocationModel from '../models/Location.model';
import StationModel, { Station } from '../models/Station.model';
import ElementModel, { Element } from '../models/Element.model';
import MessageModel from '../models/Message.model';
import NotificationModel from '../models/Notification.model';

import * as data1 from '../resources/stations.json';
import * as data2 from '../resources/elements.json';
import * as data3 from '../resources/messages.json';
import * as data4 from '../resources/stationElements.json';

import { ElementType, MessageType } from '../utils/Enums';

class HelpRepository {
    private static instance: HelpRepository;

    private constructor() {}

    public static getInstance(): HelpRepository {
        if (!this.instance) HelpRepository.instance = new HelpRepository();

        return HelpRepository.instance;
    }

    // WORKING !!!!
    public async populate(): Promise<string> {
        let elements = data2.elements;
        let itemEncountered = 0;
        let categoryEncountered = 0;
        let roots = [];
        let ok = 0;
        let element = new ElementModel({
            name: elements[0].name,
            image: elements[0].image,
            type: elements[0].type,
        });

        await element.save().catch(err => console.log('caught err'));

        let root = await ElementModel.findOne({})
            .sort({ _id: -1 })
            .limit(1)
            .exec();

        roots.push(root);

        for (let i = 1; i < elements.length; i++) {
            let element = new ElementModel({
                name: elements[i].name,
                image: elements[i].image,
                type: elements[i].type,
            });

            await element.save().catch(err => console.log('caught err'));

            //  if (typeof elements[i].parentId != undefined) {

            if (elements[i].type == 'item') {
                itemEncountered = 1;
                categoryEncountered = 0;
                await roots[roots.length - 1].addChild(element).catch(err => console.log('caught err'));
            } else if (elements[i].type == 'category') {
                if (itemEncountered == 1 || categoryEncountered == 1) {
                    roots.pop();
                    itemEncountered = 0;
                }

                categoryEncountered = 1;
                if (typeof elements[i].parentId == 'undefined' && roots.length != 0) {
                    //am dat peste  un element fara parentId sterg tot din roots
                    categoryEncountered = 0;
                    roots.splice(0, roots.length);
                    console.log(elements[i].name);
                } else if (roots.length != 0)
                    await roots[roots.length - 1].addChild(element).catch(err => console.log('caught err'));

                root = await ElementModel.findOne({})
                    .sort({ _id: -1 })
                    .limit(1)
                    .exec();
                roots.push(root);
            }
        }

        let location = new LocationModel({ name: data1.location.name });

        let stations = data1.stations;
        for (let i = 0; i < stations.length; i++) {
            let station = new StationModel({
                name: stations[i].name,
                description: stations[i].description,
                floor: stations[i].floor,
                image: stations[i].image,
            });
            station.save();
            location.addStation(station);
        }

        location.save();

        return 'values inserted into database';
    }

    /* NOT WORKING !!!!!!! */
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

    /* NOT WORKING !!!!!!! */
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

        return 'database deleted';
    }
}

export default HelpRepository;
