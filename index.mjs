
/**
 *
 *
 * @author: Bernhard Lukassen
 */

export { default as EventEmitter }  from './lib/eventemitter.mjs'
import Registry                     from "./lib/registry.mjs";
export { default as Registry }      from './lib/registry.mjs';

import { myuniverse, myevolux }     from "/evolux.universe";

export const service = {
    install() {
        myuniverse().logger.debug('** pubsub install()');
        // todo: introduce a service registry for the protouniverse to handle service instances before the serivce can be 'officially' installed.
        if (!myevolux().pubsub) myevolux().pubsub = new Registry();
    },

    uninstall() {
        myuniverse().logger.debug('** pubsub uninstall()');
        myuniverse().pubsub.unregisterAll();
        delete myevolux().pubsub;
    },

    resolve() {
        myuniverse().logger.debug('** pubsub resolve()');
        // nothing to do
    },

    start() {
        myuniverse().logger.debug('** pubsub start()');
        myevolux().pubsub.resumeAll();
    },

    stop() {
        myuniverse().logger.debug('** pubsub stop()');
        myevolux().pubsub.pauseAll();
    },

    update() {
        myuniverse().logger.debug('** pubsub update()');
/*
        this.stop();
        let saved = myevolux().pubsub.entries;
        this.uninstall();
        this.install();
        myevolux().pubsub.reregister(...saved);
*/
    }
};
