require('dotenv').config();
const MqttListener = require("./services/mqttlistener")
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: process.env.CORSORIGIN || "http://localhost:8081"
};

const listener = new MqttListener();

listener.listen(function(topic, message){
    console.log(message);
});
app.use(cors(corsOptions));

app.use(bodyParser.json());

const db = require("./models/index");
db.mongoose.connect(db.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to the mongo")
}).catch(()=>{
    console.log("Cannot connect to the mongo", err);
    process.exit();
});



app.get("/", (request, response) => {
    console.log("get on '/'");
    response.json({message: "Hello World"});

});

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Server rodando na porta ${PORT}`);
});