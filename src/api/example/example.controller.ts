import { Request, Response, NextFunction } from 'express';

export default class ExampleController {

    /**
     * GET all
     */
    public static getAll(req: Request, res: Response, next: NextFunction) {
        res.send({
            message: 'it works! We are in the example route'
        });
    }
}