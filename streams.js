import fs from 'fs';
import http from 'http';
const server = http.createServer();

server.on('request', (req, res) => {
    // Solution 1
    // fs.readFile('./txt/final.txt', (err, data) => {
    //     if (err) console.error(err);
    //     // need to load the entire file content to memory and then only NodeJs can send the response
    //     res.end(data);
    // });

    // Solution 2
    // const readable = fs.createReadStream('./txt/start.txt');
    // whenevr a new chunk of data is avaialble the readable stream will emit a 'data' event
    // readable.on('data', chunk => {
        // response may not be able to write the chunks of data as fast as the readableStream is reading,
        // this is called back pressue, which can be overcomed by th next solution
        // res.write(chunk);
    // })

    // readable.on('end', () => {
    //     res.end();
    // });

    // readable.on('error', err => {
    //     console.error(err);
    //     res.statusCode = 500;
    //     res.end("File Not Found");
    // })

    // Solution 3
    /**
     * pipe operator is available in all readable streams and it allows us to pipe the output 
     * of a readable stream to right into the input of a writeable stream
     */

     const readable = fs.createReadStream('./txt/start.txt');
     readable.pipe(res);
     // readableSource.pipe(writeableDest)
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Stream Server Listening..')
})


/**
 * Streams are used to process (read/ write) data piece by piece (chunks)
 * without completing the whole read/ write operation, and therefore without keeping all data in memory.
 * eg.., youtube and netflix
 * perfect for large volumes of data, like video
 * more efficient for memory
 * Readable Streams: 
 *      streams from which we can read data.
 *      http req, fs read streams.
 *      streams are instances of EventEmitter class, imp events are data and end
 *      imp functions: pipe(), read()
 * Writable Streams:
 *      we can write data.
 *      http res, fs write streams.
 *      events: drain, finish
 *      functions: write(), end()
 */