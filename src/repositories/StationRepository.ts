import { StationModel, Station } from '../models/Station.model';
import ICrudRepository from './ICrudRepository';

class StationRepository extends ICrudRepository<Station> {
    private static instance: StationRepository;

    private constructor() {
        super();
    }

    public static getInstance(): StationRepository {
        if (!this.instance) StationRepository.instance = new StationRepository();

        return StationRepository.instance;
    }

    public getAll(): Promise<Station[]> {
        return StationModel.find().exec();
    }

    public getById(id: string): Promise<Station> {
        return StationModel.findById(id).exec();
    }

    public add(document: Station): Promise<Station> {
        let newStation = new StationModel(document);
        return newStation.save();
    }

    public update(id: string, document: any): Promise<Station> {
        return StationModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public deleteAll(): Promise<any> {
        return StationModel.collection.deleteMany({});
    }

    public deleteById(id: string): Promise<Station> {
        return StationModel.findByIdAndRemove(id).exec();
    }
}

export default StationRepository;
