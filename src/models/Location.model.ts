import { Ref, prop, Typegoose, arrayProp, instanceMethod, InstanceType, pre } from 'typegoose';
import * as mongoose from 'mongoose';
import { Station } from './Station.model';

@pre<Location>('findOne', function(next) {
    this.populate('stations');

    next();
})
@pre<Location>('find', function(next) {
    this.populate('stations');

    next();
})
export class Location extends Typegoose {
    @prop({ required: true })
    name: string;

    @arrayProp({ itemsRef: Station })
    stations: Ref<Station>[];

    @instanceMethod
    addStation(this: InstanceType<Location>, station: InstanceType<Station>) {
        this.stations.push(station);

        return this.save();
    }
}

export const LocationModel = new Location().getModelForClass(Location, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'locations' },
});

export default LocationModel;
