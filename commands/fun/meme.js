const KagApi = require("@kagchi/kag-api")
module.exports.run = async (client, event ,args) => {
    const api = new KagApi()
    const meme = await api.memeindo()
    
    const echo = {
      type: 'image',
      "originalContentUrl": `https://imgur.com/${meme.hash}.jpg`,
      "previewImageUrl": `https://imgur.com/${meme.hash}.jpg`
    }
     return client.replyMessage(event.replyToken, echo)
}  
module.exports.conf = {
  enabled: true,
  cooldown: 3,
  aliases: ["mim"],
  clientPerm: [],
  authorPerm: ""
};

module.exports.help = {
  name: "meme",
  description: "hiburan? mungkin :v",
  usage: "meme",
  example: ["meme"]
};