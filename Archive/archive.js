import {connect} from "mqtt";
import fs from "fs";
import express from 'express';
import cors from 'cors';

const app = express();

const port = 3002;

const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

const client = connect('mqtt://test.mosquitto.org');

const TOPIC = "App5/JonathanDegoede";
const file = './archive.txt';

const parseMsg = (topic, data) => {
    const data_arr = data.split("/");
    return `${data_arr[0]} ${data_arr[1]} ${data_arr[2]}`;	
};

const archiveMsg = (msg, file) => {
    fs.appendFile(file, `${msg}\n`, (err) => {
        if(err) {
            console.log(err);
        }
    });
};

const parseArchive = (file) => {
    const raw = fs.readFileSync(file); 
    const lines = raw.toString().split("\n");
    const parsed = [];
    for(let i = 0; i < lines.length-1; i++) {
        const content = lines[i].split(" ");
        parsed[i] = {"action" : content[0], "local" : content[1], "address" : content[2]};
    }
    return {"content" : parsed, "length" : parsed.length};
}

client.on('connect', () => {
    client.subscribe(TOPIC);
});

client.on('message', (topic, data) => {
    const parsed = parseMsg(topic.toString(), data.toString());
    archiveMsg(parsed, file);
});

app.get("/archive", (req, res) => {
    res.status(200).send(parseArchive(file));
});

app.listen(port, () =>
  console.log(`App listening on port ${port}!`),
);