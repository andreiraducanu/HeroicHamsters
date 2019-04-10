import {Request,Response} from 'express';
export interface IController{
    
     getAll:(req:Request,res:Response)=>void;
     getByID:(req:Request,res:Response)=>void;
     add:(req:Request,res:Response)=>void;
     update:(req:Request,res:Response)=>void;
     delete:(req:Request,res:Response)=>void;

}
export default IController; //export the interface to be used in Food and Room controllers
