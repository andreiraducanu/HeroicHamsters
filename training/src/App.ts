import bodyParser from 'body-parser';
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import Controller from './controllers/Controller';

class App {
    private readonly PORT = 3003;
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
            console.log(`Server is running at http://localhost:${this.PORT}`);
        });
    }

    /* connect to MongoDB */
    private initConnectionToDB(): void {
        mongoose.connect('mongodb://localhost:27017/training', { useNewUrlParser: true });
    }

    /* enable Middlewares */
    private initMiddlewares() {
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
    }

    /* enable controllers and routes */
    private initControllers(controllers: Controller[]) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }
}

export default App;
