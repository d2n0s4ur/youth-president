const { SlashCommandBuilder } = require('discord.js');

// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('ping')
// 		.setDescription('Replies with Pong!'),
// 	async execute(interaction) {
// 		await interaction.reply('Pong!');
// 	},
// };

module.exports = {
	data: new SlashCommandBuilder()
		.setName('파티')
		.setDescription('새로운 음성채팅 파티원을 모집합니다.')
		.addIntegerOption((option) => 
			option.setName('인원').setDescription('최대 10명까지 초대 가능합니다.').setRequired(true)
		),
	async execute(interaction) {
		const max = interaction.options.getInteger('인원');
		if (max < 1) {
			await interaction.user.send('최소 1명 이상 초대해야 합니다.');
		}
		else if (max > 10) {
			await interaction.user.send('최대 10명까지 초대 가능합니다.');
		} else {
			await interaction.reply('새로운 음성채팅 파티원을 모집합니다.');
			// make a new message to channel
			
			await interaction.channel.send('새로운 음성채팅 파티원을 모집합니다.');
		}
	},
};