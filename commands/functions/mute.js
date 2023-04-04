const { SlashCommandBuilder } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const AnouncementChannel = process.env.MUTE_ANOUNCEMENT_CHANNEL_ID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('해당 유저를 특정 시간동안 활동하지 못하게 합니다.')
		.addUserOption(option => option.setName('유저').setDescription('뮤트할 유저를 선택해주세요.').setRequired(true))
		.addIntegerOption(option => option.setName('분').setDescription('뮤트할 시간을 분 단위로 입력해주세요.').setRequired(true))
		.addStringOption(option => option.setName('사유').setDescription('뮤트 사유를 입력해주세요.').setRequired(false)),
	async execute(interaction) {
		const member = interaction.options.getMember('유저');
		const time = interaction.options.getInteger('분');
		const role = interaction.guild.roles.cache.find(role => role.name === 'mute');
		member.roles.add(role);
		await interaction.reply(`\`${member.user.tag}\`님을 \`${time}\`분 동안 뮤트 처리하였습니다.`);
		await interaction.client.channels.fetch(AnouncementChannel)
			.then(channel => channel.send(`\`${member.user.tag}\`님을 \`${time}\`분 동안 뮤트 처리하였습니다.\n\n사유: \`${interaction.options.getString('사유')}\``));
		setTimeout(() => {
			member.roles.remove(role);
		}, time * 60000);
	},
};