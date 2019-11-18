/**
 * handle for dispatching events
 *
 * @author: Bernhard Lukassen
 */

import { isFunction }                       from "/evolux.util";
import { ErrNotAListener, ErrUnknownEvent } from "./errors.mjs";

export default class Dispatcher {

    constructor({
                    registry,
                    entry,
                    paused = false
                } = {}) {
        Object.assign(this, { registry, entry, paused });

        const emitter = entry.emitter;
        Object.entries(emitter.publishes).forEach(([name, descriptor]) => this.entry.events[name] = { descriptor, listeners: [] });
    }

    // **** admin

    pause() {
        this.paused = true;
    }

    resume() {
        this.paused = false;
    }

    // **** setup

    on(eventname, listener) {
        const entry = this.entry;
        if (!entry.events[eventname])   throw ErrUnknownEvent(eventname, entry.emitter);
        if (!isFunction(listener))      throw ErrNotAListener(listener ? listener.toString() : '<undefined>');
        const handler = entry.events[eventname];
        handler.listeners.push(listener);
        this.registry.emit('on', { event: eventname, listener });
    }

    off(eventname, listener) {
        const entry = this.entry;
        if (!entry.events[eventname]) throw ErrUnknownEvent(eventname, entry.emitter);
        const b4len = handler.listeners.length;
        handler.listeners = handler.listeners.filter(item => item !== listener);
        // check if it was really removed
        if (b4len < handler.listeners.length) this.registry.emit('off', { event: eventname, listener });
    }

    removeAll(eventname) {
        const entry = this.entry;
        if (!entry.events[eventname]) throw ErrUnknownEvent(eventname, entry.emitter);
        const handler = entry.events[eventname];
        handler.listeners.forEach(listener => this.registry.emit('off', { event: eventname, listener }));
        handler.listeners = [];
    }

    // **** perform

    emit(eventname, payload) {
        if (this.paused) return;
        const entry = this.entry;
        if (!entry.events[eventname]) throw ErrUnknownEvent(eventname, entry.emitter);
        const listeners = entry.events[eventname].listeners;

        // todo: handle 'error' events without listeners
        listeners.forEach(async listener => {
            const event = { event: eventname, payload };   // each listener get's it's own event object to avoid side effects
            this._exec(listener, event);
        })

    }

    async _exec(listener, event) {
        const registry = this.registry;
        registry.before(event, listener);
        try {
            // execute each listener async
            Promise.resolve(listener(event));   // todo: run in separate context (vm)
        } catch (e) {
            // todo: proper logging of errors
            console.error('Dispatcher Error', e.stack ? e.stack : e.message);
        }
        registry.after(event, listener);
    }
}
