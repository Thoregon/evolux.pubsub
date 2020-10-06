
/**
 *
 *
 * @author: Bernhard Lukassen
 */

export { default as EventEmitter }  from './lib/eventemitter.mjs'
import Registry                     from "./lib/registry.mjs";
export { default as Registry }      from './lib/registry.mjs';

import { myuniverse, tservices }     from "/evolux.universe";

export const service = {
    install() {
        myuniverse().logger.debug('** pubsub install()');
        if (!tservices().pubsub) tservices().pubsub = new Registry();
    },

    uninstall() {
        myuniverse().logger.debug('** pubsub uninstall()');
        myuniverse().pubsub.unregisterAll();
        delete tservices().pubsub;
    },

    resolve() {
        myuniverse().logger.debug('** pubsub resolve()');
        // nothing to do
    },

    start() {
        myuniverse().logger.debug('** pubsub start()');
        tservices().pubsub.resumeAll();
    },

    stop() {
        myuniverse().logger.debug('** pubsub stop()');
        tservices().pubsub.pauseAll();
    },

    update() {
        myuniverse().logger.debug('** pubsub update()');
/*
        this.stop();
        let saved = tservices().pubsub.entries;
        this.uninstall();
        this.install();
        tservices().pubsub.reregister(...saved);
*/
    }
};
