
/**
 *
 *
 * @author: Bernhard Lukassen
 */

export { default as EventEmitter }  from './lib/eventemitter.mjs'
import Registry                     from "./lib/registry.mjs";
export { default as Registry }      from './lib/registry.mjs';

import { myuniverse }               from "/evolux.universe";

export const service = {
    install() {
        console.log('** pubsub install()');
        myuniverse().pubsub = new Registry();
    },

    uninstall() {
        console.log('** pubsub uninstall()');
        myuniverse().pubsub.unregisterAll();
        delete handle().pubsub;
    },

    resolve() {
        console.log('** pubsub resolve()');
        // nothing to do
    },

    start() {
        console.log('** pubsub start()');
        myuniverse().pubsub.resumeAll();
    },

    stop() {
        console.log('** pubsub stop()');
        myuniverse().pubsub.pauseAll();
    },

    update() {
        console.log('** pubsub update()');
        this.stop();
        let saved = myuniverse().pubsub.entries;
        this.uninstall();
        this.install();
        myuniverse().pubsub.reregister(...saved);
    }
};
