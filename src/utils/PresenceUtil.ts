import { Util } from 'discord-akairo';
import { Activity } from 'discord.js';

export class PresenceUtil extends Util {
	
	static hasRichPresence(activity: Activity) {
		if (activity && activity.assets && activity.assets != null) {
			return true;
		}
		return false;
	}
}