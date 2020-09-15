var mqtt = require('mqtt')
var client;
module.exports = class MqttListener {
    
    constructor(){
        client = mqtt.connect(process.env.BROKERURL)
        console.log('opaaaa')
        client.on('connect', function(){
            client.subscribe('signals/#')
        })
    }

    listen(callback){
        client.on('message', function (topic, message){
            if(!!message){
                callback(topic, message.toString())
            }
        });
    }
}