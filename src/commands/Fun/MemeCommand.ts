import NezuClient from "../../struct/NezuClient";
// @ts-expect-error-next-line
import KagChiApi from "@kagchi/kag-api";
export default {
    info: {
        name: 'meme',
        description: 'Get random meme images.'
    },
    async exec(client: NezuClient, event: any) {
        const img = await KagChiApi.memes()
        return client.replyMessage(event.replyToken, {
            type: 'image',
            originalContentUrl: `https://imgur.com/${img.hash}.jpg`,
            previewImageUrl: `https://imgur.com/${img.hash}.jpg`
        })
    }
}