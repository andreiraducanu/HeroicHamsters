import { LocationModel, Location } from '../models/Location.model';
import ICrudRepository from './ICrudRepository';
import { InstanceType } from 'typegoose';

import StationModel from '../models/Station.model';

class LocationRepository extends ICrudRepository<Location> {
    private static instance: LocationRepository;

    private constructor() {
        super();
    }

    public static getInstance(): LocationRepository {
        if (!this.instance) LocationRepository.instance = new LocationRepository();

        return LocationRepository.instance;
    }

    public getAll(): Promise<InstanceType<Location>[]> {
        return LocationModel.find().exec();
    }

    public getById(id: string): Promise<InstanceType<Location>> {
        return LocationModel.findById(id).exec();
    }

    public add(document: Location): Promise<InstanceType<Location>> {
        let newLocation = new LocationModel(document);
        return newLocation.save();
    }

    public async addStation(locationId: string, stationId: string): Promise<InstanceType<Location>> {
        const location = await LocationModel.findById(locationId);
        const station = await StationModel.findById(stationId);

        return location.addStation(station);
    }

    public update(id: string, document: any): Promise<InstanceType<Location>> {
        return LocationModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public deleteAll(): Promise<any> {
        return LocationModel.deleteMany({}).exec();
    }

    public deleteById(id: string): Promise<InstanceType<Location>> {
        return LocationModel.findByIdAndRemove(id).exec();
    }
}

export default LocationRepository;
