/**
 *
 *
 * @author: blukassen
 */

class SubscriptionEvent {

    constructor(props) {
        this.from       = null;           // time when event happened
        this.items      = [];             // commands, added, removed, changed ...
        this.continued  = false;          // if there are so many items that the event will be split
    }

}
