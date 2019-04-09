import { Request, Response, Router } from "express";
import { Inject, Provides } from "typescript-ioc";
import { FoodRepository } from "../controllers/FoodRepository";
import { Food } from "../models/FoodModel";
import { IControllerRepository } from "./IControllerRepository";

@Provides(FoodController)
export class FoodController {
    private router: Router;

    @Inject
    private foodRepository: FoodRepository;

    private foodModel;

    private readonly HttpStatus_NoContent = 204;

    private readonly HttpStatus_OK = 200;

    private readonly HttpStatus_BadRequest = 400;

    private readonly HttpStatus_NotFound = 404;

    private readonly HttpStatus_Created = 201;

    constructor() {
        this.router = Router();
        this.init();
        this.foodModel = new Food().getModelForClass(Food);
    }

    public getAll(req: Request, res: Response): void {
        this.foodRepository.getAll()
            .then(foods => {
                if(foods.length == 0) {
                    res.status(this.HttpStatus_NoContent).send();
                } else {
                    res.status(this.HttpStatus_OK).json(foods)
                }
            })
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public getById(req: Request, res: Response): void {
        this.foodRepository.getById(req.params.id)
            .then(food => res.status(this.HttpStatus_OK).json(food))
            .catch(() => res.status(this.HttpStatus_NotFound).send());
    }

    public add(req: Request, res: Response): void {
        const newFood = new this.foodModel(req.body);

        this.foodRepository.add(newFood)
            .then(food => res.status(this.HttpStatus_Created).json(food))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    /*public add(document: Food): Promise<Food> {
        let newAirport = new this.foodModel(document);
        return newAirport.save();
    }*/

    public update(req: Request, res: Response): void {
        this.foodRepository.update(req.params.id, req.body)
            .then(updatedFood => res.status(this.HttpStatus_OK).json(updatedFood))
            .catch(err => res.status(this.HttpStatus_BadRequest).send(err));
    }

    public delete(req: Request, res: Response): void {
        this.foodRepository.delete(req.params.id)
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