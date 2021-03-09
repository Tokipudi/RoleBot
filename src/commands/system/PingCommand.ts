import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            description: {
                content: 'A simple ping command.',
                usage: '[command]'
            },
            category: 'system',
            clientPermissions: ['SEND_MESSAGES']
        });
    }

    async exec(message: Message) {
        return message.reply([
            'Pong!',
            `💟 **Heartbeat**: ${Math.round(this.client.ws.ping)} ms`
        ]);
    }
}