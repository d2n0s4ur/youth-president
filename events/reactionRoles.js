const { Events } = require('discord.js');

const roleList = [
	["트수", "1093037957037953024", "✅"],
];

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
		for (TargetRole of roleList) {
			if (reaction.message.id == TargetRole[1] && reaction.emoji.name == TargetRole[2]) {
				// grant reaction role
				const role = reaction.message.guild.roles.cache.find(role => role.name === TargetRole[0]);
				const member = reaction.message.guild.members.cache.find(member => member.id === user.id);
				member.roles.add(role);
			}
		}
	}
};