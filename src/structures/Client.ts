import { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } from 'discord-akairo';
import { Command, Inhibitor, Listener, Logger, Util } from './index';
const { DISCORD_TOKEN } = process.env;

export class Client extends AkairoClient {
    public util: Util;
    public logger: Logger;
    public commandHandler: CommandHandler;
    public listenerHandler: ListenerHandler;
    public inhibitorHandler: InhibitorHandler;
    constructor(...options: ConstructorParameters<typeof AkairoClient>) {
        super(
            options[0],
            Object.assign({}, options[1], {
                shards: 'auto',
                messageCacheMaxSize: 10,
                messageCacheLifetime: 10000,
                messageSweepInterval: 30000,
                messageEditHistoryMaxSize: 3,
            })
        );
        this.util = new Util(this);
        this.logger = new Logger();
        this.commandHandler = new CommandHandler(this, {
            directory: `${__dirname}/../commands/`,
            prefix: '//',
            classToHandle: Command,
            allowMention: true,
            blockBots: true,
            automateCategories: true,
            commandUtil: true,
        })
            .useInhibitorHandler(this.inhibitorHandler)
            .useListenerHandler(this.listenerHandler)
            .loadAll();
        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: `${__dirname}/../inhibitors/`,
            classToHandle: Inhibitor,
        });
        this.listenerHandler = new ListenerHandler(this, {
            directory: `${__dirname}/../listeners/`,
            classToHandle: Listener,
        });
    }

    async start(): Promise<void> {
        this.inhibitorHandler.loadAll();
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler,
            process: process,
        });
        this.listenerHandler.loadAll();
        await super.login(DISCORD_TOKEN);
        const owner = (await super.fetchApplication()).owner!.id;
        this.ownerID = this.commandHandler.ignoreCooldown = owner;
        this.logger.info(`[READY] Fetched application profile. Setting owner ID to ${owner}.`);
    }
}
