import { sync } from "glob";
import { union } from "lodash";

export default class Config {

    // 
    // Default port
    public static port: number = 3000;

    // 
    // Routes and models
    public static routes: string = "./dist/**/**/*.route.js";
    public static models: string = "./dist/**/**/*.model.js";

    /**
     * Glob files
     * return all files in a given location
     * @param {String} location 
     */
    public static globFiles(location: string): string[] {
        return union([], sync(location));
    }
}