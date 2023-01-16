
/**
 *
 *
 * @author: Bernhard Lukassen
 */

export { default as EventEmitter }  from './lib/eventemitter.mjs'
// import Registry                     from "./lib/registry.mjs";
// export { default as Registry }      from './lib/registry.mjs';

// import { tservices }                from "/evolux.universe";
//
// export const service = {
//     install() {
//         universe.logger.debug('** pubsub install()');
//         if (!tservices().pubsub) tservices().pubsub = new Registry();
//     },
//
//     uninstall() {
//         universe.logger.debug('** pubsub uninstall()');
//         universe.pubsub.unregisterAll();
//         delete tservices().pubsub;
//     },
//
//     resolve() {
//         universe.logger.debug('** pubsub resolve()');
//         // nothing to do
//     },
//
//     start() {
//         universe.logger.debug('** pubsub start()');
//         tservices().pubsub.resumeAll();
//     },
//
//     stop() {
//         universe.logger.debug('** pubsub stop()');
//         tservices().pubsub.pauseAll();
//     },
//
//     update() {
//         universe.logger.debug('** pubsub update()');
// /*
//         this.stop();
//         let saved = tservices().pubsub.entries;
//         this.uninstall();
//         this.install();
//         tservices().pubsub.reregister(...saved);
// */
//     }
// };
