import bodyParser from 'body-parser';
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Controller from './controllers/Controller';
import MongoDB from './utils/MongoDB';

class App {
    private PORT = process.env.PORT;
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();

        this.initConnectionToDB();
        this.initMiddlewares();
        this.initControllers(controllers);
    }

    /* start the server */
    public listen(): void {
        this.app.listen(this.PORT, () => {
            console.log(`[debug] server is running at port ${this.PORT}`);
        });
    }
    /* connect to MongoDB */
    private initConnectionToDB(): void {
        mongoose
            .connect(MongoDB.getConnectionURL(), { useNewUrlParser: true })
            .then(() => {
                console.log('[debug] connected to MongoDB Atlas');
            })
            .catch(() => {
                console.log('[debug] error connecting to MongoDB Atlas');
            });
    }

    /* enable Middlewares */
    private initMiddlewares() {
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
    }

    /* enable controllers and routes */
    private initControllers(controllers: Controller[]) {
        controllers.forEach(controller => {
            this.app.use('/api', controller.router);
        });
    }

    public getExpressApp(): express.Application {
        return this.app;
    }
}

export default App;
