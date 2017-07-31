import { Request, Response, NextFunction } from 'express';
import Model from './example.model';

export default class ExampleController {

    /**
     * Get all
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    public static async getAll(req: Request, res: Response, next: NextFunction) {

        try {

            // 
            // Get data
            let result = await Model.find().exec();

            // 
            // Response
            res.send({
                message: 'it works! We got all examples',
                result: result
            });
        } catch (err) {

            // 
            // Error response
            res.send({
                message: 'Could not get Examples',
                err: err
            });
        }
    }

    /**
     * Create
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    public static async create(req: Request, res: Response, next: NextFunction) {

        // 
        // Create model
        let model = new Model({
            title: 'Test title',
            subtitle: 'test subtitle'
        });

        // 
        // Save
        await model.save();

        res.send({
            message: 'Created!',
            model: model
        });
    }
}