const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');

 const ms = require("ms")
 const modules = require("./handle\/module");
 const fetch = require("node-superfetch")
 const snekfetch = require("snekfetch")
const config = {
  channelAccessToken: "",
  channelSecret: "",
};
 
// create LINE SDK client
const client = new line.Client(config);
const app = express();
 client.snek = snekfetch
 client.commands = modules.commands;
 client.aliases = modules.aliases;
 client.helps = modules.helps;
 client.util= require("./handle/util.js")
 
app.get('/',(req,res) => {
  res.sendStatus(200);
  })
// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((e)=>{
      console.log(e);
    });
 
});
async function handleEvent(event) {
  const prefix = "/"
  console.log(event)
  if(event.message.text.type === "image") return;
  const args = event.message.text.slice(prefix.length).trim().split(" ")//.toLowerCase()
  if(event.message.text.startsWith(prefix)) return require("./handle/command.js")(client, event)
   const query = args;
  const argsJoin = event.message.text.split(' ').slice(1).join(' ')
  //const country = await covid.countries({country: argsJoin}).then(res => res)
  console.log(args)
  
   

}

// listen on port
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});