import { StationModel, Station } from '../models/Station.model';
import ICrudRepository from './ICrudRepository';
import ElementModel from '../models/Element.model';
import { InstanceType } from 'typegoose';

class StationRepository extends ICrudRepository<Station> {
    private static instance: StationRepository;

    private constructor() {
        super();
    }

    public static getInstance(): StationRepository {
        if (!this.instance) StationRepository.instance = new StationRepository();

        return StationRepository.instance;
    }

    public getAll(): Promise<InstanceType<Station>[]> {
        return StationModel.find().exec();
    }

    public getById(id: string): Promise<InstanceType<Station>> {
        return StationModel.findById(id).exec();
    }

    public add(document: Station): Promise<InstanceType<Station>> {
        let newStation = new StationModel(document);
        return newStation.save();
    }

    public async addElement(stationId: string, elementId: string): Promise<InstanceType<Station>> {
        const station = await StationModel.findById(stationId);
        const element = await ElementModel.findById(elementId);

        return station.addElement(element);
    }

    public update(id: string, document: any): Promise<InstanceType<Station>> {
        return StationModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public deleteAll(): Promise<any> {
        return StationModel.deleteMany({}).exec();
    }

    public deleteById(id: string): Promise<InstanceType<Station>> {
        return StationModel.findByIdAndRemove(id).exec();
    }
}

export default StationRepository;
