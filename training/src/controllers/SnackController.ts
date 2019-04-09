import express from 'express';
import Controller from './Controller';
import Snack from '../models/Snack';

class SnackController implements Controller {
    public rootPath = '/snacks';
    public router = express.Router();

    private snackModel = new Snack().setModelForClass(Snack);

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
        this.snackModel
            .find()
            .then(snacks => {
                if (snacks.length == 0) {
                    res.status(this.HttpStatus_NoContent).send();
                } else {
                    res.status(this.HttpStatus_OK).json(snacks);
                }
            })
            .catch(err => {
                res.status(this.HttpStatus_BadRequest).send(err);
            });
    }

    private getById(req: express.Request, res: express.Response): void {
        const id = req.params.id;

        this.snackModel
            .findById(id)
            .then(snack => {
                res.status(this.HttpStatus_OK).json(snack);
            })
            .catch(() => {
                res.status(this.HttpStatus_NotFound).send();
            });
    }

    private update(req: express.Request, res: express.Response): void {
        const id = req.params.id;
        const newData = req.body;

        this.snackModel
            .findByIdAndUpdate(id, newData, { new: true })
            .then(updatedSnack => {
                res.status(this.HttpStatus_OK).json(updatedSnack);
            })
            .catch(err => {
                res.status(this.HttpStatus_BadRequest).send(err);
            });
    }

    private add(req: express.Request, res: express.Response): void {
        const snack = new this.snackModel(req.body);
        snack
            .save()
            .then(snack => {
                res.status(this.HttpStatus_Created).json(snack);
            })
            .catch(err => {
                res.status(this.HttpStatus_BadRequest).send(err);
            });
    }

    private delete(req: express.Request, res: express.Response): void {
        const id = req.params.id;

        this.snackModel
            .findByIdAndDelete(id)
            .then(() => {
                res.status(this.HttpStatus_NoContent).send();
            })
            .catch(err => {
                res.status(this.HttpStatus_BadRequest).send(err);
            });
    }
}

export default SnackController;
