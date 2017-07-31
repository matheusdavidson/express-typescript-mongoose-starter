import { Router, Request, Response, NextFunction } from 'express';
import ExampleController from './example.controller';

export class ExampleRouter {

    public router: Router


    /*--------  Constructor  --------*/


    constructor() {

        // 
        // Set router
        this.router = Router();
        this.init();
    }


    /*--------  Methods  --------*/


    /**
     * Init all routes in this router
     */
    init() {
        this.router.get('/', ExampleController.getAll);
        this.router.post('/', ExampleController.create);
    }

}

// 
// Create Router and export its configured Express.Router
const exampleRoutes = new ExampleRouter();
exampleRoutes.init();

export default exampleRoutes.router;