import { Router, Request, Response, NextFunction } from 'express';
import ExampleRouter from '../api/example/example.router';

export default class Routes {

    public router: Router;
    private app;


    /*--------  Constructor  --------*/


    constructor(app) {

        // 
        // Set router
        this.router = Router();

        // 
        // Set app
        this.app = app;

        // 
        // Set all routes
        this.setAllRoutes();
    }


    /*--------  Methods  --------*/


    /**
     * Set all app routes
     */
    setAllRoutes() {


        /*--------  Set all custom routes here  --------*/


        // 
        // Your routes goes here
        this.app.use('/api/examples', ExampleRouter);


        /*--------  Main routes  --------*/


        // 
        // Set main route for any other route found
        this.setMainRoute();
    }

    /**
     * Set main route
     * this route will be used for all other routes not found before
     */
    private setMainRoute() {

        // 
        // All other routes should redirect to the index.html
        this.app.route('/*').get(this.index);
    }

    /**
     * Main route
     */
    private index(req: Request, res: Response, next: NextFunction) {
        res.json({
            message: 'Hello World!'
        });
    }

}