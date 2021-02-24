import line from '@line/bot-sdk';
import config from '../config';
const nezuRest = require('express')()
import NezuClient from '../struct/NezuClient';
const client = new NezuClient()
nezuRest.get('/', (req: any, res: any) => {
    res.sendStatus(200)
})
nezuRest.post('/callback', line.middleware({
    channelAccessToken: config.channelAccessToken,
    channelSecret: config.channelSecret   
}), (req: any, res: any) => {
    Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((e)=>{
      console.log(e);
    });
})
function handleEvent(event: any) {
    if(event.message.text.type === "image") return;
    if(event.message.text.startsWith(client.config.prefix)) return require('../struct/CommandRunner').default(client, event)
  
}
nezuRest.listen(3000, () => {
    client.init()
    console.log('WEBSERVER READY!')
})