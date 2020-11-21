const db = require("../models/basemongooseconfig")
const Message = db.messages
module.exports = class MessageFormatter {
    formatMessage(topic, message) {
        var formattedMessage = new Message()
        formattedMessage.datetime = Date.now()
        if (!!topic) {
            var identifiers = topic.split('/')
            if (identifiers.count > 4) {
                console.log("invalid format")
            } else {

                formattedMessage.topic = topic;
                formattedMessage.ambienteId =  identifiers[1];
                formattedMessage.sensorId = identifiers[2];
                formattedMessage.parameter =identifiers[3];
                formattedMessage.value = message.toString();
                return formattedMessage;
            }
        }
        return null;
    }

}
