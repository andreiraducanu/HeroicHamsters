import express from 'express';
import Controller from './Controller';

import HttpStatus from '../utils/HttpStatus';

import SmartOfficeRepository from '../repositories/SmartOfficeRepository';

class AdminController implements Controller {
    public rootPath = '/admin';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(`${this.rootPath}/location/:locationId`, this.getLocationStructure.bind(this));
    }

    private getLocationStructure(req: express.Request, res: express.Response): void {
        const locationId = req.params.locationId;

        SmartOfficeRepository.getInstance()
            .getLocationStructure(locationId)
            .then(stations => {
                res.status(HttpStatus.OK).json(stations);
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
    }
}

export default AdminController;
