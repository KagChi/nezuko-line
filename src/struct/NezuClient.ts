import { Client } from '@line/bot-sdk';
import config from '../config';
import Collection from '@discordjs/collection';
import snek from 'node-superfetch';
import Util from './Util';
import { promises as fsPromises, readdirSync, statSync } from "fs";
import { join, resolve } from "path";
const { readdir } = fsPromises;
export default class NezuClient extends Client {
    constructor() {
        super({
            channelAccessToken: config.channelAccessToken,
            channelSecret: config.channelSecret         
        })
    }
    public config = config
    public commands: Collection<string, any> = new Collection()
    public aliases: Collection<string, any> = new Collection()
    public Modules: Collection<string, any> = new Collection()
    public snek = snek
    public util = new Util()
    public async loadCommands() {
        const categories = await readdir(join(__dirname, '..', 'commands'))
        for(const category of categories) {
            const moduleConf = require(`../commands/${category}/module.json`);
            moduleConf.path = `./commands/${category}`;
            moduleConf.cmds = [];
            this.Modules.set(category.toLowerCase(), moduleConf);
            const commands = readdirSync(resolve(`./dist/commands/${category}`))
            .filter(x => !statSync(resolve("./dist/commands/", category, x)).isDirectory())
            .filter(x => x.endsWith(".js"));
            for(const command of commands) {
                const commandFile = require(`../commands/${category}/${command}`).default;
                commandFile.info.module = category
                this.Modules.get(category.toLowerCase()).cmds.push(commandFile.info.name);
                this.commands.set(commandFile.info.name, commandFile)
            }
        }
    }
    public init() {
        this.loadCommands()
    }
}