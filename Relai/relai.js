import http from 'http';
import { connect } from "mqtt";
import Particle from 'particle-api-js';

const particle = new Particle();

const hostname = '127.0.0.1';
const port = 3001;

const TOKEN = "72ecdb3324a904ceebf149803f8194eb827300c5";
const ENTERED = "Entered";
const LEFT = "Left";
const TOPIC_5122 = "App5/JonathanDegoede/5122";

const client = connect('mqtt://test.mosquitto.org');

const onConnect = () => {

    const successFunc = (stream) => {
        stream.on('event', function(event) {
            const data = `${event.name}:${event.data}`;
            client.publish(TOPIC_5122, data);
        });
    }
    
    const errFunc = (err) =>  {
        console.log("Failed to getEventStream: ", err);
    }

    particle.getEventStream({ auth:TOKEN, name:ENTERED })
    .then(successFunc, errFunc);

    particle.
    getEventStream({ auth:TOKEN, name:LEFT })
    .then(successFunc, errFunc);
};

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

client.on('connect', onConnect);
