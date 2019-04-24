import express from 'express';
import Controller from './Controller';

import CategoryType from '../data/CategoryType';
import ItemType from '../data/ItemType';

import Category from '../models/Category';
import Item from '../models/Item';

class UserController implements Controller {
    public rootPath = '/user';
    public router = express.Router();

    private categoryModel = new Category().setModelForClass(Category);
    private itemModel = new Item().setModelForClass(Item);

    private readonly HttpStatus_NoContent = 204;

    private readonly HttpStatus_OK = 200;

    private readonly HttpStatus_BadRequest = 400;

    private readonly HttpStatus_NotFound = 404;

    private readonly HttpStatus_Created = 201;

    private categoryStructure = new Array<CategoryType>();

    constructor() {
        //this.initRoutes();
        //generateCategoryStructure();
    }

    private initRoutes(): void {
        this.router.get(`${this.rootPath}/getAll`, this.getAll.bind(this));
        this.router.get(`${this.rootPath}/search/:id`, this.search.bind(this));

        this.router.post(`${this.rootPath}/add`, this.addCategory.bind(this));
    }

    private addCategory(req: express.Request, res: express.Response): void {
        const category = new this.categoryModel(req.body);
        category
            .save()
            .then(categ => {
                res.status(this.HttpStatus_Created).json(categ);
            })
            .catch(err => {
                res.status(this.HttpStatus_BadRequest).send(err);
            });
    }

    private search(req: express.Request, res: express.Response): void {}

    private getAll(req: express.Request, res: express.Response): void {
        let result = this.generateCategoryStructure(null);

        console.log(result);
    }

    generateCategoryStructure(id: any): void {
        this.categoryModel
            .findOne({ parent: id })
            .then(category => {
                if (category != null) {
                    console.log('da');
                    let objCategory = new CategoryType();
                    objCategory.name = category.name;
                    this.categoryStructure.push(objCategory);
                    //objCategory.subCategories = this.generateCategoryStructure(category._id);
                }
            })
            .catch(err => {
                throw err;
            });
    }

    findItems(id: number): ItemType[] {
        let objs: ItemType[];
        this.itemModel
            .findOne({ parentID: id }, 'name urlImage description')
            .then(item => {
                if (item != null) {
                    let tempItem = new ItemType();

                    tempItem.name = item.name;
                    tempItem.urlImage = item.urlImage;
                    tempItem.description = item.description;

                    objs.push(tempItem);
                }
            })
            .catch(err => {
                throw err;
            });

        return objs;
    }
}

export default UserController;
