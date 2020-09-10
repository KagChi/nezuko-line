
module.exports= async (client, event) => {

  const PREFIX = "/";
  
if (!event.message.text.startsWith(PREFIX)) return;
 
  const args = event.message.text.slice(PREFIX.length).trim().split(/ +/g);

  
  const command = args.shift();
let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  }
  if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (!cmd) return undefined;
    
  
  cmd.run(client, event, args);
}