import { RequestModel, Request } from '../models/Request.model';
import ICrudRepository from './ICrudRepository';
import { Status } from '../utils/Enums';

class RequestRepository extends ICrudRepository<Request> {
    private static instance: RequestRepository;

    private constructor() {
        super();
    }

    public static getInstance(): RequestRepository {
        if (!this.instance) RequestRepository.instance = new RequestRepository();

        return RequestRepository.instance;
    }

    public getAll(): Promise<Request[]> {
        return RequestModel.find().exec();
    }

    public getById(id: string): Promise<Request> {
        return RequestModel.findById(id).exec();
    }

    public add(document: Request): Promise<Request> {
        let newRequest = new RequestModel(document);
        return newRequest.save();
    }

    public update(id: string, document: any): Promise<Request> {
        return RequestModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public deleteAll(): Promise<any> {
        return RequestModel.collection.deleteMany({});
    }

    public deleteById(id: string): Promise<Request> {
        return RequestModel.findByIdAndRemove(id).exec();
    }

    public setStatus(id: string, newStatus: Status): Promise<Request> {
        return RequestModel.findByIdAndUpdate(id, { status: newStatus }, { new: true }).exec();
    }
}

export default RequestRepository;
