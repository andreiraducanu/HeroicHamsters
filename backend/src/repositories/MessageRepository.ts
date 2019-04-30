import { MessageModel, Message } from '../models/Message.model';
import ICrudRepository from './ICrudRepository';
import { Status } from '../utils/Enums';

class MessageRepository extends ICrudRepository<Message> {
    private static instance: MessageRepository;

    private constructor() {
        super();
    }

    public static getInstance(): MessageRepository {
        if (!this.instance) MessageRepository.instance = new MessageRepository();

        return MessageRepository.instance;
    }

    public getAll(): Promise<Message[]> {
        return MessageModel.find().exec();
    }

    public getById(id: string): Promise<Message> {
        return MessageModel.findById(id).exec();
    }

    public getByFilters(filters: any): Promise<Message[]> {
        return MessageModel.find(filters).exec();
    }

    public add(document: Message): Promise<Message> {
        let newMessage = new MessageModel(document);
        return newMessage.save();
    }

    public update(id: string, document: any): Promise<Message> {
        return MessageModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public deleteAll(): Promise<any> {
        return MessageModel.collection.deleteMany({});
    }

    public deleteById(id: string): Promise<Message> {
        return MessageModel.findByIdAndRemove(id).exec();
    }

    public setStatus(id: string, newStatus: Status): Promise<Message> {
        return MessageModel.findByIdAndUpdate(id, { status: newStatus }, { new: true }).exec();
    }
}

export default MessageRepository;
