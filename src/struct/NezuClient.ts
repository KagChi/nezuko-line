import { Client } from '@line/bot-sdk';
import config from '../config';
import snek from 'node-superfetch';
import Util from './Util';
import { promises as fsPromises } from "fs";
import { join } from "path";
const { readdir } = fsPromises;
export default class NezuClient extends Client {
    constructor() {
        super({
            channelAccessToken: config.channelAccessToken,
            channelSecret: config.channelSecret         
        })
    }
    public config = config
    public commands = new Map()
    public aliases = new Map()
    public snek = snek
    public util = new Util()
    public async loadCommands() {
        const categories = await readdir(join(__dirname, '..', 'commands'))
        for(const category of categories) {
            const commands = await readdir(join(__dirname, '..', 'commands', category));
            for(const command of commands) {
                const commandFile = require(`../commands/${category}/${command}`).default;
                commandFile.info.module = category
                this.commands.set(commandFile.info.name, commandFile)
            }
        }
    }
    public init() {
        this.loadCommands()
    }
}