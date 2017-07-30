import * as http from 'http';
import * as debug from 'debug';
import Express from './config/express';


/*--------  Start App  --------*/


const port = normalizePort(process.env.PORT || 9000);
Express.set('port', port);

const server = http.createServer(Express);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/*--------  Methods  --------*/


/**
 * Normalize port
 * @param {*} val 
 */
function normalizePort(val: number | string): number | string | boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
}

/**
 * On error
 * callback event for createServer error
 * @param {*} error 
 */
function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;
    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * On listening
 * callback event for createServer listening
 */
function onListening(): void {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    console.info(`Listening on ${bind}`);
}