import { NotificationModel, Notification } from '../models/Notification.model';
import MessageModel from '../models/Message.model';
import ICrudRepository from './ICrudRepository';
import { MessageType } from '../utils/Enums';
import { InstanceType } from 'typegoose';

class NotificationRepository extends ICrudRepository<Notification> {
    private static instance: NotificationRepository;

    private constructor() {
        super();
    }

    public static getInstance(): NotificationRepository {
        if (!this.instance) NotificationRepository.instance = new NotificationRepository();

        return NotificationRepository.instance;
    }

    public getAll(): Promise<InstanceType<Notification>[]> {
        return NotificationModel.find().exec();
    }

    public getById(id: string): Promise<InstanceType<Notification>> {
        return NotificationModel.findById(id).exec();
    }

    public getByFilters(filters: any): Promise<InstanceType<Notification>[]> {
        return NotificationModel.find(filters).exec();
    }

    public async add(document: Notification): Promise<InstanceType<Notification>> {
        let newNotification = new NotificationModel(document);

        // get the message for specific item
        const message = await MessageModel.find({
            itemId: newNotification.elementId,
            stationId: newNotification.stationId,
            type: MessageType.PLATFORM,
        }).exec();

        // get all notifications for specific item
        const notifications = await NotificationModel.find({
            itemId: newNotification.elementId,
            stationId: newNotification.stationId,
        }).exec();

        // create the message content from platform
        let amount = notifications.length + 1;
        const content = amount + ' other notifications have been sent about this item.';

        if (message.length == 0) {
            // the message doesn't exists and we create it
            new MessageModel({
                type: MessageType.PLATFORM,
                itemId: newNotification.elementId,
                stationId: newNotification.stationId,
                content: content,
            }).save();
        } else {
            // the message exists and we update it
            MessageModel.findByIdAndUpdate(message[0]._id, { $set: { content: content } }, { new: true }).exec();
        }

        return newNotification.save();
    }

    public update(id: string, document: any): Promise<InstanceType<Notification>> {
        return NotificationModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public deleteAll(): Promise<any> {
        return NotificationModel.deleteMany({}).exec();
    }

    public deleteById(id: string): Promise<InstanceType<Notification>> {
        return NotificationModel.findByIdAndRemove(id).exec();
    }
}

export default NotificationRepository;
