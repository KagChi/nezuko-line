import NezuClient from "../../struct/NezuClient"
export default {
    info: {
        name: 'ping',
        description: 'Ping pong with the bot.'
    },
    exec(client: NezuClient, event: any) {
        client.replyMessage(event.replyToken, {
            type: 'text',
            text: 'Pong!!!!!!'
        })
    }
}