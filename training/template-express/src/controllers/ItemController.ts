import express from 'express';
import mongoose from 'mongoose';
import Controller from './Controller';
import Item from '../models/Item';
import Category from '../models/Category';

class ItemController implements Controller {
    public rootPath = '/items';
    public router = express.Router();

    private itemModel = new Item().setModelForClass(Item);
    private categoryModel = new Category().setModelForClass(Category);

    private readonly HttpStatus_NoContent = 204;

    private readonly HttpStatus_OK = 200;

    private readonly HttpStatus_BadRequest = 400;

    private readonly HttpStatus_NotFound = 404;

    private readonly HttpStatus_Created = 201;

    constructor() {
        this.initRoutes(); 
    }

    private initRoutes(): void {
        // this.router.get(this.rootPath, this.find.bind(this));
        // this.router.get(`${this.rootPath}/:id`, this.getById.bind(this));
        // this.router.put(`${this.rootPath}/:id`, this.update.bind(this));
        this.router.post(this.rootPath, this.add.bind(this));
        // this.router.delete(`${this.rootPath}/:id`, this.delete.bind(this));
    }

    
    private add(req: express.Request, res: express.Response): void {
        const item = new this.itemModel(req.body);
        item.save()
            .then(item => {
                res.status(this.HttpStatus_Created).json(item);
            })
            .catch(err => {
                res.status(this.HttpStatus_BadRequest).send(err);
            });
    }

   
}

export default ItemController;