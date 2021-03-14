import NezuClient from "../../struct/NezuClient"
export default {
    info: {
        name: 'slap',
        description: 'Get random slap images.'
    },
    async exec(client: NezuClient, event: any) {
        const { body } = await client.snek.get('https://nekos.life/api/v2/img/slap') as any;
        return client.replyMessage(event.replyToken, {
            type: 'image',
            originalContentUrl: body.url,
            previewImageUrl: body.url
        })
    }
}