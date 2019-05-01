import { LocationModel, Location } from '../models/Location.model';
import ICrudRepository from './ICrudRepository';

class LocationRepository extends ICrudRepository<Location> {
    private static instance: LocationRepository;

    private constructor() {
        super();
    }

    public static getInstance(): LocationRepository {
        if (!this.instance) LocationRepository.instance = new LocationRepository();

        return LocationRepository.instance;
    }

    public getAll(): Promise<Location[]> {
        return LocationModel.find().exec();
    }

    public getById(id: string): Promise<Location> {
        return LocationModel.findById(id).exec();
    }

    public add(document: Location): Promise<Location> {
        let newLocation = new LocationModel(document);
        return newLocation.save();
    }

    public update(id: string, document: any): Promise<Location> {
        return LocationModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public delete(id: string): Promise<Location> {
        return LocationModel.findByIdAndRemove(id).exec();
    }

    public deleteAll() {
        return LocationModel.deleteMany({});
    }
}

export default LocationRepository;
