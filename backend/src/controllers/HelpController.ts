import express from 'express';
import Controller from './Controller';

import HttpStatus from '../utils/HttpStatus';

import LocationRepository from '../repositories/LocationRepository';
import CategoryRepository from '../repositories/CategoryRepository';

export class HelpController implements Controller {
    public rootPath = '/help';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.post(`${this.rootPath}/locations`, this.generateLocations.bind(this));
        this.router.post(`${this.rootPath}/categories`, this.generateCategories.bind(this));
        //this.router.post(`${this.rootPath}/items`, this.generateItems.bind(this));

        this.router.delete(`${this.rootPath}/locations`, this.deleteLocations.bind(this));
        this.router.delete(`${this.rootPath}/categories`, this.deleteCategories.bind(this));

        this.router.get(`${this.rootPath}/locations`, this.getLocations.bind(this));
        this.router.get(`${this.rootPath}/categories`, this.getCategories.bind(this));
    }

    // --------------  LOCATIONS --------------
    private generateLocations(req: express.Request, res: express.Response): void {
        const amount = req.body.amount;

        this.populateLocations(amount)
            .then(() => {
                res.status(HttpStatus.OK).json({ status: 'values inserted' });
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
    }

    private async populateLocations(amount: number) {
        let companyName = 'Centric';

        for (let i = 0; i < amount; i++) {
            // eslint-disable-next-line no-mixed-operators
            let lvlIndexNR: number = Math.floor(Math.random() * (4 - 1) + 1);
            // eslint-disable-next-line no-mixed-operators
            let tableIndexNR: number = Math.floor(Math.random() * (6 - 3) + 3);

            let location = {
                companyName: companyName,
                levelIndex: lvlIndexNR,
                tableIndex: tableIndexNR,
            };

            let document = JSON.parse(JSON.stringify(location));
            await LocationRepository.getInstance().add(document);
        }
    }

    private deleteLocations(req: express.Request, res: express.Response): void {
        LocationRepository.getInstance()
            .deleteAll()
            .then(() => {
                res.status(HttpStatus.OK).send('All data has been erased');
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
    }

    //pentru a testa generateLocations
    private getLocations(req: express.Request, res: express.Response): void {
        LocationRepository.getInstance()
            .getAll()
            .then(locations => {
                if (locations.length == 0) {
                    //if there's no data in database send error message
                    res.status(HttpStatus.NoContent).send('There is no data in the database!');
                } else {
                    res.status(HttpStatus.OK).json(locations); //else send the data(print on screen)
                }
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err); //if error send error(print on screen)
            });
    }
    // ------------------ END LOCATIONS -----------------

    // ------------------ CATEGORIES ---------------------
    private generateCategories(req: express.Request, res: express.Response): void {
        const amount = req.body.amount;

        this.populateCategories(amount)
            .then(() => {
                res.status(HttpStatus.OK).json({ status: 'values inserted' });
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
    }

    private async populateCategories(amount: number) {
        var subCategories = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];

        for (let i = 0; i < amount; i++) {
            // eslint-disable-next-line no-mixed-operators
            let subcategoriesNR = Math.floor(Math.random() * (5 - 3) + 3);
            // eslint-disable-next-line no-mixed-operators
            let bigCategoryName = Math.floor(Math.random() * (100 - 0) + 0).toString();

            const parentNULL: undefined = null;

            let category = {
                name: bigCategoryName,
                parent: parentNULL,
            };

            let document = JSON.parse(JSON.stringify(category));
            await CategoryRepository.getInstance().add(document);

            // eslint-disable-next-line no-mixed-operators
            let subcategoriesIndex = Math.floor(Math.random() * (7 - 0) + 0);
            const parent = await CategoryRepository.getInstance().getLast();
            let j = 0;
            while (j < subcategoriesNR) {
                let subcategory = {
                    name: subCategories[subcategoriesIndex],
                    parent: parent,
                };

                let document = JSON.parse(JSON.stringify(subcategory));
                await CategoryRepository.getInstance().add(document);
                j++;
                subcategoriesIndex++;
            }
        }
    }

    private deleteCategories(req: express.Request, res: express.Response): void {
        CategoryRepository.getInstance()
            .deleteAll()
            .then(() => {
                res.status(HttpStatus.OK).send('All data has been erased');
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
    }

    private getCategories(req: express.Request, res: express.Response): void {
        CategoryRepository.getInstance()
            .getAll()
            .then(categories => {
                if (categories.length == 0) {
                    //if there's no data in database send error message
                    res.status(HttpStatus.NoContent).send('There is no data in the database!');
                } else {
                    res.status(HttpStatus.OK).json(categories); //else send the data(print on screen)
                }
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err); //if error send error(print on screen)
            });
    }

    // ------------------ END CATEGORIES ---------------------

    //private generateItems(req: express.Request, res: express.Response): void {}
}

export default HelpController;
