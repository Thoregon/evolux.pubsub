/**
 *
 *
 * @author: blukassen
 */

import cuid                     from "/cuid";
import BaseEventEmitter         from "./baseeventemitter.mjs";
import Registry                 from "./registry.mjs";

const myuniverse = () => {
    // this is a cryptic way to get the 'global' object or 'window' in strict mode. direct code references will throw an error
    const space = (1,eval)("this");
    return space.universe ? space.universe : space;
};

// init at all circumatances, even if it exists only in this context; the registry is neccessary
const registry = (() => {
    const space = myuniverse();  // init a 'global' object
    return (space.pubsub) ? space.pubsub : new Registry();
})();


export default class EventEmitter extends BaseEventEmitter {

    constructor() {
        super();
        this._id = cuid();
        registry.register(this._id, this);
    }

}
