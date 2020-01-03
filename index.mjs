
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
        myuniverse().logger.debug('** pubsub install()');
        myuniverse().pubsub = new Registry();
    },

    uninstall() {
        myuniverse().logger.debug('** pubsub uninstall()');
        myuniverse().pubsub.unregisterAll();
        delete handle().pubsub;
    },

    resolve() {
        myuniverse().logger.debug('** pubsub resolve()');
        // nothing to do
    },

    start() {
        myuniverse().logger.debug('** pubsub start()');
        myuniverse().pubsub.resumeAll();
    },

    stop() {
        myuniverse().logger.debug('** pubsub stop()');
        myuniverse().pubsub.pauseAll();
    },

    update() {
        myuniverse().logger.debug('** pubsub update()');
        this.stop();
        let saved = myuniverse().pubsub.entries;
        this.uninstall();
        this.install();
        myuniverse().pubsub.reregister(...saved);
    }
};
