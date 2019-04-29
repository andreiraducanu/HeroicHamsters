import { Typegoose } from 'typegoose';

abstract class ICrudRepository<T extends Typegoose> {
    public abstract getAll(): Promise<T[]>;

    public abstract getById(id: string): Promise<T>;

    public abstract add(document: T): Promise<T>;

    public abstract update(id: string, document: T): Promise<T>;

    public abstract delete(id: string): Promise<T>;
}

export default ICrudRepository;
