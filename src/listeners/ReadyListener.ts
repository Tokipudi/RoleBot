import { Listener } from 'discord-akairo';

export default class extends Listener {
	constructor() {
		super('ready', {
			emitter: 'client',
			event: 'ready'
		});
	}

	exec() {
		console.log('I\'m ready!');
	}
}