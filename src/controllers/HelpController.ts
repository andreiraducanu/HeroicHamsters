import express from 'express';
import Controller from './Controller';

import HttpStatus from '../utils/HttpStatus';

import data from '../resources/data.json';

class HelpController implements Controller {
    public rootPath = '/help';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(`${this.rootPath}/create`, this.create.bind(this));
    }

    private create(req: express.Request, res: express.Response): void {
        // aici va fi logica pt inserare

        res.status(HttpStatus.OK).send('values inserted into database');
    }
}

export default HelpController;
