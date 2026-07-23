require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  REST,
  Routes,
} = require("discord.js");

const {
  joinVoiceChannel,
  getVoiceConnection,
} = require("@discordjs/voice");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    return interaction.reply("🏓 Pong!");
  }

  if (interaction.commandName === "join") {
    const channel = interaction.member.voice.channel;

    if (!channel) {
      return interaction.reply({
        content: "❌ Age voice channel-e join koro.",
        ephemeral: true,
      });
    }

    joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: false,
    });

    return interaction.reply(`✅ Joined **${channel.name}**`);
  }

  if (interaction.commandName === "leave") {
    const connection = getVoiceConnection(interaction.guild.id);

    if (!connection) {
      return interaction.reply("❌ Ami kono voice channel-e nei.");
    }

    connection.destroy();

    return interaction.reply("👋 Voice channel theke ber hoye gelam.");
  }
});
