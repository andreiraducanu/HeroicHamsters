import { CategoryModel, Category } from '../models/Category.model';
import ICrudRepository from './ICrudRepository';

import ItemRepository from './ItemRepository';

class CategoryRepository extends ICrudRepository<Category> {
    private static instance: CategoryRepository;

    private constructor() {
        super();
    }

    public static getInstance(): CategoryRepository {
        if (!this.instance) CategoryRepository.instance = new CategoryRepository();

        return CategoryRepository.instance;
    }

    public getAll(): Promise<Category[]> {
        return CategoryModel.find().exec();
    }

    public getById(id: string): Promise<Category> {
        return CategoryModel.findById(id).exec();
    }

    public getRoot(): Promise<Category> {
        return CategoryModel.findOne({ parent: null }).exec();
    }

    public getLastDocRoot() {
        return CategoryModel.findOne({})
            .sort({ _id: -1 })
            .limit(1)
            .exec();
    }

    public getSubcategories(parentId: string): Promise<Category[]> {
        return CategoryModel.find({ parent: parentId }).exec();
    }

    public async getStructure(): Promise<any> {
        let root: any = {};

        const result = await CategoryModel.findOne({ parent: null }).exec();

        root._id = result._id;
        root.name = result.name;
        root.parent = result.parent;
        root.subcategories = await this.recursiveSubcategories(root._id);
        root._v = result.__v;

        return root;
    }

    public async recursiveSubcategories(parentId: string): Promise<any[]> {
        let subcategories = new Array<any>();

        const result = await CategoryModel.find({ parent: parentId }).exec();

        for (let i = 0; i < result.length; i++) {
            let subcategory: any = {};

            subcategory._id = result[i]._id;
            subcategory.name = result[i].name;
            subcategory.parent = result[i].parent;
            subcategory.subcategories = await this.recursiveSubcategories(subcategory._id);
            subcategory.items = await ItemRepository.getInstance().getByParent(subcategory._id);
            subcategory._v = result[i].__v;

            if (subcategory.subcategories.length == 0) subcategory.subcategories = undefined;
            if (subcategory.items.length == 0) subcategory.items = undefined;

            subcategories.push(subcategory);
        }

        return subcategories;
    }

    public add(document: Category): Promise<Category> {
        let newCategory = new CategoryModel(document);
        return newCategory.save();
    }

    public update(id: string, document: any): Promise<Category> {
        return CategoryModel.findByIdAndUpdate(id, document, { new: true }).exec();
    }

    public delete(id: string): Promise<Category> {
        return CategoryModel.findByIdAndRemove(id).exec();
    }

    public deleteAll() {
        return CategoryModel.deleteMany({});
    }
}

export default CategoryRepository;
