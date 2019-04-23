import express from 'express';
import Controller from './Controller';
import Request from '../models/Request';

class RequestController implements Controller {
    public rootPath = '/requests';
    public router = express.Router();

    private requestModel = new Request().setModelForClass(Request);

    private readonly HttpStatus_NoContent = 204;

    private readonly HttpStatus_OK = 200;

    private readonly HttpStatus_BadRequest = 400;

    private readonly HttpStatus_NotFound = 404;

    private readonly HttpStatus_Created = 201;

    constructor() {
        this.initRoutes(); 
    }

    private initRoutes(): void {
        // this.router.get(this.rootPath, this.getAll.bind(this));
        // this.router.get(`${this.rootPath}/:id`, this.getById.bind(this));
        // this.router.put(`${this.rootPath}/:id`, this.update.bind(this));
        this.router.post(this.rootPath, this.add.bind(this));
        // this.router.delete(`${this.rootPath}/:id`, this.delete.bind(this));
    }

    private add(req: express.Request, res: express.Response): void {
        const request = new this.requestModel(req.body);
        request.save()
            .then(request => {
                res.status(this.HttpStatus_Created).json(request);
            })
            .catch(err => {
                res.status(this.HttpStatus_BadRequest).send(err);
            });
    }
}

export default RequestController;