import express from 'express';
import Controller from './Controller';

import HttpStatus from '../utils/HttpStatus';

import LocationRepository from '../repositories/LocationRepository';
import CategoryRepository from '../repositories/CategoryRepository';
import ItemRepository from '../repositories/ItemRepository';

export class HelpController implements Controller {
    public rootPath = '/help';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.post(`${this.rootPath}/locations`, this.generateLocations.bind(this));
        this.router.post(`${this.rootPath}/locations/:id`, this.generateLocationsByID.bind(this));
        this.router.post(`${this.rootPath}/categories`, this.generateCategories.bind(this));
        //this.router.post(`${this.rootPath}/items`, this.generateItems.bind(this));

        this.router.delete(`${this.rootPath}/locations`, this.deleteLocations.bind(this));
        this.router.delete(`${this.rootPath}/locations/:id`, this.deleteLocationsByID.bind(this));
        this.router.delete(`${this.rootPath}/categories`, this.deleteCategories.bind(this));
        //this.router.delete(`${this.rootPath}/categories/:id`, this.deleteCategoriesByID.bind(this));
        this.router.delete(`${this.rootPath}/items`, this.deleteLocations.bind(this));
        //this.router.delete(`${this.rootPath}/items/:id`, this.deleteItemsByID.bind(this));

        this.router.get(`${this.rootPath}/locations/getall`, this.getAllLocations.bind(this));
        this.router.get(`${this.rootPath}/categories/getall`, this.getAllCategories.bind(this));
        this.router.get(`${this.rootPath}/items/getall`, this.getAllItems.bind(this));
    }

    private generateLocations(req: express.Request, res: express.Response): void {
        const amount = req.body.count;

        this.populateLocations(amount)
            .then(() => {
                res.status(HttpStatus.OK).json({ status: 'values inserted' });
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
    }

    private async populateLocations(amount: number) {
        var companies = [
            'Centric',
            'Amazon',
            'BitDefender',
            'Sofvision',
            'Adobe Romania',
            'Continental',
            'Fitbit',
            'UiPath',
        ];

        for (let i = 0; i < amount; i++) {
            // eslint-disable-next-line no-mixed-operators
            let companyIndex: number = Math.floor(Math.random() * (8 - 1) + 1);
            // eslint-disable-next-line no-mixed-operators
            let lvlIndexNR: number = Math.floor(Math.random() * (4 - 1) + 1);
            // eslint-disable-next-line no-mixed-operators
            let tableIndexNR: number = Math.floor(Math.random() * (6 - 3) + 3);
            let companyName = companies[companyIndex];

            let location = {
                companyName: companyName,
                levelIndex: lvlIndexNR,
                tableIndex: tableIndexNR,
            };

            let document = JSON.parse(JSON.stringify(location));
            await LocationRepository.getInstance().add(document);
        }
    }

    private async populateLocationsByID(id: string) {
        var companies = [
            'Centric',
            'Amazon',
            'BitDefender',
            'Sofvision',
            'Adobe Romania',
            'Continental',
            'Fitbit',
            'UiPath',
        ];

        // eslint-disable-next-line no-mixed-operators
        let companyIndex: number = Math.floor(Math.random() * (8 - 0) + 0);
        // eslint-disable-next-line no-mixed-operators
        let lvlIndexNR: number = Math.floor(Math.random() * (4 - 1) + 1);
        // eslint-disable-next-line no-mixed-operators
        let tableIndexNR: number = Math.floor(Math.random() * (6 - 3) + 3);
        let companyName = companies[companyIndex];

        let location = {
            companyName: companyName,
            levelIndex: lvlIndexNR,
            tableIndex: tableIndexNR,
        };

        let document = JSON.parse(JSON.stringify(location));
        await LocationRepository.getInstance().update(id, document);
    }

    private generateLocationsByID(req: express.Request, res: express.Response): void {
        const id = req.params.id;

        this.populateLocationsByID(id)
            .then(() => {
                res.status(HttpStatus.OK).json({ status: 'values inserted' });
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
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

    private deleteLocationsByID(req: express.Request, res: express.Response): void {
        const id = req.params.id;
        LocationRepository.getInstance()
            .delete(id)
            .then(success => {
                if (success) {
                    //the data has been found and deleted
                    res.status(HttpStatus.OK).send(
                        'The data corresponding to the id ' + req.params.id + ' has been deleted!',
                    );
                } else {
                    //the data was not found for the requested id
                    res.status(HttpStatus.NotFound).send("We couldn't find your request for the id:" + req.params.id);
                }
            })
            .catch(err => res.status(HttpStatus.BadRequest).send(err)); //encountered error(print it on screen)
    }

    //pentru a testa generateLocations
    private getAllLocations(req: express.Request, res: express.Response): void {
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

    private generateCategories(req: express.Request, res: express.Response): void {
        const height = req.body.height;

        this.populateCategories(height)
            .then(() => {
                res.status(HttpStatus.OK).json({ status: 'values inserted' });
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
    }

    private async populateCategories(height: number) {
        var count: number, subcategoriesNR: number, i: number, j: number, k: number, lastCatNR: number;
        const rootNULL: undefined = null;
        let category = {
            name: 'Root',
            parent: rootNULL,
        };

        let document = JSON.parse(JSON.stringify(category));
        await CategoryRepository.getInstance().add(document);
        var parent = await CategoryRepository.getInstance().getRoot();
        var sameLevelID = [];

        for (i = 1; i < height; i++) {
            // eslint-disable-next-line no-mixed-operators
            subcategoriesNR = Math.floor(Math.random() * (5 - 3) + 3);

            if (sameLevelID.length == 0) {
                for (k = 0; k < subcategoriesNR; k++) {
                    // eslint-disable-next-line no-mixed-operators
                    let subCategoryName = Math.floor(Math.random() * (100 - 1) + 1).toString();

                    let subcategory = {
                        name: subCategoryName,
                        parent: parent,
                    };

                    let document = JSON.parse(JSON.stringify(subcategory));
                    await CategoryRepository.getInstance().add(document);
                    sameLevelID.push(await CategoryRepository.getInstance().getLastDocRoot());
                }
            } else {
                count = 0;
                for (j = 0; j < sameLevelID.length; ) {
                    if (count == lastCatNR) {
                        break;
                    } else {
                        parent = sameLevelID[j];
                        sameLevelID.splice(j, 1);
                        for (k = 0; k < subcategoriesNR; k++) {
                            // eslint-disable-next-line no-mixed-operators
                            let subCategoryName = Math.floor(Math.random() * (100 - 1) + 1).toString();

                            let subcategory = {
                                name: subCategoryName,
                                parent: parent,
                            };

                            let document = JSON.parse(JSON.stringify(subcategory));
                            await CategoryRepository.getInstance().add(document);
                            sameLevelID.push(await CategoryRepository.getInstance().getLastDocRoot());
                        }
                        count++;
                    }
                }
            }
            lastCatNR = subcategoriesNR;
        }
        for (i = 0; i < sameLevelID.length; i++) console.log(sameLevelID[i]);
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

    private getAllCategories(req: express.Request, res: express.Response): void {
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

    /*private generateItems(req: express.Request, res: express.Response): void {
        const amount = req.body.count;

        this.populateItems(amount)
            .then(() => {
                res.status(HttpStatus.OK).json('values inserted');
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err);
            });
    }
    
    private async populateItems(amount: number){
        var itemList = ['AB','BC','AC','AD','AA','AE','AV','BA','BC','BV','BB'];

        for(let i=0;i<amount;i++){

       const itemListIndex = Math.floor(Math.random() * (7 - 1) + 1);
       

       let item = {
        name: itemList[itemListIndex],
        urlImage: "image",
        description: "description",
        parent:  
       };

       let document = JSON.parse(JSON.stringify(item));
        ItemRepository.getInstance()
        .add(document)
        }
    }
*/
    private getAllItems(req: express.Request, res: express.Response): void {
        ItemRepository.getInstance()
            .getAll()
            .then(items => {
                if (items.length == 0) {
                    //if there's no data in database send error message
                    res.status(HttpStatus.NoContent).send('There is no data in the database!');
                } else {
                    res.status(HttpStatus.OK).json(items); //else send the data(print on screen)
                }
            })
            .catch(err => {
                res.status(HttpStatus.BadRequest).send(err); //if error send error(print on screen)
            });
    }
}

export default HelpController;
