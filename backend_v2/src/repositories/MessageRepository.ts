import { MessageModel, Message } from '../models/Message.model';
import ICrudRepository from './ICrudRepository';

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
}

export default MessageRepository;
