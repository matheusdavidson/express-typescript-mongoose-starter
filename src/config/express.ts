import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import config from "./config";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as mongoose from "mongoose";

export default function () {


    /*--------  Load environment variables from .env file  --------*/


    setEnv();


    /*--------  Connect to mongo  --------*/


    mongoose.connect(process.env.MONGO_URI, {
        db: { safe: true }
    });


    /*--------  Start App  --------*/


    // 
    // Start app
    var app: express.Express = express();


    /*--------  Models  --------*/


    // 
    // Get all models and import
    for (let model of config.globFiles(config.models)) {
        require(path.resolve(model));
    }


    /*--------  Logs, body, cokkie and public folder  --------*/


    // 
    // Configure pug as view engine
    app.set("views", path.join(__dirname, "../../src/views"));
    app.set("view engine", "ejs");

    // 
    // Add logging
    app.use(logger("dev"));

    // 
    // Add body parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // 
    // Add cookie parser
    app.use(cookieParser());

    // 
    // Set static route for public folder
    app.use(express.static(path.join(__dirname, "../../src/public")));


    /*--------  Routes  --------*/


    // 
    // Get all routs and import
    for (let route of config.globFiles(config.routes)) {
        require(path.resolve(route)).default(app);
    }


    /*--------  404  --------*/


    app.use((req: express.Request, res: express.Response, next: Function): void => {
        let err: Error = new Error("Not Found");
        next(err);
    });


    /*--------  Production error handler  --------*/


    app.use((err: any, req: express.Request, res: express.Response, next): void => {
        res.status(err.status || 500).render("error", {
            message: err.message,
            error: {}
        });
    });


    /*--------  Development error handler  --------*/


    if (app.get("env") === "development") {
        app.use((err: Error, req: express.Request, res: express.Response, next): void => {
            res.status(500).render("error", {
                message: err.message,
                error: err
            });
        });
    }

    return app;
};

function setEnv() {

    // 
    // Set path
    let path = 'src/.env';

    // 
    // Add env to path if is not production
    if (process.env.NODE_ENV !== 'production') path += '.' + process.env.NODE_ENV;

    // 
    // Set env
    dotenv.config({ path: path });

}