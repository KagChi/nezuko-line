import NezuClient from "../../struct/NezuClient"
export default {
    info: {
        name: 'help',
        description: 'Get bot commands.'
    },
    exec(client: NezuClient, event: any) {
        let command;
        let module = client.Modules.array();
        for (const mod of module) {
            (command as any) += `${mod.emoji} | ${mod.name} [${mod.cmds.length}]\n${mod.cmds.map((x: any) => x).join(", ")}\n\n`
        }
        client.replyMessage(event.replyToken, {
            type: 'text',
            text: (command as any)!.replace(/undefined/g, "")  
        })
    }
}