import express from 'express';
import Controller from './Controller';

import HttpStatus from '../utils/HttpStatus';

import RequestRepository from '../repositories/RequestRepository';
import ItemRepository from '../repositories/ItemRepository';
import CategoryRepository from '../repositories/CategoryRepository';
import LocationRepository from '../repositories/LocationRepository';
import NotificationRepository from '../repositories/NotificationRepository';
import MessageRepository from '../repositories/MessageRepository';

class UserController implements Controller {
    public rootPath = '/user';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(`${this.rootPath}/elements`, this.getElements.bind(this));
        this.router.get(`${this.rootPath}/locations/:id`, this.getLocation.bind(this));
        this.router.get(`${this.rootPath}/notifications`, this.getNotificationsByFilters.bind(this));
        this.router.get(`${this.rootPath}/messages`, this.getMessagesByFilters.bind(this));
        this.router.get(`${this.rootPath}/search/:name`, this.searchItem.bind(this));

        this.router.post(`${this.rootPath}/requests`, this.submitRequest.bind(this));
        this.router.post(`${this.rootPath}/notifications`, this.submitNotification.bind(this));
    }

    /* Route for gettinge the location */
    private getLocation(req: express.Request, res: express.Response): void {
        const id = req.params.id;

        LocationRepository.getInstance()
            .getById(id)
            .then(location => {
                res.status(HttpStatus.OK).json(location);
            })
            .catch(() => {
                res.status(HttpStatus.NoContent).send();
            });
    }

    /* Route for getting notifications using filters */
    private getNotificationsByFilters(req: express.Request, res: express.Response): void {
        const filters = req.body;

        NotificationRepository.getInstance()
            .getByFilters(filters)
            .then(notifications => {
                if (notifications.length == 0) res.status(HttpStatus.NotFound).send();
                else res.status(HttpStatus.OK).json(notifications);
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
    }

    /* Route for getting messages using filters */
    private getMessagesByFilters(req: express.Request, res: express.Response): void {
        const filters = req.body;

        MessageRepository.getInstance()
            .getByFilters(filters)
            .then(messages => {
                if (messages.length == 0) res.status(HttpStatus.NotFound).send();
                else res.status(HttpStatus.OK).json(messages);
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
    }

    /* Route for getting the structure of elements */
    private getElements(req: express.Request, res: express.Response): void {
        CategoryRepository.getInstance()
            .getStructure()
            .then(root => {
                res.status(HttpStatus.OK).json(root);
            })
            .catch(() => {
                res.status(HttpStatus.NoContent).send();
            });
    }

    /* Route for searching items by name */
    private searchItem(req: express.Request, res: express.Response): void {
        const query = req.params.name;

        ItemRepository.getInstance()
            .search(query)
            .then(items => {
                if (items.length == 0) res.status(HttpStatus.NotFound).send();
                else res.status(HttpStatus.OK).json(items);
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
