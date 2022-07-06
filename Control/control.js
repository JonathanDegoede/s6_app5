import Particle from 'particle-api-js';
import express from 'express';
import cors from 'cors';

const app = express();

const port = 3000;

const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));
app.use(express.json());

const DEVICE_ID = "argon_degj2706";
const TOKEN = "72ecdb3324a904ceebf149803f8194eb827300c5";

const toggleLed = (particle, led_state) => {
    return particle.callFunction({ deviceId: DEVICE_ID, name: 'led', argument: led_state, auth: TOKEN });
}

app.post("/led", (req, res) => {
    const particle = new Particle();

    const state = req.body?.state;

    if(state == "on" || state == "off") {
        toggleLed(particle, state).then((data)=> {
            return res.sendStatus(200);
        }, (err) => {
            return res.sendStatus(500);
        });
    }else{
        return res.sendStatus(400);
    }
});

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);

