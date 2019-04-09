import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { FoodController } from "./controllers/FoodController";
import { RoomController } from "./controllers/RoomController";
import { config, IocContainerConfig } from "./config";
import { Inject } from "typescript-ioc";

export class App {

    private app: express.Application;

    @Inject
    private roomController: RoomController;
    
    @Inject
    private foodController: FoodController;

    constructor(dbUrl?: string) {
        this.app = express();

        this.config();
        this.mongoConfig(dbUrl);

        this.routes();


        this.app.get("/", (req, res) => {
            res.send('Hello World!');
        });
        
    }


    private config(): void {
        this.app.use(bodyParser.json({ type: 'application/json' }));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        IocContainerConfig.configure();
    }

    private mongoConfig(url?: string): void {
        const { db: { host, port, name } } = config;
        const mongoUrl = url || `mongodb://${host}:${port}/${name}`;

        mongoose.set('useFindAndModify', false);
        mongoose.connect(mongoUrl, { useNewUrlParser: true })
            .then(() => {
                
            }, (error) => {
                console.log('Connection to MongoDB failed. Reason: ')
                console.log(error);
            });
    }

    private routes(): void {
        this.app.use('/api/v1/rooms', this.roomController.getRoutes());
        this.app.use('/api/v1/foods', this.foodController.getRoutes());
    }

    public getExpressApp(): express.Application {
        return this.app;
    }
}