/**
 * Event driven architecture / Observer pattern
 */

import EventEmitter from 'events';
import http from 'http';

// const myEmitter = new EventEmitter();

/**
 * Class which inherits the EventEmitter
 */
class Sales extends EventEmitter {
    constructor() {
        super(); // to access all the methods of parent class
    }
}

const myEmitter = new Sales();

myEmitter.on('newSale', () => {
    console.log('There was a new sale');
});

myEmitter.on('newSale', name => {
    console.log(`Customer Name: ${name}`);
});

myEmitter.emit('newSale', 'John'); // values can be binded with an event like this


///////////////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
    console.log('Request received!');
    console.log(req.url);
    res.end('Request received!');
});

server.on('request', (req, res) => {
    console.log('Another Request received!');
});

server.on('close', (req, res) => {
    console.log('Server closed!');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Waiting for requests...');
})