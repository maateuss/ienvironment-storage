require('dotenv').config();
const MqttListener = require("./services/mqttlistener")
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const listener = new MqttListener();
const db = require("./models/basemongooseconfig");
const MessageFormatter = require('./services/messageformat');
const app = express();
const PORT = process.env.PORT || 8080;
var Formatter = new MessageFormatter();

app.use(cors());

app.use(bodyParser.json());

db.mongoose.connect(db.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to the mongo")
    console.log("subscribing to listener")
    startListener();
}).catch(()=>{
    console.log("Cannot connect to the mongo", err);
    process.exit();
});

function startListener(){
listener.listen(function(topic, message){
    var message = Formatter.formatMessage(topic, message)
    if(!!message){
        message.save(message).then(()=>{
            console.log('saved!')
        }).catch((err)=>{
            console.error(err);
        })
    }
});
}



app.get("/", (request, response) => {
    console.log("get on '/'");
    response.json({message: "Hello World"});

});


app.listen(PORT, ()=>{
    console.log(`Server rodando na porta ${PORT}`);
});
