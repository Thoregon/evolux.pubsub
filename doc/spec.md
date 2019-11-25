pubsub
======

distinguish between internaly event handling e.g. to update UI
and inter process topic/queue handling e.g. MQTT/AMQP

##Publish/Subscribe used locally
immed UI update, stash User input and apply after update

###Events
subscribe to events on an EventEmitter ('on' and 'addListener'), async notification

API: on, off

###Broadcaster/Announcer/Discourser/Raconteur/Informer/Adviser
(Observable/Watchable/Participatory)
historic correct events, when listening the - relevant - events to reach the 
current state are replayed

API: observe, observes, forget

##Publish/Subscribe on global topics/queues
--> move to seperate package evolux.dynmq

###Queue
direct messages exchanged over a service
- direct recipients
- can reply
- full history

###Topic
messages sent over a service
- multiple recipients, recipients define what they receive
- no reply
- no histroy, messages start at listening

