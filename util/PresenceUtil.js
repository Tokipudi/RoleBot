const { Util } = require("discord-akairo");

class PresenceUtil extends Util {
	
	static hasRichPresence(activity) {
		if (activity && activity.assets && activity.assets != null) {
			return true;
		}
		return false;
	}
}

module.exports = PresenceUtil;