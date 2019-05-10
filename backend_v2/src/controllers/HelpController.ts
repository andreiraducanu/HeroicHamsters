import express from 'express';
import Controller from './Controller';

import HttpStatus from '../utils/HttpStatus';

import HelpRepository from '../repositories/HelpRepository';

class HelpController implements Controller {
    public rootPath = '/help';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(`${this.rootPath}/create`, this.create.bind(this));
        this.router.get(`${this.rootPath}/delete`, this.delete.bind(this));
    }

    private create(req: express.Request, res: express.Response): void {
        HelpRepository.getInstance()
            .populate()
            .then(msg => {
                res.status(HttpStatus.OK).send(msg);
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
    }

    private delete(req: express.Request, res: express.Response): void {
        HelpRepository.getInstance()
            .deleteAll()
            .then(msg => {
                res.status(HttpStatus.OK).send(msg);
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
    }
}

export default HelpController;
