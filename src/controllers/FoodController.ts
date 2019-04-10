import IController from './IController';
import {Request,Response,Router} from "express";
import {FoodTable,FoodModel} from "../models/FoodTable";



export class FoodController implements IController {

     private router:Router;

     private readonly HttpStatus_NoContent = 204;

    private readonly HttpStatus_OK = 200;

    private readonly HttpStatus_BadRequest = 400;

    private readonly HttpStatus_NotFound = 404;

    private readonly HttpStatus_Created = 201;

     constructor(){
           this.router=Router();
           this.init();
     }

           
     add(req:Request,res:Response):void{
          const reqFood:FoodTable=req.body;//save the data from the user
          const createdFood=new FoodModel(reqFood);//convert the data to FoodTable schema style

          createdFood.save()//save the request in database and send a message to confirm this action
                             .then(()=>res.status(this.HttpStatus_Created).send('Your request has been saved in the database!'))
                             .catch((err)=>res.status(this.HttpStatus_BadRequest).send(err));//encountered error(print it on screen)
     }

     update(req:Request,res:Response):void{
         FoodModel.findByIdAndUpdate(req.params.id,req.body)//for the requested id update its data
                            .then(updatedFood=>res.status(this.HttpStatus_OK).send(updatedFood))//print on screen the old data
                            .catch((err)=>res.status(this.HttpStatus_BadRequest).send(err));//encountered error(print it on screen)
     }

     delete(req:Request,res:Response):void{
          FoodModel.findByIdAndDelete(req.params.id)//search for the data corresponding to the requested id
                              .then(success=>{
                                   if(success){//the data has been found and deleted
                                        res.status(this.HttpStatus_OK).send('The data corresponding to the id '+req.params.id+' has been deleted!');
                                   }
                                   else{//the data was not found for the requested id
                                        res.status(this.HttpStatus_NotFound).send('We couldn\'t find your request for the id:'+req.params.id);
                                   }
                              })
                              .catch((err)=>res.status(this.HttpStatus_BadRequest).send(err));//encountered error(print it on screen)
     }

     getAll(req:Request,res:Response):void{
            FoodModel.find().exec()
                               .then(foods=>{
                                    if(foods.length==0){//no data has been found, the database is empty
                                         res.status(this.HttpStatus_NoContent).send('There is no data in the database!');
                                    }
                                    else{
                                         res.status(this.HttpStatus_OK).json(foods);//data has been found(print all on screen)
                                    }
                               })
                               .catch((err)=>res.status(this.HttpStatus_BadRequest).send(err));//encountered error(print it on screen)
     }

     getByID(req:Request,res:Response):void{
             FoodModel.findById(req.params.id).exec()//search for the requested id in database
                                .then(food=>{
                                     if(food==null){//the requested id doesn't exist in the database
                                          res.status(this.HttpStatus_NotFound).send('We couldn\'t find your request for the id:'+req.params.id);
                                     }
                                     else{//the requested id exists(print its data on screen)
                                          res.status(this.HttpStatus_OK).json(food);
                                     }
                                })
                                .catch((err)=>res.status(this.HttpStatus_BadRequest).send(err));//encountered error(print it on screen)
     }
 
     private init():any{
          this.router.get('/food',this.getAll.bind(this))
                           .get('/food/:id',this.getByID.bind(this))
                           .post('/food',this.add.bind(this))
                           .put('/food/:id',this.update.bind(this))
                           .delete('/food/:id',this.delete.bind(this));
     }
     
     public getRoutes():Router{
          return this.router;
     }
    
}