const { Listener } = require('discord-akairo');
const { hasRichPresence } = require('../util/PresenceUtil');

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
			if (activity.type !== 'PLAYING' || !activity.name || !hasRichPresence(activity)) continue;
			
			// TODO Find out why the fetch is needed to reload the cache
			let roles = await guild.roles.fetch();
			let role = await roles.cache.find(r => r.name === activity.name);

			if (role == null) {
				role = await guild.roles.create({
					data: {
						name: activity.name,
						color: 'GREY'
					},
					reason: `Role ${activity.name} created when ${member.user.tag} played it`
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