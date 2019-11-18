/**
 * defines all errors used in pubsub
 *
 * @author: blukassen
 */
import { EError }       from '/evolux.supervise';
import { className }    from "/evolux.util";

export const ErrNotImplemented          = (msg)             => new EError(`Not implemented: ${msg}`, "PUBSUB:00001");
export const ErrEmitterRegistered       = (emitter, id)     => new EError(`Emitter already registered: ${className(emitter)} (${id}))`, "PUBSUB:00002", null, id, emitter);
export const ErrNotAListener            = (msg)             => new EError(`Listener must be a function, can't be added: ${msg}`, "PUBSUB:00003");
export const ErrUnknownEvent            = (name, emitter)   => new EError(`Event '${msg}' from ${className(emitter)} unknown`, "PUBSUB:00004", null, name, emitter);

