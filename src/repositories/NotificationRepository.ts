import { NotificationModel, Notification } from '../models/Notification.model';
import ICrudRepository from './ICrudRepository';
import { Status } from '../utils/Enums';

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
