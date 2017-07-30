import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import config from "./config";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as mongoose from "mongoose";

class Express {

    public express: express.Express;
    private envFile = 'src/.env';


    /*--------  Constructor  --------*/


    constructor() {

        // 
        // ENV
        this.setEnv();

        // 
        // Mongo
        this.connectToMongo();

        // 
        // Start App
        this.express = express();

        // 
        // Set view engine
        this.setViewEngine();

        // 
        // Middleware
        this.setMiddleware();

        // 
        // Set static files
        this.setStaticFiles();
    }


    /*--------  Methods  --------*/


    /**
     * Set env
     * Set env from .env or .env.${NODE_ENV} file using dotenv
     */
    private setEnv() {

        // 
        // Add NODE_ENV to path if is not production
        if (process.env.NODE_ENV !== 'production') this.envFile += '.' + process.env.NODE_ENV;

        // 
        // Set env from file
        dotenv.config({ path: this.envFile });
    }

    /**
     * Connect to mongo
     */
    private connectToMongo() {

        // 
        // Connect to mongo using mongoose
        // @todo: fix "open()" DeprecationWarning warning
        mongoose.connect(process.env.MONGO_URI, {
            db: { safe: true }
        });
    }

    /**
     * Set view engine
     */
    private setViewEngine() {

        // 
        // Configure ejs as view engine
        this.express.set("views", path.join(__dirname, "../../src/views"));
        this.express.set("view engine", "ejs");
    }

    /**
     * Set middleware
     */
    private setMiddleware() {

        // 
        // Add logging
        this.express.use(logger("dev"));

        // 
        // Add body parser
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));

        // 
        // Add cookie parser
        this.express.use(cookieParser());

    }

    /**
     * Set static files
     */
    private setStaticFiles() {

        // 
        // Set static route for public folder
        this.express.use(express.static(path.join(__dirname, "../../src/public")));
    }
}

export default new Express().express;