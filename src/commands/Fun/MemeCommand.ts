import NezuClient from "../../struct/NezuClient";
// @ts-expect-error-next-line
import KagChiApi from "@kagchi/kag-api";
export default {
    info: {
        name: 'meme',
        description: 'Get random meme images.'
    },
    async exec(client: NezuClient, event: any) {
        return client.replyMessage(event.replyToken, {
            type: 'image',
            originalContentUrl: `https://imgur.com/${await KagChiApi.memes().hash}.jpg`,
            previewImageUrl: `https://imgur.com/${await KagChiApi.memes().hash}.jpg`
        })
    }
}