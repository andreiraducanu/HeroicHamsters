import  * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import {RoomsController} from "./controllers/RoomsController";
import { Inject } from "typescript-ioc";
import { FoodController } from './controllers/FoodController';
import { StockController } from './controllers/StockController';

 export class App{
    

     //initialise app's main components
     constructor(){
         this.app=express();
         this.config();
         this.mongoInit();
         this.routes();
     }

      public app:express.Application ;

      @Inject
      private roomsController!: RoomsController;
      @Inject
      private foodController!:FoodController;
      @Inject
      private stockController!:StockController;

      //connect to mongodb at localhost port 27017 trainingapp
     private mongoInit():void{
        mongoose.connect('mongodb://localhost:27017/trainingapp',{useNewUrlParser:true})
                        .then(()=>{
                        },(error)=>{
                            console.log('Cannot connect to MongoDB: '+error);
                        });
    }
    
     //use a bodyparser to parse the data
     private config() :void{ 
          this.app.use(bodyParser.json({type:'application/json'}));
     }
      
     //to use the routes of the controllers
     private routes():void{
        this.app.use('/',this.roomsController.getRoutes());
         this.app.use('/',this.foodController.getRoutes());
         this.app.use('/',this.stockController.getRoutes());
     }
 }

  export default new App().app;//default export to use in servertraining.ts