import express from 'express';
import Controller from './Controller';

import HttpStatus from '../utils/HttpStatus';

import CategoryModel from '../models/Category.model';
import ItemModel from '../models/Item.model';

class UserController implements Controller {
    public rootPath = '/user';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(`${this.rootPath}/getAll`, this.getAllCategories.bind(this));
        this.router.post(`${this.rootPath}/add`, this.addCategory.bind(this));
    }

    private getAllCategories(req: express.Request, res: express.Response): void {
        CategoryModel.find().then(categories => {
            if (categories.length == 0) res.status(HttpStatus.NoContent).send();
            else res.status(HttpStatus.OK).json(categories);
        });
    }

    private addCategory(req: express.Request, res: express.Response): void {
        const newCategory = new CategoryModel(req.body);
        newCategory
            .save()
            .then(result => {
                res.status(HttpStatus.OK).json(result);
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
    }
}

export default UserController;
