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
        this.router.get(`${this.rootPath}/location`, this.getLocationStructure.bind(this));

        SmartOfficeRepository.getInstance().updateCache();
    }

    private getLocationStructure(req: express.Request, res: express.Response): void {
        const data = SmartOfficeRepository.getInstance().getLocationStructure();

        if (data != null) res.status(HttpStatus.OK).json(data);
        else res.status(HttpStatus.BadRequest).send();
    }
}

export default AdminController;
