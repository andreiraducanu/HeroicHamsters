import { Router } from 'express';

interface Controller {
    rootPath: string;
    router: Router;
}

export default Controller;