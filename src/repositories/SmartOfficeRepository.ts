import StationModel from '../models/Station.model';
import ElementModel from '../models/Element.model';
import NotificationModel, { Notification } from '../models/Notification.model';
import MessageModel from '../models/Message.model';

import { Status, MessageType } from '../utils/Enums';
import LocationModel from '../models/Location.model';

class SmartOfficeRepository {
    private static instance: SmartOfficeRepository;

    private constructor() {}

    public static getInstance(): SmartOfficeRepository {
        if (!this.instance) SmartOfficeRepository.instance = new SmartOfficeRepository();

        return SmartOfficeRepository.instance;
    }

    public async getStationStructure(stationId: string): Promise<any[]> {
        let ret: any = {};

        const station = await StationModel.findById(stationId).exec();

        ret.station = {};
        ret.station.id = station._id;
        ret.station.floor = station.floor;
        ret.station.name = station.name;
        ret.station.image = station.image;

        ret.elements = await this.recursiveElements(null, stationId);

        return ret;
    }

    public async getLocationStructure(locationId: string): Promise<any[]> {
        let ret: any = {};

        const location = await LocationModel.findById(locationId).exec();

        ret.location = {};
        ret.location.id = location._id;
        ret.location.name = location.name;

        const stations = await StationModel.find({ locationId: location._id }).exec();

        let tempStations: any[] = new Array<any>();
        for (let i = 0; i < stations.length; i++) {
            let station = await this.getStationStructure(stations[i]._id);
            tempStations.push(station);
        }

        ret.location.stations = tempStations;

        return ret;
    }

    private async recursiveElements(parentId: string, stationId: string): Promise<any[]> {
        let ret = new Array<any>();

        const elements = await ElementModel.find({ parentId: parentId, stationId: stationId }).exec();

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

    public async addItemNotification(document: Notification): Promise<Notification> {
        let newNotification = new NotificationModel(document);

        // get the message for specific item
        const message = await MessageModel.find({
            itemId: newNotification.itemId,
            stationId: newNotification.stationId,
            type: MessageType.PLATFORM,
        }).exec();

        // get all notifications for specific item
        const notifications = await NotificationModel.find({
            itemId: newNotification.itemId,
            stationId: newNotification.stationId,
            status: Status.OPEN,
        }).exec();

        // create the message content from platform
        let amount = notifications.length + 1;
        const content = amount + ' other notifications have been sent about this item.';

        if (message.length == 0) {
            // the message doesn't exists and we create it
            new MessageModel({
                type: MessageType.PLATFORM,
                itemId: newNotification.itemId,
                stationId: newNotification.stationId,
                content: content,
            }).save();
        } else {
            // the message exists and we update it
            MessageModel.findByIdAndUpdate(message[0]._id, { $set: { content: content } }, { new: true }).exec();
        }

        return newNotification.save();
    }
}

export default SmartOfficeRepository;
