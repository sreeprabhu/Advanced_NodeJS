import fs from 'fs';
import crypto from 'crypto';
/**
 * Eventloop continues to run until all timers and/or I/O tasks are completed
 * Eventloop phases
 *      Expired timer callbacks
 *      I/O polling and callbacks
 *      setImmediate callbacks
 *      Close callbacks
 */

const startTime = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log("Timer 1 finished"), 0); // Not running in eventloop as they are not part of any callbacks

setImmediate(() => console.log("Immediate 1 finished")); // Not running in eventloop as they are not part of any callbacks

fs.readFile('./txt/final.txt', () => {
    console.log("I/O finished");
    console.log("-------------");

    setTimeout(() => console.log("Callback ==> Timer 2 finished"), 0);
    setTimeout(() => console.log("Callback ==> Timer 3 finished"), 3000);
    setImmediate(() => console.log("Callback ==> Immediate 2 finished")); // executed immediately after the I/O tasks are completed

    process.nextTick(() => console.log("Process.nextTick")); // gets executed after each phase of event loop, not after the completion of the entire event loop phases

    // pbkdf2Sync will block the remaining codes, as it won't be executed in the eventloop, instea on the NodeJS single thread
    crypto.pbkdf2('pasword', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - startTime, "Password encrypted");
    });

    crypto.pbkdf2('pasword', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - startTime, "Password encrypted");
    });

    crypto.pbkdf2('pasword', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - startTime, "Password encrypted");
    });

    crypto.pbkdf2('pasword', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - startTime, "Password encrypted");
    });
})

console.log("Hello from top-level code");

