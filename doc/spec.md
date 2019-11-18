pubsub
======

distinguish between internaly event handling e.g. to update UI
and inter process topic/queue handling e.g. MQTT/AMQP

##Publish/Subscribe used locally
immed UI update, stash User input and apply after update

##Publish/Subscribe on global topics/queues
--> move to seperate package evolux.dynmq
