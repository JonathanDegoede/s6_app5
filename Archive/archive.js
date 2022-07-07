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

const TOPIC_5122 = "App5/JonathanDegoede/5122";
const file = './archive.txt';

const parseMsg = (topic, data) => {
    const local = topic.split("/")[2];
    const data_arr = data.split(":");
    return `${local} ${data_arr[0]} ${data_arr[1]}`;	
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
        const content = lines[0].split(" ");
        parsed[i] = {"local" : content[0], "action" : content[1], "address" : content[2]};
    }
    return {"content" : parsed, "length" : parsed.length};
}

client.on('connect', () => {
    client.subscribe(TOPIC_5122);
});

client.on('message', (topic, data) => {
    const parsed = parseMsg(topic.toString(), data.toString());
    archiveMsg(parsed, file);
});

app.get("/archive", (req, res) => {
    res.type('json');
    return res.json(parseArchive(file));
});

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);