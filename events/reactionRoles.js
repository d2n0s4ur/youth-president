const { Events } = require('discord.js');

const ROLE_NAME = "트수";
const MSG_ID = "1093037957037953024";
const EMOJI = "✅";

module.exports = {
	name: Events.MessageReactionAdd,
	async execute(reaction, user) {
		if (reaction.partial) {
			// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
			try {
				await reaction.fetch();
			} catch (error) {
				console.error('Something went wrong when fetching the message:', error);
				// Return as `reaction.message.author` may be undefined/null
				return;
			}
		}
		// Now the message has been cached and is fully available
		if (reaction.message.id == MSG_ID && reaction.emoji.name == EMOJI ) {
			// grant reaction role
			const role = reaction.message.guild.roles.cache.find(role => role.name === ROLE_NAME);
			const member = reaction.message.guild.members.cache.find(member => member.id === user.id);
			member.roles.add(role);
		}
	}
};