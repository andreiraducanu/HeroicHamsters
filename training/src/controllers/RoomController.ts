import { Request, Response, Router } from "express";
import { Inject, Provides } from "typescript-ioc";
import { RoomRepository } from "../controllers/RoomRepository";
import { Room } from "../models/RoomModel";
import { IControllerRepository } from "./IControllerRepository";

@Provides(RoomController)
export class RoomController {
    private router: Router;

    @Inject
    private roomRepository: RoomRepository;

    private roomModel;

    private readonly HttpStatus_NoContent = 204;

    private readonly HttpStatus_OK = 200;

    private readonly HttpStatus_BadRequest = 400;

    private readonly HttpStatus_NotFound = 404;

    private readonly HttpStatus_Created = 201;

    constructor() {
        this.router = Router();
        this.init();
        this.roomModel = new Room().getModelForClass(Room);
    }

    public getAll(req: Request, res: Response): void {
        this.roomRepository.getAll()
            .then(rooms => {
                if(rooms.length == 0) {
                    res.status(this.HttpStatus_NoContent).send();
                } else {
                    res.status(this.HttpStatus_OK).json(rooms)
                }
            })
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public getById(req: Request, res: Response): void {
        this.roomRepository.getById(req.params.id)
            .then(room => res.status(this.HttpStatus_OK).json(room))
            .catch(() => res.status(this.HttpStatus_NotFound).send());
    }

    public add(req: Request, res: Response): void {
        const newRoom = new this.roomModel(req.body);

        this.roomRepository.add(newRoom)
            .then(room => res.status(this.HttpStatus_Created).json(room))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    /*public add(document: Food): Promise<Food> {
        let newAirport = new this.foodModel(document);
        return newAirport.save();
    }*/

    public update(req: Request, res: Response): void {
        this.roomRepository.update(req.params.id, req.body)
            .then(updatedFood => res.status(this.HttpStatus_OK).json(updatedFood))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public delete(req: Request, res: Response): void {
        this.roomRepository.delete(req.params.id)
            .then(() => res.status(this.HttpStatus_NoContent).send())
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }


    private init(): any {
        this.router.get('/', this.getAll.bind(this))
            .get('/:id', this.getById.bind(this))
            .post('/', this.add.bind(this))
            .put('/:id', this.update.bind(this))
            .delete('/:id', this.delete.bind(this));
    }

    public getRoutes(): Router {
        return this.router;
    }
}