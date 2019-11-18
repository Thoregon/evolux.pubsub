/**
 * An registry for registering and dispatching events.
 * Manly for monitoring of all events happens in the system/app
 *
 * @author: Bernhard Lukassen
 */

import Dispatcher                   from "./dispatcher.mjs";
import BaseEventEmitter             from "./baseeventemitter.mjs";

import { ErrEmitterRegistered }     from "./errors.mjs";

const myuniverse = (() => {
    // this is a cryptic way to get the 'global' object or 'window' in strict mode. direct code references will throw an error
    // todo: check if it works after context separation with 'vm'
    const space = (1,eval)("this");
    return space.universe ? space.universe : space;
})();

// ***************

export default class Registry extends BaseEventEmitter {

    constructor() {
        super();
        this._entries = {};
        this.register('PubSubRegistry', this);
    }

    register(id, emitter) {
        if (this._entries[id]) throw ErrEmitterRegistered(emitter, id);

        const entry         = { emitter, events: {} };
        const dispatcher    = new Dispatcher({ registry: this, entry });
        this._entries[id]   = dispatcher;
        emitter._dispatcher = dispatcher;

        this.emit('add', { id, emitter });

        return dispatcher;
    }

    unregister(emitter) {
        // todo
    }

    get entries() {
        return this._entries;
    }

    reregister(...preventries) {
        this._entries = preventries;
    }

    unregisterAll() {
        this.pauseAll();
        this._entries = {};
    }

    pauseAll() {
        this.emit('pause', {});
        this._dispatchers.forEach(entry => entry.pause());
    }

    resumeAll() {
        this._dispatchers.forEach(entry => entry.resume());
        this.emit('resume', {});
    }

    // **** hooks monitoring
    before(event, listener) {
        this.emit('before', { event, listener });
    }

    after(event, listener) {
        this.emit('after', { event, listener });
    }

    // **** EventEmitter implementation


    get publishes() {
        return {
            before: 'Before emitting event',
            after:  'After emitting event',
            add:    'Add an emitter',
            remove: 'Remove an emitter',
            on:     'Add a listener',
            off:    'Remove a listener',
            pause:  'Pause emitting events',
            resume: 'resume emitting events'
        };
    }

// **** private

    get _dispatchers() {
        return Object.values(this._entries);
    }
}

// todo: (re)define 'pubsub' after universe is inflated. currently inflation must have already been done.
if (!myuniverse.pubsub) myuniverse.pubsub = new Registry();
