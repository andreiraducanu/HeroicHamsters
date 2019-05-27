import express from 'express';
import Controller from './Controller';

import HttpStatus from '../utils/HttpStatus';

import RequestRepository from '../repositories/RequestRepository';
import NotificationRepository from '../repositories/NotificationRepository';
import NodeRepository from '../repositories/NodeRepository';

class UserController implements Controller {
    public rootPath = '/user';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(`${this.rootPath}/stations/:stationId`, this.getStation.bind(this));

        this.router.post(`${this.rootPath}/requests/add`, this.submitRequest.bind(this));
        this.router.post(`${this.rootPath}/notifications/add`, this.submitItemNotification.bind(this));
    }

    /* Route for getting station structure */
    private getStation(req: express.Request, res: express.Response): void {
        const stationId = req.params.stationId;

        NodeRepository.getInstance()
            .getStationNode(stationId)
            .then(station => {
                res.status(HttpStatus.OK).json(station);
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
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

        NotificationRepository.getInstance()
            .add(document)
            .then(notification => {
                res.status(HttpStatus.OK).json(notification);
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
    }
}

export default UserController;
