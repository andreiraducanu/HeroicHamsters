import express from 'express';
import Controller from './Controller';

import moment from 'moment';
import HttpStatus from '../utils/HttpStatus';
import { ElementType } from '../utils/Enums';

import ElementModel from '../models/Element.model';
import QuantityHistoryRepository from '../repositories/QuantityHistoryRepository';
import QuantityHistoryModel from '../models/QuantityHistory.model';

class HelpController implements Controller {
    public rootPath = '/help';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(`${this.rootPath}/generate`, this.generateHistory.bind(this));
    }

    private generateHistory(req: express.Request, res: express.Response): void {
        this.history().then(msg => res.status(HttpStatus.OK).send(msg));
    }

    private async history(): Promise<string> {
        let elements = await ElementModel.find({ type: ElementType.ITEM }).exec();

        for (let j = 0; j < 365; j++) {
            let newDate = moment('2018-06-06')
                .add(j, 'day')
                .toDate();
            let quantity = Math.floor(Math.random() * 20 + 40);

            elements.forEach(element => {
                console.log(quantity);

                let document = {
                    elementId: element,
                    name: element.name,
                    quantity: quantity,
                    date: newDate,
                };

                let newHistory = new QuantityHistoryModel(document);
                newHistory.save();
            });
        }

        return 'ok';
    }
}

export default HelpController;
