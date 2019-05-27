import { RequestModel, Request } from '../models/Request.model';
import ICrudRepository from './ICrudRepository';
import { InstanceType } from 'typegoose';

class RequestRepository extends ICrudRepository<Request> {
    private static instance: RequestRepository;

    private constructor() {
        super();
    }

    public static getInstance(): RequestRepository {
        if (!this.instance) RequestRepository.instance = new RequestRepository();

        return RequestRepository.instance;
    }

    public getAll(): Promise<InstanceType<Request>[]> {
        return RequestModel.find().exec();
    }

    public getById(id: string): Promise<InstanceType<Request>> {
        return RequestModel.findById(id).exec();
    }

    public add(document: Request): Promise<InstanceType<Request>> {
        let newRequest = new RequestModel(document);
        return newRequest.save();
    }

    public update(id: string, document: any): Promise<InstanceType<Request>> {
        return RequestModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public deleteAll(): Promise<any> {
        return RequestModel.deleteMany({}).exec();
    }

    public deleteById(id: string): Promise<InstanceType<Request>> {
        return RequestModel.findByIdAndRemove(id).exec();
    }
}

export default RequestRepository;
