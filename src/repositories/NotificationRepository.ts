import { NotificationModel, Notification } from '../models/Notification.model';
import ICrudRepository from './ICrudRepository';
import { Status, MessageType } from '../utils/Enums';

import MessageModel from '../models/Message.model';

class NotificationRepository extends ICrudRepository<Notification> {
    private static instance: NotificationRepository;

    private constructor() {
        super();
    }

    public static getInstance(): NotificationRepository {
        if (!this.instance) NotificationRepository.instance = new NotificationRepository();

        return NotificationRepository.instance;
    }

    public getAll(): Promise<Notification[]> {
        return NotificationModel.find().exec();
    }

    public getById(id: string): Promise<Notification> {
        return NotificationModel.findById(id).exec();
    }

    public getByFilters(filters: any): Promise<Notification[]> {
        return NotificationModel.find(filters).exec();
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

    public add(document: Notification): Promise<Notification> {
        let newNotification = new NotificationModel(document);
        return newNotification.save();
    }

    public update(id: string, document: any): Promise<Notification> {
        return NotificationModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public deleteAll(): Promise<any> {
        return NotificationModel.collection.deleteMany({});
    }

    public deleteById(id: string): Promise<Notification> {
        return NotificationModel.findByIdAndRemove(id).exec();
    }

    public setStatus(id: string, newStatus: Status): Promise<Notification> {
        return NotificationModel.findByIdAndUpdate(id, { status: newStatus }, { new: true }).exec();
    }
}

export default NotificationRepository;
