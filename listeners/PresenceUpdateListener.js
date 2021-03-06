const { Listener } = require('discord-akairo');

class PresenceUpdateListener extends Listener {
	constructor() {
		super('presenceUpdate', {
			emitter: 'client',
			event: 'presenceUpdate'
		});
	}

	async exec(oldPresence, newPresence) {
		let member = newPresence.member;
		let guild = newPresence.guild;

		for (const activity of newPresence.activities) {
			if (activity.type !== 'PLAYING' || !activity.name) continue;

			let role = await guild.roles.cache.find(role => role.name === this.name, activity);

			if (role == null) {
				role = await guild.roles.create({
					data: {
						name: activity.name,
						color: 'BLUE'
					},
					reason: 'Role created via PresenceUpdateListener'
				});
			}

			if (!member.roles.cache.has(role.id)) {
				member.roles.add(role)
					.finally(console.log(`Role ${role.name} successfully added to user ${member.user.tag}`))
					.catch(console.error);
			}
		}
	}
}

module.exports = PresenceUpdateListener;