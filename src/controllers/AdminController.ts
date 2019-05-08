import express from 'express';
import Controller from './Controller';

import HttpStatus from '../utils/HttpStatus';

import ElementRepository from '../repositories/ElementRepository';
import MessageRepository from '../repositories/MessageRepository';

class AdminController implements Controller {
    public rootPath = '/admin';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.post(`${this.rootPath}/elements`, this.addElement.bind(this));
        this.router.post(`${this.rootPath}/messages`, this.addMessage.bind(this));
    }

    private addElement(req: express.Request, res: express.Response): void {
        const document = req.body;

        ElementRepository.getInstance()
            .add(document)
            .then(item => {
                res.status(HttpStatus.OK).json(item);
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
    }

    private addMessage(req: express.Request, res: express.Response): void {
        const document = req.body;

        MessageRepository.getInstance()
            .add(document)
            .then(message => {
                res.status(HttpStatus.OK).json(message);
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
    }
}

export default AdminController;
