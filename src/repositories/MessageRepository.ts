import { MessageModel, Message } from '../models/Message.model';
import ICrudRepository from './ICrudRepository';
import { InstanceType } from 'typegoose';

class MessageRepository extends ICrudRepository<Message> {
    private static instance: MessageRepository;

    private constructor() {
        super();
    }

    public static getInstance(): MessageRepository {
        if (!this.instance) MessageRepository.instance = new MessageRepository();

        return MessageRepository.instance;
    }

    public getAll(): Promise<InstanceType<Message>[]> {
        return MessageModel.find().exec();
    }

    public getById(id: string): Promise<InstanceType<Message>> {
        return MessageModel.findById(id).exec();
    }

    public getByFilters(filters: any): Promise<InstanceType<Message>[]> {
        return MessageModel.find(filters).exec();
    }

    public add(document: Message): Promise<InstanceType<Message>> {
        let newMessage = new MessageModel(document);
        return newMessage.save();
    }

    public update(id: string, document: any): Promise<InstanceType<Message>> {
        return MessageModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public deleteAll(): Promise<any> {
        return MessageModel.deleteMany({}).exec();
    }

    public deleteById(id: string): Promise<InstanceType<Message>> {
        return MessageModel.findByIdAndRemove(id).exec();
    }

    public deleteByFilters(filters: any): Promise<any> {
        return MessageModel.deleteMany(filters).exec();
    }
}

export default MessageRepository;
