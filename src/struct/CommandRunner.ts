import type NezuClient from '../struct/NezuClient'
export default async (client: NezuClient, event: any) => {
    const args = event.message.text.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift()
    if(client.commands.has(command)) {
        client.commands.get(command).exec(client, event, args)
    } else if(client.aliases.has(command)) {
        client.aliases.get(command).exec(client, event, args)
    } else return;
}