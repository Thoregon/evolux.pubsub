/**
 *
 *
 * @author: Bernhard Lukassen
 */

import EventEmitter from "../../lib/eventemitter.mjs";

class MyEmitter extends EventEmitter {

    get publishes() {
        return { test: 'test event' };
    }
}

const emitter = new MyEmitter();

emitter.on('test', (event) => {
    console.log("Listener for 'test'", JSON.stringify(event));
});

console.log("Before emit");
emitter.emit('test', { a: 'A' });
console.log("After emit");
