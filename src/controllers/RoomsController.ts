import {Request,Response, Router} from "express";
import IController from './IController';
import {RoomsTable,RoomsModel} from "../models/RoomsTable";



export class RoomsController implements IController{
    
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
                const reqRoom:RoomsTable=req.body;  //save data from user input
                const createdRoom=new RoomsModel(reqRoom);     //convert data to schema style  
                createdRoom.save()              //save data to schema
                                      .then(()=>{
                                                     res.status(this.HttpStatus_Created).send('Your request has been saved in the database!');//successful 
                                      })
                                      .catch((err)=>{
                                                     res.status(this.HttpStatus_BadRequest).send(err);//encountered error
                                      });
    }

    update(req:Request,res:Response):void{
            RoomsModel.findByIdAndUpdate(req.params.id,req.body)//for the requested id, update its values with the requested values
                                  .then(updatedRoom=>res.status(this.HttpStatus_Created).send(updatedRoom))//the data for the requested id was found and modified(print old data on screen)
                                  .catch((err)=>res.status(this.HttpStatus_BadRequest).send(err));//encountered error(print it on screen)
    }

    delete(req:Request,res:Response):void{
           RoomsModel.findByIdAndDelete(req.params.id)//for the requested id ->delete its data
                                 .then(success=>{if(success){//the data requested has been found and erased
                                        res.status(this.HttpStatus_OK).send('The requested data has been erased!');
                                 }
                                 else{
                                     res.status(this.HttpStatus_NotFound).send('We couldn\'t find your request for the id:'+req.params.id);//else the data hasn't been found
                                 }
                                })
                                .catch((err)=>res.status(this.HttpStatus_BadRequest).send(err));//encountered error
    }

    getAll(req:Request,res:Response):void{
        RoomsModel.find().exec()//get all data from database
                                     .then(rooms=>{
                                         if(rooms.length==0){   //if there's no data in database send error message
                                             res.status(this.HttpStatus_NoContent).send('There is no data in the database!');
                                         }else{
                                             res.status(this.HttpStatus_OK).json(rooms);  //else send the data(print on screen)
                                         }
                                     })
                                     .catch(err=>res.status(this.HttpStatus_BadRequest).send(err));//if error send error(print on screen)

    }

    getByID(req:Request,res:Response):void{
        RoomsModel.findById(req.params.id).exec()//search in database for the data that corresponds to the requested id
                              .then(rooms=>{
                                  if(rooms==null){//if the data for the requested id does not exist send message
                                      res.status(this.HttpStatus_NotFound).send('We couldn\'t find your request for the id:'+req.params.id);
                                  }else{
                                  res.status(this.HttpStatus_OK).json(rooms);//else the data was found(print it on screen)
                                  }
                               } )
                              .catch((err)=>res.status(this.HttpStatus_BadRequest).send(err));//encountered error(print it on screen)
    }

    private init():any{
        this.router.get('/rooms',this.getAll.bind(this))
                     .get('/rooms/:id',this.getByID.bind(this))
                    .post('/rooms',this.add.bind(this))
                    .put('/rooms/:id',this.update.bind(this))
                    .delete('/rooms/:id',this.delete.bind(this));
    }

    public getRoutes():Router{
        return this.router;
    }

}