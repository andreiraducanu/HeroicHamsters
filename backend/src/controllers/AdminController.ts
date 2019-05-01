import express from 'express';
import Controller from './Controller';

import HttpStatus from '../utils/HttpStatus';

import LocationRepository from '../repositories/LocationRepository';
import CategoryRepository from '../repositories/CategoryRepository';

class AdminController implements Controller {
    public rootPath = '/admin';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.post(`${this.rootPath}/locations`, this.addLocation.bind(this));
        this.router.post(`${this.rootPath}/categories`, this.addCategory.bind(this));
    }

    private addLocation(req: express.Request, res: express.Response): void {
        const document = req.body;

        LocationRepository.getInstance()
            .add(document)
            .then(location => {
                res.status(HttpStatus.OK).json(location);
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
    }

    private addCategory(req: express.Request, res: express.Response): void {
        const document = req.body;

        CategoryRepository.getInstance()
            .add(document)
            .then(category => {
                res.status(HttpStatus.OK).json(category);
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
    }
}

export default AdminController;
