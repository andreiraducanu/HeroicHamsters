import express from 'express';
import Controller from './Controller';
import Room from '../models/Room';

class RoomController implements Controller {
    public rootPath = '/rooms';
    public router = express.Router();

    private roomModel = new Room().setModelForClass(Room);

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
        this.roomModel
            .find()
            .then(rooms => {
                if (rooms.length == 0) {
                    res.status(this.HttpStatus_NoContent).send();
                } else {
                    res.status(this.HttpStatus_OK).json(rooms);
                }
            })
            .catch(err => {
                res.status(this.HttpStatus_BadRequest).send(err);
            });
    }

    private getById(req: express.Request, res: express.Response): void {
        const id = req.params.id;

        this.roomModel
            .findById(id)
            .then(room => {
                res.status(this.HttpStatus_OK).json(room);
            })
            .catch(() => {
                res.status(this.HttpStatus_NotFound).send();
            });
    }

    private update(req: express.Request, res: express.Response): void {
        const id = req.params.id;
        const newData = req.body;

        this.roomModel
            .findByIdAndUpdate(id, newData, { new: true })
            .then(updatedRoom => {
                res.status(this.HttpStatus_OK).json(updatedRoom);
            })
            .catch(err => {
                res.status(this.HttpStatus_BadRequest).send(err);
            });
    }

    private add(req: express.Request, res: express.Response): void {
        const room = new this.roomModel(req.body);
        room.save()
            .then(room => {
                res.status(this.HttpStatus_Created).json(room);
            })
            .catch(err => {
                res.status(this.HttpStatus_BadRequest).send(err);
            });
    }

    private delete(req: express.Request, res: express.Response): void {
        const id = req.params.id;

        this.roomModel
            .findByIdAndDelete(id)
            .then(() => {
                res.status(this.HttpStatus_NoContent).send();
            })
            .catch(err => {
                res.status(this.HttpStatus_BadRequest).send(err);
            });
    }
}

export default RoomController;
