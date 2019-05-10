import LocationModel from '../models/Location.model';
import StationModel, { Station } from '../models/Station.model';
import ElementModel, { Element } from '../models/Element.model';
import MessageModel from '../models/Message.model';

import data from '../resources/data.json';

import { ElementType } from '../utils/Enums';

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

        let stations = data.location.stations;
        for (let i = 0; i < stations.length; i++) {
            let station = new StationModel({
                name: stations[i].stationName,
                floor: stations[i].floor,
                image: stations[i].image,
                locationId: location,
            });
            station.save();

            if (stations[i].elements !== undefined) this.recursiveElements(station, stations[i].elements, null);
        }

        return 'values inserted into database';
    }

    public async recursiveElements(station: Station, elements: any[], parent: Element) {
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
                        let message = new MessageModel({
                            type: notifications[j].type,
                            content: notifications[j].content,
                            itemId: element,
                            stationId: station,
                        });
                        message.save();
                    }
                }
            }
        }
    }

    public async deleteAll(): Promise<string> {
        await LocationModel.deleteMany({});
        await StationModel.deleteMany({});
        await ElementModel.deleteMany({});
        await MessageModel.deleteMany({});

        return 'database deleted';
    }
}

export default HelpRepository;
