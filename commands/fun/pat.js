module.exports.run = async (client, event ,args) => {
  
const { body } = await client.snek.get("https://nekos.life/api/v2/img/pat");
      const echo = {
      type: 'image',
      originalContentUrl: body.url,
      previewImageUrl: body.url
    }
      return client.replyMessage(event.replyToken, echo);
    }
    
module.exports.conf = {
  enabled: true,
  cooldown: 3,
  aliases: [],
  clientPerm: [],
  authorPerm: ""
};

module.exports.help = {
  name: "pat",
  description: "pat",
  usage: "pat",
  example: ["pat"]
};