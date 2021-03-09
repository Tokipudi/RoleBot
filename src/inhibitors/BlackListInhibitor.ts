import { Inhibitor } from 'discord-akairo';
import { Message } from 'discord.js';

export default class extends Inhibitor {
    constructor() {
        super('blacklist', {
            reason: 'blacklist'
        })
    }

    exec(message: Message) {
        // He's a meanie!
        const blacklist = ['123456'];
        return blacklist.includes(message.author.id);
    }
}