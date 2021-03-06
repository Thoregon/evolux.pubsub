/**
 * An registry for registering and dispatching events.
 * Manly for monitoring of all events happens in the system/app
 *
 * @author: Bernhard Lukassen
 */
import { tservices }               from "/evolux.universe";
import { Reporter }                 from "/evolux.supervise";

import Dispatcher                   from "./dispatcher.mjs";
import BaseEventEmitter             from "./baseeventemitter.mjs";

import { ErrEmitterRegistered }     from "./errors.mjs";

// ***************

export default class Registry extends Reporter(BaseEventEmitter) {

    constructor() {
        super();
        this._entries = [];
        this.register(this);
    }

    register(emitter) {
        if (this._entries.indexOf(emitter) > -1) throw ErrEmitterRegistered(emitter);

        const entry         = { emitter, events: {} };
        const dispatcher    = new Dispatcher({ registry: this, entry });
        emitter._dispatcher = dispatcher;
        this._entries.push(dispatcher);

        this.emit('add', { emitter });

        return dispatcher;
    }

    unregister(emitter) {
        const b4len = this._entries.length;
        this._entries = this._entries.filter(entry => entry !== emitter);
        // check if it was really removed
        if (b4len > this._entries.length) this.emit('remove', { emitter });
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
if (!tservices().pubsub) tservices().pubsub = new Registry();
