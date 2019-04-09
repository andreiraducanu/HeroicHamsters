import { Typegoose } from 'typegoose';

export abstract class IControllerRepository<T extends Typegoose> {
    abstract getAll(): Promise<T[]>;

    abstract getById(id: String): Promise<T>;
    
    abstract add(document: T): Promise<T>;
    
    abstract update(id: String, document: T): Promise<T>;
    
    abstract delete(id: String): Promise<T>;
}