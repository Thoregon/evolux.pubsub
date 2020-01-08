/**
 *
 *
 * @author: blukassen
 */
import { myevolux }             from "/evolux.universe";

import BaseEventEmitter         from "./baseeventemitter.mjs";
import Registry                 from "./registry.mjs";

// init at all circumatances, even if it exists only in this context; the registry is neccessary
const registry = (() => {
    const space = myevolux();  // init a 'global' object
    return (space.pubsub) ? space.pubsub : new Registry();
})();


export default class EventEmitter extends BaseEventEmitter {

    constructor() {
        super();
        registry.register(this);
    }

}
