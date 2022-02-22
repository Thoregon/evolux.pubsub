/**
 *
 *
 * @author: blukassen
 */

import { ErrNotImplemented }    from "./errors.mjs";

export default class BaseEventEmitter {

    constructor() {
    }

    //**** rebuild original EventEmitter API to make

    on(eventname, listener) {
        this._dispatcher.on(eventname, listener);
        return this;
    }

    addEventListener(eventname, listener) {
        return this.addListener(eventname, listener);
    }

    addListener(eventname, listener) {
        this.on(eventname, listener);
        return this;
    }


    off(eventname, listener) {
        this._dispatcher.off(eventname, listener);
        return this;
    }


    removeListener(eventname, listener) {
        this.off(eventname, listener);
        return this;
    }

    removeAllListeners(eventname) {
        this._dispatcher.removeAll(eventname);
        return this;
    }

    emit(eventname, payload) {
        this._dispatcher.emit(eventname, payload);
        return this;
    }

    //**** add pub/sub API; only for topics, queues require a prior agreement
    subscribe(topic, listener) {
        this.on(topic, listener);
        return this;
    }

    publish(topic, payload) {
        this.emit((topic, payload));
        return this;
    }

    //**** implement by subclasses

    /**
     * which events will be published by this emitter
     * @return {Map<String,String> } published events - with the event name as key, and a description describing the event and the payload
     */
    get publishes() {
        throw ErrNotImplemented("EventEmitter.publishes()");
    }

    /**
     * event names only
     * @return {string[]}
     */
    eventNames() {
        const events = this.publishes;
        return Object.keys(events);
    }
}
