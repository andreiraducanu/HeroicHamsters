import express from 'express';
import Controller from './Controller';

import HttpStatus from '../utils/HttpStatus';

import RequestRepository from '../repositories/RequestRepository';
import SmartOfficeRepository from '../repositories/SmartOfficeRepository';

class UserController implements Controller {
    public rootPath = '/user';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(`${this.rootPath}/station/:stationId`, this.getStationStructure.bind(this));

        this.router.post(`${this.rootPath}/requests`, this.submitRequest.bind(this));
        this.router.post(`${this.rootPath}/notifications`, this.submitItemNotification.bind(this));
    }

    /* Route for getting all the elements */
    private getStationStructure(req: express.Request, res: express.Response): void {
        const stationId = req.params.stationId;

        const data = SmartOfficeRepository.getInstance().getStationStructure(stationId);

        if (data != null) res.status(HttpStatus.OK).json(data);
        else res.status(HttpStatus.BadRequest).send();
    }

    /* Route for submitting a request */
    private submitRequest(req: express.Request, res: express.Response): void {
        const document = req.body;

        RequestRepository.getInstance()
            .add(document)
            .then(request => {
                res.status(HttpStatus.OK).json(request);
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
    }

    /* Route for submitting a notification */
    private submitItemNotification(req: express.Request, res: express.Response): void {
        const document = req.body;

        SmartOfficeRepository.getInstance()
            .addItemNotification(document)
            .then(notification => {
                res.status(HttpStatus.OK).json(notification);
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
    }
}

export default UserController;
