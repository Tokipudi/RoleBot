const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo');
const config = require('./config.json');

class MyClient extends AkairoClient {
    constructor() {
        super({
            ownerID: config.ownerID,
        }, {
            disableMentions: 'everyone'
        });
		
		this.commandHandler = new CommandHandler(this, {
			directory: './commands/',
			prefix: '//'
		});
		this.commandHandler.loadAll();

        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: './inhibitors/'
        });
		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
		this.inhibitorHandler.loadAll();
		
		this.listenerHandler = new ListenerHandler(this, {
            directory: './listeners/'
        });
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			inhibitorHandler: this.inhibitorHandler,
			listenerHandler: this.listenerHandler
		});
		this.listenerHandler.loadAll();
    }
}

const client = new MyClient();
client.login(config.token);