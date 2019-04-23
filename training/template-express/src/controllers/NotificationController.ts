import express from 'express';
import Controller from './Controller';
import Notification from '../models/Notification';

class NotificationController implements Controller {
    public rootPath = '/notifications';
    public router = express.Router();

    private notifModel = new Notification().setModelForClass(Notification);

    private readonly HttpStatus_NoContent = 204;

    private readonly HttpStatus_OK = 200;

    private readonly HttpStatus_BadRequest = 400;

    private readonly HttpStatus_NotFound = 404;

    private readonly HttpStatus_Created = 201;

    constructor() {
        this.initRoutes(); 
    }

    private initRoutes(): void {
        this.router.get(this.rootPath, this.getAll.bind(this));
        this.router.get(`${this.rootPath}/:id`, this.getById.bind(this));
        this.router.put(`${this.rootPath}/:id`, this.update.bind(this));
        this.router.post(this.rootPath, this.add.bind(this));
        this.router.delete(`${this.rootPath}/:id`, this.delete.bind(this));
    }

    private getAll(req: express.Request, res: express.Response): void {
        this.notifModel
            .find()
            .then(notif => {
                if (notif.length == 0) {
                    res.status(this.HttpStatus_NoContent).send();
                } else {
                    res.status(this.HttpStatus_OK).json(notif);
                }
            })
            .catch(err => {
                res.status(this.HttpStatus_BadRequest).send(err);
            });
    }

    private getById(req: express.Request, res: express.Response): void {
        const id = req.params.id;

        this.notifModel
            .findById(id)
            .then(notif => {
                res.status(this.HttpStatus_OK).json(notif);
            })
            .catch(() => {
                res.status(this.HttpStatus_NotFound).send();
            });
    }

    private update(req: express.Request, res: express.Response): void {
        const id = req.params.id;
        const newData = req.body;

        this.notifModel
            .findByIdAndUpdate(id, newData, { new: true })
            .then(updatedNotif => {
                res.status(this.HttpStatus_OK).json(updatedNotif);
            })
            .catch(err => {
                res.status(this.HttpStatus_BadRequest).send(err);
            });
    }

    private add(req: express.Request, res: express.Response): void {
        const notif = new this.notifModel(req.body);
        notif.save()
            .then(notif => {
                res.status(this.HttpStatus_Created).json(notif);
            })
            .catch(err => {
                res.status(this.HttpStatus_BadRequest).send(err);
            });
    }

    private delete(req: express.Request, res: express.Response): void {
        const id = req.params.id;

        this.notifModel
            .findByIdAndDelete(id)
            .then(() => {
                res.status(this.HttpStatus_NoContent).send();
            })
            .catch(err => {
                res.status(this.HttpStatus_BadRequest).send(err);
            });
    }
}

export default NotificationController;