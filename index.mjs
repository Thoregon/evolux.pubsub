import {Matter} from "../evolux.matter/index.mjs";

/**
 *
 *
 * @author: Bernhard Lukassen
 */


const myuniverse = (() => {
    // this is a cryptic way to get the 'global' object or 'window' in strict mode. direct code references will throw an error
    const space = (1,eval)("this");
    return space.universe ? space.universe : space;
})();

import Registry                     from "./lib/registry.mjs";
export { default as Registry }      from './lib/registry.mjs';
export { default as EventEmitter }  from './lib/eventemitter.mjs'

export const service = {
    install() {
        console.log('** pubsub install()');
        myuniverse.pubsub = new Registry();
    },

    uninstall() {
        console.log('** pubsub uninstall()');
        myuniverse.pubsub.unregisterAll();
        delete handle().pubsub;
    },

    resolve() {
        console.log('** pubsub resolve()');
        // nothing to do
    },

    start() {
        console.log('** pubsub start()');
        myuniverse.pubsub.resumeAll();
    },

    stop() {
        console.log('** pubsub stop()');
        myuniverse.pubsub.pauseAll();
    },

    update() {
        console.log('** pubsub update()');
        this.stop();
        let saved = myuniverse.pubsub.entries;
        this.uninstall();
        this.install();
        myuniverse.pubsub.reregister(...saved);
    }
};
