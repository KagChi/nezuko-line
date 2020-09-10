module.exports.run = async (client, event , query) => {
  
const notDevMsg= {
        type: 'text',
        text: "bakkka! you aren't my developer!"
      }
      if(event.source.userId !== "Udc7d758075641fd342f7bf124e87718a") return client.replyMessage(event.replyToken, notDevMsg);

const { args, flags } = parseQuery(query);
  try {
    if (!args.length) {
      throw new TypeError("Eval command cannot execute without input!. You bbbaka...");
    }
    let code = args.join(" ");
    let depth = 0;
    if (flags.includes("async")) {
      code = `(async() => { ${code} })()`;
    }
    if (flags.some(x => x.includes("depth"))) {
      depth = flags.find(x => x.includes("depth")).split("=")[1];
      depth = parseInt(depth, 10);
    }
    let { evaled, type } = await parseEval(eval(code)); /* eslint-disable-line */
    if (flags.includes("silent")) return;
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled, { depth });
    evaled = evaled
      .replace(/`/g, `\`${String.fromCharCode(8203)}`)
      .replace(/@/g, `@${String.fromCharCode(8203)}`);
    if (evaled.length > 2048) evaled = await client.util.hastebin(evaled);
    else evaled = `${evaled}`;
      const echo = {
      type: 'text',
      text: `Type: ${type}\nEvaled Success\nEvaled Code:\n${evaled}`
  
    }
    return client.replyMessage(event.replyToken, echo);
  } catch (e) {
      const echo = {
      type: 'text',
      text: `Evaled Error!\n${e}`
  
    }
    return client.replyMessage(event.replyToken, echo);
    
  }
};

async function parseEval(input) {
  const isPromise =
    input instanceof Promise &&
    typeof input.then === "function" &&
    typeof input.catch === "function";
  if (isPromise) {
    input = await input;
    return {
      evaled: input,
      type: `Promise<${parseType(input)}>`
    };
  }
  return {
    evaled: input,
    type: parseType(input)
  };
}

function parseType(input) {
  if (input instanceof Buffer) {
    let length = Math.round(input.length / 1024 / 1024);
    let ic = "MB";
    if (!length) {
      length = Math.round(input.length / 1024);
      ic = "KB";
    }
    if (!length) {
      length = Math.round(input.length);
      ic = "Bytes";
    }
    return `Buffer (${length} ${ic})`;
  }
  return input === null || input === undefined ? "Void" : input.constructor.name;
}

function parseQuery(queries) {
  const args = [];
  const flags = [];
  for (const query of queries) {
    if (query.startsWith("--")) flags.push(query.slice(3).toLowerCase());
    else args.push(query);
  }
  return { args, flags };
}

module.exports.conf = {
  enabled: true,
  cooldown: 3,
  aliases: [],
  clientPerm: [],
  authorPerm: ""
};

module.exports.help = {
  name: "eval",
  description: "evaluate javascript code",
  usage: "eval",
  example: ["eval"]
};