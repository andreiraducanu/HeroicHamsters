import express from 'express';
import Controller from './Controller';

import HttpStatus from '../utils/HttpStatus';

import RequestRepository from '../repositories/RequestRepository';
import ElementRepository from '../repositories/ElementRepository';
import StationRepository from '../repositories/StationRepository';
import NotificationRepository from '../repositories/NotificationRepository';

class UserController implements Controller {
    public rootPath = '/user';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(`${this.rootPath}/stations`, this.getLocations.bind(this));
        this.router.get(`${this.rootPath}/elements`, this.getElements.bind(this));

        this.router.post(`${this.rootPath}/requests`, this.submitRequest.bind(this));
        this.router.post(`${this.rootPath}/notifications`, this.submitNotification.bind(this));
    }

    /* Route for gettinge all the stations */
    private getLocations(req: express.Request, res: express.Response): void {
        StationRepository.getInstance()
            .getAll()
            .then(stations => {
                if (stations.length == 0) res.status(HttpStatus.NotFound).send();
                else res.status(HttpStatus.OK).json(stations);
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
    }

    /* Route for getting all the elements */
    private getElements(req: express.Request, res: express.Response): void {
        ElementRepository.getInstance()
            .getElements()
            .then(elements => {
                res.status(HttpStatus.OK).json(elements);
            })
            .catch(err => {
                console.log(err);
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
    private submitNotification(req: express.Request, res: express.Response): void {
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
